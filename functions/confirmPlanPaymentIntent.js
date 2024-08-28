const express = require("express");
const serverless = require("serverless-http");
const mysql = require("mysql2/promise");
const axios = require("axios");
const { retrievePaymentIntent } = require("./stripeLib"); // Adjust the path as needed

const app = express();
const router = express.Router();

app.use(express.json());

// Middleware to verify Xsolla token and get user info
const verifyXsollaToken = async (req, res, next) => {
  const xsollaToken = req.headers["x-xsolla-token"];
  const projectId = process.env.PROJECT_ID;

  if (!xsollaToken) {
    return res
      .status(401)
      .json({ success: false, error: "No authentication token provided" });
  }

  if (!projectId) {
    console.error("PROJECT_ID is not set in environment variables");
    return res
      .status(500)
      .json({ success: false, error: "Server configuration error" });
  }

  try {
    const response = await axios.post(
      `https://login.xsolla.com/api/users/${projectId}/user/info`,
      null,
      {
        headers: {
          Authorization: `Bearer ${xsollaToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    req.user = response.data;
    next();
  } catch (error) {
    console.error("Error verifying Xsolla token:", error);
    res
      .status(401)
      .json({ success: false, error: "Invalid authentication token" });
  }
};

// router.post('/', verifyXsollaToken, async (req, res) => {
router.post("/", async (req, res) => {
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
    const { payment_intent_id, userId } = req.body;

    if (!payment_intent_id) {
      return res
        .status(400)
        .json({ success: false, error: "Missing payment_intent_id" });
    }

    const payment_intent = await retrievePaymentIntent(payment_intent_id);

    // Fetch user plan
    const [userPlans] = await connection.execute(
      "SELECT * FROM User_Plans WHERE user_id = ? ORDER BY id DESC LIMIT 1",
      [userId]
    );

    if (userPlans.length === 0) {
      return res
        .status(500)
        .json({ success: false, error: "Error fetching user plan" });
    }

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
      userPlans[0] &&
      payment_intent.customer === customer_id &&
      payment_intent.status === "succeeded"
    ) {
      await connection.execute(
        "UPDATE User_Plans SET is_active = true WHERE id = ?",
        [userPlans[0].id]
      );

      return res.json({ success: true });
    }
    return res.json({ success: false });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  } finally {
    await connection.end();
  }
});

app.use("/.netlify/functions/confirmPlanPaymentIntent", router);

module.exports = app;
module.exports.handler = serverless(app);
