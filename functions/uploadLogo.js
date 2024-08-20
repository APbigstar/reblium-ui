const express = require("express");
const serverless = require("serverless-http");
const mysql = require('mysql2/promise');
const multer = require('multer');

const app = express();
const router = express.Router();
app.use(express.json());

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single('logo'), async (req, res) => {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_DATABASE;

    const connection = await mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
    });

    try {
        const { user_info_id } = req.body;
        const logo = req.file.buffer;

        // Insert the logo into the database
        const insertLogoQuery = 'INSERT INTO User_Logos (user_info_id, logo) VALUES (?, ?)';
        await connection.execute(insertLogoQuery, [user_info_id, logo]);

        res.json({ message: 'Logo uploaded successfully' });
    } catch (error) {
        console.error('Error uploading logo:', error);
        res.status(500).json({ error: 'Error uploading logo' });
    } finally {
        connection.end();
    }
});

app.use(`/.netlify/functions/uploadLogo`, router);

module.exports = app;
module.exports.handler = serverless(app);
