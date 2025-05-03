const express = require('express');
const pool = require("../../db");
const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const query = `select * from users where email=? and password=?`;
    try {
        const [rows] = await pool.query(query, [email, password]);
        if (rows.length > 0) {
            res.status(200).json({
                success: true,
                message: `Successfully logged in`,
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