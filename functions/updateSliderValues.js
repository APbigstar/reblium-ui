// updateSliderValues.js

const express = require("express");
const serverless = require("serverless-http");
const mysql = require('mysql2/promise');

const app = express();
const router = express.Router();
app.use(express.json()); // Add this line to parse the request body as JSON

router.post("/", async (req, res) => {
  // Get the database connection details from environment variables or use hardcoded values
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
    // Use req.body to access the parsed JSON data sent from the frontend
    const { avatarId, sliderValues } = req.body;

    // Perform the database query to update the slider values for the given avatar ID
    const updateSliderValuesQuery = 'UPDATE Avatar SET SliderValues = ? WHERE id = ?';
    await connection.execute(updateSliderValuesQuery, [JSON.stringify(sliderValues), avatarId]);

    // Close the database connection
    connection.end();

    // Send a success response back to the client
    res.json({ message: 'Slider values updated successfully' });
  } catch (error) {
    console.error('Error updating slider values:', error);
    res.status(500).json({ error: 'Error updating slider values' });
  }
});

// Mount the router at the base path for your function
app.use(`/.netlify/functions/updateSliderValues`, router);

// Export the app wrapped with serverless-http
module.exports = app;
module.exports.handler = serverless(app);
