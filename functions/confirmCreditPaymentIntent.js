const express = require("express");
const serverless = require("serverless-http");
const mysql = require("mysql2/promise");
const axios = require("axios"); // You'll need to install this package
const { retrievePaymentIntent } = require("./stripeLib"); // Adjust the path as needed

const app = express();
const router = express.Router();
app.use(express.json());

// Middleware to verify Xsolla token and get user info
const verifyXsollaToken = async (req, res, next) => {
  const xsollaToken = req.headers["x-xsolla-token"]; // Assume the token is sent in headers

  if (!xsollaToken) {
    return res
      .status(401)
      .json({ success: false, error: "No authentication token provided" });
  }

  try {
    // Replace with your actual Xsolla API endpoint and project ID
    const response = await axios.post(
      "https://login.xsolla.com/api/user/info",
      null,
      {
        headers: {
          Authorization: `Bearer ${xsollaToken}`,
          "Content-Type": "application/json",
        },
        params: {
          project_id: process.env.PROJECT_ID,
        },
      }
    );

    req.user = response.data; // This will contain user information including user ID
    next();
  } catch (error) {
    console.error("Error verifying Xsolla token:", error);
    res
      .status(401)
      .json({ success: false, error: "Invalid authentication token" });
  }
};

// router.post("/", verifyXsollaToken, async (req, res) => {
router.post("/", async (req, res) => {
  const creditData = { 12: 100, 30: 250, 60: 500, 96: 800 };

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
    const { payment_intent_id, amount } = req.body;
    // const userId = req.user.user_id; // Get user ID from Xsolla user info
    const userId = 154; // Get user ID from Xsolla user info

    console.log(payment_intent_id, amount, userId);

    if (!payment_intent_id || !amount) {
      return res
        .status(400)
        .json({ success: false, error: "Missing payment_intent_id or amount" });
    }

    const payment_intent = await retrievePaymentIntent(payment_intent_id);

    // Fetch stripe customer
    const [stripeCustomer] = await connection.execute(
      "SELECT customer_id FROM Stripe_Customer WHERE user_id = ?",
      [userId]
    );

    if (stripeCustomer.length === 0) {
      return res
        .status(500)
        .json({ success: false, error: "Error fetching stripe customer" });
    }

    const customer_id = stripeCustomer[0].customer_id;

    if (
      payment_intent.customer === customer_id &&
      payment_intent.status === "succeeded"
    ) {
      // Check if user credit exists
      const [existingUserCredit] = await connection.execute(
        "SELECT * FROM User_Credits WHERE user_id = ?",
        [userId]
      );

      if (existingUserCredit.length > 0) {
        const totalAmount = existingUserCredit[0].amount + creditData[amount];
        await connection.execute(
          "UPDATE User_Credits SET amount = ? WHERE user_id = ?",
          [totalAmount, userId]
        );
      } else {
        await connection.execute(
          "INSERT INTO User_Credits (user_id, amount) VALUES (?, ?)",
          [userId, creditData[Number(amount)]]
        );
      }

      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  } finally {
    // Close the database connection
    connection.end();
  }
});

// Mount the router at the base path for your function
app.use(`/.netlify/functions/confirmCreditPaymentIntent`, router);

// Export the app wrapped with serverless-http
module.exports = app;
module.exports.handler = serverless(app);
