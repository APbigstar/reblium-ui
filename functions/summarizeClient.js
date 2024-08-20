const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const OpenAI = require('openai');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();
const router = express.Router();

app.use(bodyParser.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", async (req, res) => {
    const { summary, userEmail } = req.body; // Accept summary directly along with userEmail

    if (!summary) {
        console.error("No summary provided.");
        return res.status(400).json({ error: "No summary provided." });
    }
    if (!userEmail) {
        console.error("No email address provided.");
        return res.status(400).json({ error: "User email address is required." });
    }

    const msg = {
        to: userEmail, // Use the provided userEmail
        from: process.env.EMAIL_USER, // Change to your verified sender
        subject: 'Chat Transcript Summary',
        text: `Here is your chat summary:\n\n${summary}`,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent');
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error("Error sending email:", error.response ? error.response.body : error);
        res.status(500).json({ error: "Failed to send email.", details: error.response ? error.response.body : error.message });
    }
});


app.use("/.netlify/functions/summarizeClient", router);

module.exports = app;
module.exports.handler = serverless(app);
