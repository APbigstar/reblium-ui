const express = require("express");
const serverless = require("serverless-http");
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '50mb' }));

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
    const { base64Image } = req.body;  // This should match the JSON key sent from frontend
    if (!base64Image) {
        console.error("No image data provided.");
        return res.status(400).json({ error: "No image data provided." });
    }

    try {
        console.log('Received image data');

        // Assuming GPT-4o can interpret the base64 image
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful assistant that interprets images." },
                {
                    role: "user",
                    content: [{
                        type: "text",
                        text: "Whats in this image?"
                    }, {
                        type: "image_url",
                        image_url: { url: base64Image }
                    }]
                }
            ],
        });

        const interpretation = response.choices[0].message.content;
        console.log('Image interpreted:', interpretation);

        res.json({ interpretation, message: 'Interpretation provided successfully' });
    } catch (error) {
        console.error("Error processing image:", error);
        res.status(500).json({ error: "Failed to process image.", details: error.toString() });
    }
});


app.use("/.netlify/functions/screenShare", router);

module.exports = app;
module.exports.handler = serverless(app);
