const express = require('express');
const serverless = require('serverless-http');
const mysql = require('mysql2/promise');
const axios = require('axios');
const { subHours, compareAsc } = require('date-fns');
const { createCustomer, createSubscription, cancelSubscription, retrieveSubscription } = require('./stripeLib'); // Adjust the path as needed

const app = express();
const router = express.Router();

app.use(express.json());

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Middleware to verify Xsolla token and get user info
const verifyXsollaToken = async (req, res, next) => {
  const xsollaToken = req.headers['x-xsolla-token'];
  const projectId = process.env.PROJECT_ID;

  if (!xsollaToken) {
    return res.status(401).json({ success: false, error: 'No authentication token provided' });
  }

  if (!projectId) {
    console.error('PROJECT_ID is not set in environment variables');
    return res.status(500).json({ success: false, error: 'Server configuration error' });
  }

  try {
    const response = await axios.post('https://login.xsolla.com/api/user/info', null, {
        headers: {
          'Authorization': `Bearer ${xsollaToken}`,
          'Content-Type': 'application/json',
        },
        params: {
          project_id: process.env.PROJECT_ID,
        },
      });

    req.user = response.data;
    next();
  } catch (error) {
    console.error('Error verifying Xsolla token:', error);
    res.status(401).json({ success: false, error: 'Invalid authentication token' });
  }
};

router.post('/', verifyXsollaToken, async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const { plan_id, recovery_email } = req.body;
    console.log('recovery_email', recovery_email);

    if (!plan_id) {
      return res.status(400).json({ success: false, error: 'Missing plan_id' });
    }

    const userId = req.user.user_id;
    const userEmail = req.user.email;

    // Fetch plan details
    const [plans] = await connection.execute('SELECT * FROM Plans WHERE id = ?', [plan_id]);
    if (plans.length === 0) {
      return res.status(400).json({ success: false, error: 'Invalid plan' });
    }
    const plan = plans[0];

    // Fetch user plans
    const [userPlans] = await connection.execute(
      'SELECT * FROM User_Plans WHERE user_id = ? AND plan_id = ? AND complete = false ORDER BY id DESC',
      [userId, plan_id]
    );

    // Fetch or create Stripe customer
    let [stripeCustomers] = await connection.execute('SELECT customer_id FROM Stripe_Customer WHERE user_id = ?', [userId]);
    let customer_id;

    if (stripeCustomers.length === 0) {
      const customer = await createCustomer(userEmail);
      customer_id = customer.id;
      await connection.execute('INSERT INTO Stripe_Customer (customer_id, user_id) VALUES (?, ?)', [customer_id, userId]);
    } else {
      customer_id = stripeCustomers[0].customer_id;
    }

    let isTrial = false;
    let clientSecret = "";

    if (userPlans.length === 0) {
      const subscription = await createSubscription(customer_id, plan.product_id, userEmail);
      const { subscription_id, status, is_trial, client_secret } = subscription;
      await connection.execute(
        'INSERT INTO User_Plans (plan_id, user_id, provider_id, status) VALUES (?, ?, ?, ?)',
        [plan_id, userId, subscription_id, status]
      );
      isTrial = is_trial;
      clientSecret = client_secret;
    } else {
      const creationTime = new Date(userPlans[0].created_at);
      const currentTimeMinusTwoHours = subHours(new Date(), 22);

      if (compareAsc(creationTime, currentTimeMinusTwoHours) < 0) {
        await cancelSubscription(userPlans[0].provider_id);
        await connection.execute('DELETE FROM User_Plans WHERE id = ?', [userPlans[0].id]);
        const subscription = await createSubscription(customer_id, plan.product_id, userEmail);
        const { subscription_id, status, is_trial, client_secret } = subscription;
        await connection.execute(
          'INSERT INTO User_Plans (plan_id, user_id, provider_id, status) VALUES (?, ?, ?, ?)',
          [plan_id, userId, subscription_id, status]
        );
        isTrial = is_trial;
        clientSecret = client_secret;
      } else {
        const subscription = await retrieveSubscription(userPlans[0].provider_id);
        clientSecret = subscription.latest_invoice.payment_intent.client_secret;
      }
    }

    res.json({ success: true, data: { 'client_secret': clientSecret, 'is_trial': isTrial } });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.use('/.netlify/functions/createSubscription', router);

module.exports = app;
module.exports.handler = serverless(app);