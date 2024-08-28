const express = require("express");
const serverless = require("serverless-http");
const mysql = require("mysql2/promise");

const app = express();
const router = express.Router();

// Add middleware to parse JSON bodies
app.use(express.json());

router.post("/", async (req, res) => {
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
    const { user_id, amount, premium } = req.body;

    if (!user_id || amount === undefined) {
      return res
        .status(400)
        .json({ error: "Missing user_id or amount in request body" });
    }

    // Start a transaction
    await connection.beginTransaction();

    // Check current credit amount
    const [currentCredits] = await connection.execute(
      "SELECT amount, premium_status FROM User_Credits WHERE user_id = ? FOR UPDATE",
      [user_id]
    );

    if (currentCredits.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: "User not found" });
    }

    const currentAmount = currentCredits[0].amount;
    let newAmount;

    if (premium == "") {
      newAmount = currentAmount + amount;
    }
    if (
      currentCredits[0].premium_status == "free" &&
      (premium == "premium" || premium == "pro")
    ) {
      newAmount = currentAmount + amount;
    }

    if (newAmount < 0) {
      await connection.rollback();
      return res.status(400).json({ error: "Insufficient credits" });
    }

    await connection.execute(
      "UPDATE User_Credits SET amount = ?, premium_status = ? WHERE user_id = ?",
      [newAmount, premium, user_id]
    );

    // Commit the transaction
    await connection.commit();

    res.json({ success: true, updatedAmount: newAmount });
  } catch (error) {
    await connection.rollback();
    console.error("Error executing database query:", error);
    res.status(500).json({ error: "Error processing the request" });
  } finally {
    connection.end();
  }
});

// Mount the router at the base path for your function
app.use(`/.netlify/functions/updateUserCreditAmount`, router);

// Export the app wrapped with serverless-http
module.exports = app;
module.exports.handler = serverless(app);
