const express = require('express');
const pool = require("../../db");
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const query = `select * from users where email=? and password=?`;
    try {
        const [rows] = await pool.query(query, [email, password]);
        if (rows.length > 0) {
            // Generate JWT
            const token = jwt.sign({id: rows[0].id}, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({
                success: true,
                message: `Successfully logged in`,
                token,
                user: rows[0],
            });
        } else {
            res.status(200).json({
                success: false,
                message: `Credentials Not Found`,
            })
        }
    } catch (err) {
        res.status(500).json({
            message: `Error logging in`,
            error: err,
        });
    }
})

module.exports = router;