const express = require("express");
const serverless = require("serverless-http");
const mysql = require("mysql2/promise");

const app = express();
const router = express.Router();

router.get("/", async (req, res) => {
  // Retrieve environment variables
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
    const { user_id } = req.query;
    const getCurrentUserPlan = `
      SELECT plan_id, id
      FROM User_Plans 
      WHERE user_id = ? 
        AND is_active = 1 
        AND (status = 'open' OR status = 'active') 
        AND expires_at IS NULL
    `;
    const [rows] = await connection.execute(getCurrentUserPlan, [user_id]);

    if (rows.length === 0) {
      res.json({ exists: false });
    } else {
      const planId = rows[0].plan_id;
      const userPlanId = rows[0].id;
      res.json({ exists: true, plan: planId, userPlanId: userPlanId });
    }
  } catch (error) {
    console.error("Error executing database query:", error);
    res.status(500).json({ error: "Error processing the request" });
  } finally {
    connection.end();
  }
});

// Mount the router at the base path for your function
app.use(`/.netlify/functions/getSelectedSubscription`, router);

// Export the app wrapped with serverless-http
module.exports = app;
module.exports.handler = serverless(app);
