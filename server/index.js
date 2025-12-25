const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

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
        res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
