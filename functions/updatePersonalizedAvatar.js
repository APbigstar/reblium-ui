const express = require("express");
const serverless = require("serverless-http");
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
app.use(bodyParser.json({ limit: '10mb' }));

router.post("/", async (req, res) => {
  try {
    const { id, Avatar_Image, Avatar } = req.body;

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

    if (Avatar_Image === undefined && Avatar === undefined) {
      res.status(400).json({ error: 'Both Avatar_Image and Avatar are missing' });
      return;
    }

    if (Avatar_Image !== undefined) {
      // Prepare and execute the SQL query to update the Avatar_Image for the given ID
      const updateImageQuery = 'UPDATE PersonalizedAvatar SET Avatar_Image = ? WHERE id = ?';
      await connection.execute(updateImageQuery, [Avatar_Image, id]);
    }

    if (Avatar !== undefined) {
      // Prepare and execute the SQL query to update the Avatar JSON for the given ID
      const updateAvatarQuery = 'UPDATE PersonalizedAvatar SET Avatar = ? WHERE id = ?';
      await connection.execute(updateAvatarQuery, [JSON.stringify(Avatar), id]);
    }

    // Close the database connection
    connection.end();

    // Send a success response back to the client
    res.json({ message: 'Avatar updated successfully' });
  } catch (error) {
    console.error('Error updating Avatar:', error);
    res.status(500).json({ error: 'Error updating Avatar' });
  }
});

// Mount the router at the base path for your function
app.use(`/.netlify/functions/updatePersonalizedAvatar`, router);

// Export the app wrapped with serverless-http
module.exports = app;
module.exports.handler = serverless(app);
