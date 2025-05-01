const express = require('express');
const router = express.Router();
const pool = require('../db');

let currentID = 2;
const createID = () => {
    return currentID++;
}

router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    const id = createID();
    const newUser = [id, name, email, password];
    console.log(newUser);
    const query = `insert into users (id, name, email, password)
                   VALUES (?, ?, ?, ?)`;
    const [rows, fields] = await pool.query(query, newUser, (err, result) => {
        if (err) {
            res.status(500).send({message: `Error creating user: ${err.stack}`});
        } else {
            res.status(200).send({
                message: 'Successfully registered',
                user: {id, name, email, password},
                rows,
            });
        }
    })
})

module.exports = router;