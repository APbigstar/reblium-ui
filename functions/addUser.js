const express = require("express");
const serverless = require("serverless-http");
const mysql = require("mysql2/promise");

const app = express();
const router = express.Router();
app.use(express.json()); // Add this line to parse the request body as JSON

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
    const { user_id } = req.body;

    // Check if the user exists in the database
    const checkUserExistsQuery = "SELECT id FROM User_Info WHERE User_id = ?";
    const [rows] = await connection.execute(checkUserExistsQuery, [user_id]);

    let user_info_id;

    if (rows.length === 0) {
      // User does not exist, insert a new entry
      const addUserQuery = "INSERT INTO User_Info (User_id) VALUES (?)";
      const [result] = await connection.execute(addUserQuery, [user_id]);
      user_info_id = result.insertId;
    } else {
      // User already exists, get the user_info_id
      user_info_id = rows[0].id;
    }

    res.json({ user_info_id });
  } catch (error) {
    console.error("Error executing database query:", error);
    res.status(500).json({ error: "Error processing the request" });
  } finally {
    connection.end();
  }
});

// Mount the router at the base path for your function
app.use(`/.netlify/functions/addUser`, router);

// Export the app wrapped with serverless-http
module.exports = app;
module.exports.handler = serverless(app);
