const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

// ADD THIS - Check if env variables are loaded
console.log('Environment variables loaded:');
console.log('ADMIN_USERNAME:', process.env.ADMIN_USERNAME);
console.log('ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD);
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    console.log('Login attempt:');
    console.log('Received username:', username);
    console.log('Received password:', password);
    console.log('Expected username:', process.env.ADMIN_USERNAME);
    console.log('Expected password:', process.env.ADMIN_PASSWORD);

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (username === adminUsername && password === adminPassword) {
        const user = {
            username: adminUsername,
            role: 'SELLER'
        };

        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            success: true,
            token,
            user
        });
    } else {
        console.log('Authentication failed!');
        res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});