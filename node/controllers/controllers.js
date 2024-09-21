const getHome = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the Home Page'
    });
}

// User Schema
const UserSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    city: { type: String, required: true }
});

const User = model('User', UserSchema);

const getUsers = async (req, res) => {
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
            const users = await User.find().sort({id:1});
            res.json(users);
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};