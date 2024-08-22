const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
//const serverless = require("serverless-http");

const app = express();
const port = process.env.PORT || 5500;

// Enable CORS to allow cross-origin requests from the frontend
app.use(cors());
app.use(express.json());

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

// Create a database connection
const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});

// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }
//   console.log("Connected to the database!");
// });

// Define an API endpoint to fetch avatar data for a specific user_info_id
app.get("/api/user_avatars", (req, res) => {
  const { user_info_id } = req.query;
  const fetchAvatarsQuery = "SELECT * FROM Avatar WHERE User_Info_id = ?";
  connection.query(fetchAvatarsQuery, [user_info_id], (err, results) => {
    if (err) {
      console.error("Error fetching avatars:", err);
      res.status(500).json({ error: "Error fetching avatars" });
    } else {
      res.json(results);
    }
  });
});

app.post("/api/add_avatar", (req, res) => {
  const { avatarName, user_info_id, avatarImage } = req.body; // Get avatarName, user_info_id, and avatarImage from the request body

  const addAvatarQuery =
    "INSERT INTO Avatar (Avatar_Name, User_Info_id, Avatar_Image) VALUES (?, ?, ?)";
  connection.query(
    addAvatarQuery,
    [avatarName, user_info_id, avatarImage],
    (err, results) => {
      if (err) {
        console.error("Error adding avatar name:", err);
        return res.status(500).json({ error: "Error adding avatar name" });
      } else {
        const user_info_id = results.insertId;
        console.log(
          "Avatar name added to the database:",
          avatarName,
          "with ID:",
          user_info_id
        );
        return res.json({ id: user_info_id });
      }
    }
  );
});

// Define an API endpoint to check if a User_id exists in the User_Info table
app.get("/api/check_user_exists", (req, res) => {
  const { user_id } = req.query;
  const checkUserExistsQuery = "SELECT id FROM User_Info WHERE User_id = ?"; // Modify the query to select only the id
  connection.query(checkUserExistsQuery, [user_id], (err, results) => {
    if (err) {
      console.error("Error checking if User_id exists:", err);
      res.status(500).json({ error: "Error checking if User_id exists" });
    } else {
      if (results.length === 0) {
        // User does not exist in the User_Info table
        res.json({ exists: false });
      } else {
        // User exists, return the id from the User_Info table
        const user_info_id = results[0].id;
        res.json({ exists: true, user_info_id });
      }
    }
  });
});

// Define an API endpoint to add a new user to the User_Info table
app.post("/api/add_user", (req, res) => {
  const { user_id } = req.body; // Get the userId from the request body

  const checkUserExistsQuery = "SELECT id FROM User_Info WHERE User_id = ?";
  connection.query(checkUserExistsQuery, [user_id], (err, results) => {
    if (err) {
      console.error("Error checking if User_id exists:", err);
      return res
        .status(500)
        .json({ error: "Error checking if User_id exists" });
    } else {
      if (results.length === 0) {
        // User does not exist in the User_Info table, so add it
        const addUserQuery = "INSERT INTO User_Info (User_id) VALUES (?)";
        connection.query(addUserQuery, [user_id], (err, results) => {
          if (err) {
            console.error("Error adding new user:", err);
            return res.status(500).json({ error: "Error adding new user" });
          } else {
            const user_info_id = results.insertId;
            console.log(
              "New user added to the database with ID:",
              user_info_id
            );
            return res.json({ user_info_id });
          }
        });
      } else {
        // User already exists, return the existing user_info_id
        const user_info_id = results[0].id;
        return res.json({ user_info_id });
      }
    }
  });
});

// module.exports.handler = serverless(app);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
