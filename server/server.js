const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// Create a .env file

const port = process.env.PORT || 5000;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database with ID ' + connection.threadId);
});



app.get('/users', (req, res) => {
    const query = "SELECT * from users";
    connection.query(query, (err, result) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    })
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
