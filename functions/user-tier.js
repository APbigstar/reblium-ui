const express = require("express");
const serverless = require("serverless-http");
const mysql = require('mysql2/promise');

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
  
    // Capture the user_info_id from the query parameters
    const { user_info_id } = req.query;
    if (!user_info_id) {
      return res.status(400).json({ error: 'Missing or invalid user_info_id parameter' });
    }
  
    // SQL query that joins UserAccountTiers with AccountTiers to retrieve the tier name
    const query = `
      SELECT a.tier_name
      FROM UserAccountTiers u
      INNER JOIN AccountTiers a ON u.tier_id = a.tier_id
      WHERE u.user_id = ?;
    `;
  
    try {
      const [rows] = await connection.execute(query, [user_info_id]);
      if (rows.length === 0) {
        res.status(404).json({ error: 'User or tier not found' });
      } else {
        // Assuming each user has only one tier, sending the first found entry
        res.json(rows[0]);
      }
    } catch (error) {
      console.error('Error executing database query:', error);
      res.status(500).json({ error: 'Error processing the request', details: error.message });
    } finally {
      connection.end();
    }
  });
  

// Mount the router at the base path for your function
app.use(`/.netlify/functions/user-tier`, router);

// Export the app wrapped with serverless-http
module.exports = app;
module.exports.handler = serverless(app);