const express = require("express");
const serverless = require("serverless-http");
const mysql = require("mysql2/promise");
const { format } = require("date-fns");
const { updateSubscriptionEndPeriod } = require("./stripeLib");

const app = express();
const router = express.Router();

app.use(express.json());

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
    const { user_plan_id } = req.body;

    console.log("Plan ID+++++++++++++++++", user_plan_id);

    if (!user_plan_id) {
      return res
        .status(400)
        .json({ success: false, error: "Missing user_plan_id" });
    }

    const [userPlans] = await connection.execute(
      "SELECT * FROM User_Plans WHERE id = ?",
      [user_plan_id]
    );

    if (userPlans.length === 0) {
      return res
        .status(500)
        .json({ success: false, error: "Error fetching user plan" });
    }

    const userPlan = userPlans[0];

    if (userPlan.is_active) {
      const subscription = await updateSubscriptionEndPeriod(
        userPlan.provider_id,
        true
      );
      const expiresAt = format(
        new Date(subscription.cancel_at * 1000),
        "MM/dd/yyyy, hh:mm:ss a"
      );

      await connection.execute(
        "UPDATE User_Plans SET expires_at = ?, complete = 1 WHERE id = ?",
        [expiresAt, user_plan_id]
      );

      return res.json({ success: true });
    }

    return res.json({ success: true });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  } finally {
    await connection.end();
  }
});

app.use("/.netlify/functions/cancelSubscription", router);

module.exports = app;
module.exports.handler = serverless(app);
