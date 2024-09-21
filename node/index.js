const express = require('express');
const { json } = require('express');
const { connect, Schema, model } = require('mongoose');
const port = 8001;
const app = express();
require('dotenv').config();

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
connect(mongoURI)
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
        const userId = req.query.id;
        if(userId){
            const user = await User.findOne({ id: userId });
            if(!user){
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user);
        }
        else{
            const user = await User.find().sort({id:1});
            const html = `
                <ul>
                    <li>${user.map(user => `<li>${user.name}</li>`).join('')}</li>
                </ul>
            `
            res.send(html);
        }
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

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save()
        .then(savedUser => res.status(201).json(savedUser))  // Respond with 201 Created
        .catch(error => res.status(400).json({ error: error.message }));  // Respond with 400 Bad Request
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

module.exports = app;