const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();
const pool = require('./db')
const registerRoute = require('./routes/register');

const app = express();
app.use(express.json());

// Create a .env file with
// DB_HOST="localhost"
// DB_USER="root"
// DB_PASSWORD="password_here"
// DB_DATABASE="MAD"

const port = process.env.PORT || 5000;

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// });

pool.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database with ID ' + connection.threadId);
});

app.use('/register', registerRoute);
// let currentID = 2;
// const createID = () => {
//     return currentID++;
// }
//
// app.post('/register', (req, res) => {
//     const { name, email, password } = req.body;
//     const id = createID();
//     const newUser = [id, name, email, password];
//     console.log(newUser);
//     const query = `insert into users (id, name, email, password) VALUES (?, ?, ?, ?)`;
//     connection.query(query, newUser, (err, result) => {
//         if (err) {
//             res.status(500).send({message: `Error creating user: ${err.stack}`});
//         } else {
//             res.status(200).send({
//                 message: 'Successfully registered',
//                 user: {id, name, email, password}
//             });
//         }
//     })
// });

app.get('/users', (req, res) => {
    const query = "select * from users";
    pool.query(query, (err, result) => {
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
