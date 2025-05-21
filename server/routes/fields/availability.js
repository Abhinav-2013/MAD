const express = require("express");
const pool = require("../../db");
const router = express.Router();
const authenticateToken = require("../../middlewares/authenticate");

const checkPrice = async (type) => {
    const query = 'select price from Field where sport_type = ?';
    try {
        const [rows] = await pool.query(query, [type]);
        return rows[0]['price'];
    } catch (err) {
        console.log(err.stack);
    }
}

router.post("/", authenticateToken, async (req, res) => {
    const query = 'select count(*) from Booking ' +
        'where field_id = (select field_id from Field where sport_type = ?) ' +
        'and slot_id in (select slot_id from TimeSlot where start_time = ?) ' +
        'and booking_date = ?';
    // Query vector of the form [sportType, startTime, date]
    // Proceed to payment to be added
    const { sportType, startTime, date } = req.body;
    const info = [sportType, startTime, date];
    try {
        const [rows] = await pool.query(query, info);
        console.log(rows[0]['count(*)']);
        if(rows[0]['count(*)'] === 0) {
            console.log('In If block');
            const price = await checkPrice(sportType);
            console.log(price);
            res.status(200).json({
                success: true,
                message: `Field is available`,
                price,
            });
        } else {
            res.status(200).json({
                success: false,
                message: `Field is not available`,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: `Error fetching availability`,
            error: err.stack,
        })
    }
})

module.exports = router;