const express = require("express");
const serverless = require("serverless-http");
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
app.use(bodyParser.json({ limit: '10mb' }));

// API to update avatar name
router.post("/", async (req, res) => {
  try {
    const { id, Avatar_Name } = req.body;

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

    // Prepare and execute the SQL query to update the Avatar_Name for the given ID
    const updateNameQuery = 'UPDATE Avatar SET Avatar_Name = ? WHERE id = ?';
    await connection.execute(updateNameQuery, [Avatar_Name, id]);

    // Close the database connection
    connection.end();

    // Send a success response back to the client
    res.json({ message: 'Avatar name updated successfully' });
  } catch (error) {
    console.error('Error updating Avatar name:', error);
    res.status(500).json({ error: 'Error updating Avatar name' });
  }
});

// Mount the router at the base path for your function
app.use(`/.netlify/functions/updateAvatarName`, router);

// Export the app wrapped with serverless-http
module.exports = app;
module.exports.handler = serverless(app);
