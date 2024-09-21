const express = require('express');
const { json } = require('express');
const { connect, Schema, model } = require('mongoose');

const port = 8000;
const app = express();

// Connect to MongoDB
connect("mongodb://localhost:27017/app_database")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// User Schema
const UserSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    city: { type: String, required: true }
});

const User = model('User', UserSchema);

//MiddleWare
app.use(json());

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find().sort({id:1});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Welcome message
app.get('/', (req, res) => {
    res.json({
        "success": true,
        "message": "Welcome to the API!"
    });
});

// POST to process data
app.post('/', (req, res) => {
    const data = req.body.data || [];

    const alphabets = data.filter(item => isNaN(item));
    const numbers = data.filter(item => !isNaN(item)).map(Number);
    const maxAlphabet = alphabets.length ? alphabets.sort().reverse()[0] : null;
    const maxNumber = numbers.length ? Math.max(...numbers) : null;

    res.json({
        "success": true,
        "max_alphabet": maxAlphabet,
        "max_number": maxNumber,
        "numbers": numbers,
        "alphabets": alphabets, 
    });
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
