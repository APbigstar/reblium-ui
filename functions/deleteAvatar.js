const express = require("express");
const serverless = require("serverless-http");
const mysql = require('mysql2/promise');

const app = express();
const router = express.Router();
app.use(express.json());

router.delete("/:avatarId", async (req, res) => {
  const avatarId = req.params.avatarId;

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
    // Perform the database query to delete the avatar with the given avatarId
    const deleteAvatarQuery = 'DELETE FROM Avatar WHERE id = ?';
    await connection.execute(deleteAvatarQuery, [avatarId]);

    // If the deletion is successful, send a success message in the response
    res.json({ message: 'Avatar deleted successfully' });
  } catch (error) {
    console.error('Error executing database query:', error);
    res.status(500).json({ error: 'Error processing the request', details: error });
  } finally {
    // Close the database connection
    connection.end();
  }
});

// Mount the router at the base path for your function
app.use(`/.netlify/functions/deleteAvatar`, router);

// Export the app wrapped with serverless-http
module.exports = app;
module.exports.handler = serverless(app);
