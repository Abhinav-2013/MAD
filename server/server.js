const express = require('express');
require('dotenv').config();
const pool = require('./db');
const registerRoute = require('./routes/users/register');
const loginRoute = require('./routes/users/login');
const availableRoute = require('./routes/fields/availability');
const createBookingRoute = require('./routes/fields/createBooking');

const app = express();
app.use(express.json());

// Create a .env file with
// DB_HOST="localhost"
// DB_USER="root"
// DB_PASSWORD="password_here"
// DB_DATABASE="MAD"

const port = process.env.PORT || 5000;

// Routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/availability', availableRoute);
app.use('/booking', createBookingRoute);

app.get('/users', async (req, res) => {
    const query = "select * from users";
    try {
        const [rows] = await pool.query(query);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Only start the server if this file is run directly
if (require.main === module) {
    const server = app.listen(port, () => {
        console.log(`server listening on port ${port}`);
    });

    process.on('SIGINT', async () => {
        console.log("Shutting Down Server");
        try {
            await new Promise((resolve, reject) => {
                server.close((err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });

            await pool.end();
            console.log("Connection closed");

            process.exit(0);
        } catch (error) {
            console.error("Error during shutdown:", error);
            process.exit(1);
        }
    });
} else {
    // Export for testing
    module.exports = app;
}

