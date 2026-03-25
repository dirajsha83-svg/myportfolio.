const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// --- CONNECTING TO YOUR TIDB CLUSTER ---
const db = mysql.createConnection({
    host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
    user: "Ra3J4uG5nQywAWw.root",
    password: "ydN3otrYc9Pr7TJ1",
    database: "test", 
    port: 4000,
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: false // This bypasses the need for the local CA cert file
    }
});

db.connect((err) => {
    if (err) {
        console.error("❌ TiDB CONNECTION ERROR:", err.message);
    } else {
        console.log("✅ CONNECTED TO TiDB CLOUD SUCCESSFULLY!");
    }
});

// Serve the frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// The Contact form route
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    
    console.log("Received data:", { name, email, message });

    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
    
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error("❌ SQL ERROR:", err.message);
            return res.status(500).json({ message: "Database error ❌" });
        }
        console.log("✅ Message saved to database!");
        res.json({ message: "Message saved to TiDB successfully ✅" });
    });
});

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});