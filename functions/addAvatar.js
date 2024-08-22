const express = require("express");
const serverless = require("serverless-http");
const mysql = require("mysql2/promise");

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
    const { avatarName, user_info_id } = req.body;

    // Perform the database query to add the avatar details to the Avatar table
    const addAvatarQuery =
      "INSERT INTO Avatar (Avatar_Name, User_Info_id) VALUES (?, ?)";
    const [result] = await connection.execute(addAvatarQuery, [
      avatarName,
      user_info_id,
    ]);
    // Get the inserted avatar_id
    const avatarId = result.insertId;

    // Send the inserted avatar_id in the response
    res.json({ message: "Avatar added successfully", saveavatar: avatarId });
  } catch (error) {
    console.error("Error executing database query:", error);
    res
      .status(500)
      .json({ error: "Error processing the request", details: error });
  } finally {
    // Close the database connection
    connection.end();
  }
});

// Mount the router at the base path for your function
app.use(`/.netlify/functions/addAvatar`, router);

// Export the app wrapped with serverless-http
module.exports = app;
module.exports.handler = serverless(app);
