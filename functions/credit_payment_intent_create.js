const express = require("express");
const serverless = require("serverless-http");
const mysql = require('mysql2/promise');
const axios = require('axios');
const { createCustomer, createPaymentIntent } = require('./stripeLib'); // Adjust the path as needed

const app = express();
const router = express.Router();
app.use(express.json());

// Middleware to verify Xsolla token and get user info
const verifyXsollaToken = async (req, res, next) => {
  const xsollaToken = req.headers['x-xsolla-token']; // Assume the token is sent in headers

  if (!xsollaToken) {
    return res.status(401).json({ success: false, error: 'No authentication token provided' });
  }

  try {
    // Replace with your actual Xsolla API endpoint and project ID
    const response = await axios.post('https://login.xsolla.com/api/user/info', null, {
      headers: {
        'Authorization': `Bearer ${xsollaToken}`,
        'Content-Type': 'application/json',
      },
      params: {
        project_id: process.env.PROJECT_ID,
      },
    });

    req.user = response.data; // This will contain user information including user ID
    next();
  } catch (error) {
    console.error('Error verifying Xsolla token:', error);
    res.status(401).json({ success: false, error: 'Invalid authentication token' });
  }
};

router.post("/", verifyXsollaToken, async (req, res) => {
  // Get the database connection details from environment variables
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_DATABASE;

  // Create a database connection
  const connection = await mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
  });

  try {
    const { amount } = req.body;
    const userId = req.user.user_id; // Get user ID from Xsolla user info
    const userEmail = req.user.email; // Get user email from Xsolla user info

    console.log('User ID:', userId, 'Email:', userEmail);

    if (!amount) {
      return res.status(400).json({ success: false, error: 'Missing amount' });
    }

    // Check if stripe customer exists
    const [stripeCustomer] = await connection.execute(
      'SELECT customer_id FROM Stripe_Customer WHERE user_id = ?',
      [userId]
    );

    let customer_id = "";
    if (stripeCustomer.length === 0) {
      const customer = await createCustomer(userEmail);
      customer_id = customer.id;
      await connection.execute(
        'INSERT INTO Stripe_Customer (customer_id, user_id) VALUES (?, ?)',
        [customer_id, userId]
      );
    } else {
      customer_id = stripeCustomer[0].customer_id;
    }

    const payment_intent = await createPaymentIntent(Math.round(amount * 100), customer_id, userEmail);
    res.json({ success: true, data: { 'client_secret': payment_intent?.client_secret } });

  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  } finally {
    // Close the database connection
    connection.end();
  }
});

// Mount the router at the base path for your function
app.use(`/.netlify/functions/createCreditPaymentIntent`, router);

// Export the app wrapped with serverless-http
module.exports = app;
module.exports.handler = serverless(app);