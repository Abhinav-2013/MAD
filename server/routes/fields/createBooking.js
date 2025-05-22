const router = require('express').Router();
const authenticateToken = require('../../middlewares/authenticate');
const pool = require('../../db');

router.post('/', authenticateToken, async (req, res) => {
    const { sportType, startTime, date, userID } = req.body;
    let fieldID, slotID;
    try {
        // Get FieldID from sportType
        const [rows] = await pool.query(
            'select field_id, slot_id from Field where sport_type = ?',
            [sportType]
        );
        if (rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'Field not found'
            });
            return;
        }
        [fieldID] = rows;

        // Get SlotID from startTime
        const [slotRows] = await pool.query(
            'select slot_id from TimeSlot where start_time = ?',
            [startTime]
        );
        if (slotRows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'Slot not found'
            });
            return;
        }
        [slotID] = slotRows;
    } catch (err) {
        console.error('Error fetching field:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch field',
            error: err.message
        });
    }
    const query = 'insert into Booking (field_id, slot_id, booking_date, user_id)' +
        'values (?, ?, ?, ?)';

    try {
        const [result] = await pool.query(query, [fieldID, slotID, date, userID]);

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            bookingId: result.insertId
        });
    } catch (err) {
        console.error('Error creating booking:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to create booking',
            error: err.message
        });
    }
})

module.exports = router;
