const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const OpenAI = require('openai');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();
const router = express.Router();

app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", async (req, res) => {
    const { transcript } = req.body;
    if (!transcript) {
        console.error("No transcript provided.");
        return res.status(400).json({ error: "No transcript provided." });
    }

    try {
        console.log('Received transcript:', transcript);

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful assistant that summarizes transcripts." },
                { role: "user", content: `Please summarize the following transcript:\n\n${transcript}` }
            ],
        });

        const summary = response.choices[0].message.content;
        console.log('Generated summary:', summary);

        const msg = {
            to:  'harmen@sharingcitiesalliance.com', // Change to your recipient
            from: process.env.EMAIL_USER, // Change to your verified sender
            subject: 'Chat Transcript Summary',
            text: `Here is the summary:\n\n${summary}\n\nHere is the original transcript:\n\n${transcript}`,
        };

        console.log('Sending email with the following details:', msg);

        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent');
                res.json({ summary, message: 'Email sent successfully' });
            })
            .catch((error) => {
                console.error("Error sending email:", error.response ? error.response.body : error);
                res.status(500).json({ error: "Failed to send email.", details: error.response ? error.response.body : error.message });
            });

    } catch (error) {
        console.error("Error summarizing transcript:", error);
        if (error instanceof OpenAI.APIError) {
            res.status(error.status).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Failed to summarize transcript." });
        }
    }
});

app.use("/.netlify/functions/summarizeHarmen", router);

module.exports = app;
module.exports.handler = serverless(app);
