const express = require('express');
const serverless = require('serverless-http');
const mysql = require('mysql2/promise');
const { format } = require('date-fns');
const { constructWebhookEvent } = require('./stripeLib'); // Adjust the path as needed

const app = express();
const router = express.Router();

// Middleware to parse raw body for Stripe webhook
app.use(express.raw({ type: 'application/json' }));

// Database connection
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

async function getOrCreateUserPlanInvoice(connection, { invoice_id, provider_id, user_plan_id }) {
  try {
    const [existUserPlanInvoice] = await connection.execute(
      'SELECT * FROM User_Plan_Invoice WHERE invoice_id = ? AND provider_id = ?',
      [invoice_id, provider_id]
    );

    let result;
    if (existUserPlanInvoice.length > 0) {
      await connection.execute(
        'UPDATE User_Plan_Invoice SET user_plan_id = ? WHERE id = ?',
        [user_plan_id, existUserPlanInvoice[0].id]
      );

      [result] = await connection.execute(
        'SELECT * FROM User_Plan_Invoice WHERE id = ?',
        [existUserPlanInvoice[0].id]
      );
    } else {
      await connection.execute(
        'INSERT INTO User_Plan_Invoice (invoice_id, provider_id, user_plan_id) VALUES (?, ?, ?)',
        [invoice_id, provider_id, user_plan_id]
      );

      [result] = await connection.execute(
        'SELECT * FROM User_Plan_Invoice WHERE invoice_id = ? AND provider_id = ? AND user_plan_id = ?',
        [invoice_id, provider_id, user_plan_id]
      );
    }

    return result.length > 0 ? result[0] : {};
  } catch (error) {
    console.error('Error in getOrCreateUserPlanInvoice:', error);
    return {};
  }
}

router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  if (!sig) {
    return res.status(400).json({ error: 'No Stripe signature found' });
  }

  const connection = await mysql.createConnection(dbConfig);

  try {
    const result = constructWebhookEvent(req.body, sig);

    if (result?.id) {
      console.log('Webhook event processed:', result);
      const [userPlans] = await connection.execute(
        'SELECT * FROM User_Plans WHERE provider_id = ?',
        [result.id]
      );

      if (userPlans.length) {
        if (result.type.includes('invoice')) {
          const invoice = await getOrCreateUserPlanInvoice(connection, {
            invoice_id: result.invoice_id,
            provider_id: result.id,
            user_plan_id: userPlans[0]?.id
          });
          console.log('invoice', invoice);
          const { status } = result;
          const paid = result.paid ?? invoice.paid;
          const amount = result.amount ?? invoice.amount;
          const currency = result.currency ?? invoice.currency;
          console.log('test1', paid, amount, currency);
          await connection.execute(
            'UPDATE User_Plan_Invoice SET status = ?, paid = ?, amount = ?, currency = ? WHERE id = ?',
            [status, paid, amount, currency, invoice.id]
          );
        }
        if (result.type.includes('customer.subscription') || result.type.includes('payment_intent')) {
          const complete = result.complete ?? userPlans[0].complete;
          const { status } = result;
          await connection.execute(
            'UPDATE User_Plans SET status = ?, complete = ? WHERE id = ?',
            [status, complete, userPlans[0].id]
          );

          if (userPlans[0].status !== 'past_due') {
            if (userPlans[0].expires_at && !result.expires_at) {
              await connection.execute(
                'UPDATE User_Plans SET expires_at = NULL WHERE id = ?',
                [userPlans[0].id]
              );
            } else if (result.expires_at) {
              const expiresAtDate = new Date(result.expires_at * 1000);
              const formattedExpiresAt = format(expiresAtDate, 'MM/dd/yyyy, hh:mm:ss a');
              await connection.execute(
                'UPDATE User_Plans SET expires_at = ? WHERE id = ?',
                [formattedExpiresAt, userPlans[0].id]
              );
            }
          }
        }
      }
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error processing webhook:', err);
    res.status(400).json({ error: err.message || 'An unknown error occurred' });
  } finally {
    await connection.end();
  }
});

app.use('/.netlify/functions/stripeWebhook', router);

module.exports = app;
module.exports.handler = serverless(app);