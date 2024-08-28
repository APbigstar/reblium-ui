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
    const { user_plan_id, plan_id } = req.body;

    if (!user_plan_id || !plan_id) {
      return res
        .status(400)
        .json({ success: false, error: "Missing plan_id or user_plan_id" });
    }

    // Fetch plan details
    const [plans] = await connection.execute(
      "SELECT * FROM plans WHERE id = ?",
      [plan_id]
    );

    if (plans.length === 0) {
      return res.status(400).json({ success: false, error: "Invalid plan" });
    }
    const plan = plans[0];

    // Fetch user plan details
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

    if (userPlan.plan_id !== plan.id) {
      await modifySubscription(userPlan.provider_id, plan.product_id);
      await connection.execute(
        "UPDATE User_Plans SET plan_id = ?, expires_at = NULL WHERE id = ?",
        [plan.id, user_plan_id]
      );
    } else {
      await updateSubscriptionEndPeriod(userPlan.provider_id, false);
      await connection.execute(
        "UPDATE User_Plans SET expires_at = NULL WHERE id = ?",
        [user_plan_id]
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  } finally {
    await connection.end();
  }
});

app.use("/.netlify/functions/updateSubscription", router);

module.exports = app;
module.exports.handler = serverless(app);
