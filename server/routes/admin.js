const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin')



// admin register

router.post('/register', async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ msg: "Please fill in all fields" });
        }
        const user = await Admin.findOne({ userName });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new Admin({
            userName,
            
            password: hash
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// admin login

router.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ msg: "Please fill in all fields" });
        }
        const user = await Admin.findOne({ userName });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
        res.json({
            token,
            user: {
                id: user._id,
                userName: user.userName,
                role : user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;