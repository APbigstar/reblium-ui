const express = require("express");
const serverless = require("serverless-http");
const mysql = require("mysql2/promise");

const app = express();
const router = express.Router();
app.use(express.json()); // Middleware to parse JSON request bodies

// Endpoint to submit feedback
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
    const { rating, message, name, email, wants_clone } = req.body;

    // Validate inputs
    if (!rating || typeof rating !== "number") {
      return res.status(400).json({ error: "Rating is required and must be a number." });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: "A valid email is required." });
    }

    // Prepare SQL query to insert feedback
    const insertFeedbackQuery = `
      INSERT INTO feedback (rating, message, name, email, wants_clone)
      VALUES (?, ?, ?, ?, ?)
    `;
    await connection.execute(insertFeedbackQuery, [rating, message, name, email, wants_clone ? 1 : 0]);

    res.status(200).json({ message: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Error executing database query:", error);
    res.status(500).json({ error: "Error processing the request." });
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

// Mount the router at the base path for your function
app.use(`/.netlify/functions/submitFeedback`, router);

// Export the app wrapped with serverless-http
module.exports = app;
module.exports.handler = serverless(app);
