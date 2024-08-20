const express = require("express");
const serverless = require("serverless-http");

const app = express();
app.use(express.json()); // Enable JSON body parsing
const router = express.Router();

let avatarDataStore = {}; // In-memory storage for avatar data

// POST route to store avatar data
router.post("/", (req, res) => {
    const { avatarId, avatarJsonData } = req.body;
    avatarDataStore[avatarId] = avatarJsonData; // Store the avatar data with its ID
    res.json({ message: "Avatar data stored successfully" });
});

// New GET route to retrieve stored avatar data
router.get("/test", (req, res) => {
    res.json(avatarDataStore);
});


// Mount the router at the base path for your function
app.use(`/.netlify/functions/storeAvatarData`, router);

// Export the app wrapped with serverless-http
module.exports = app;
module.exports.handler = serverless(app);
