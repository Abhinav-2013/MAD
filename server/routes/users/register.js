const express = require('express');
const router = express.Router();
const pool = require('../../db');

let currentID = 2;
const createID = () => {
    return currentID++;
}

router.post('/', async (req, res) => {
    const {name, email, password} = req.body;
    const newUser = [name, email, password];
    // console.log(newUser);
    const query = `insert into users (name, email, password)
                   VALUES (?, ?, ?)`;
    try {
        const [rows] = await pool.query(query, newUser);
        res.status(200).send({
            message: 'Successfully registered',
            user: {id, name, email, password},
            rows,
        });
    } catch (err) {
        res.status(500).send({message: `Error creating user: ${err.stack}`});
    }
})

module.exports = router;