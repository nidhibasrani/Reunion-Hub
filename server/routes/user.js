const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// user register
router.post('/register', async (req, res) => {
    const { userName, firstName, lastName, password, enrollmentNumber } = req.body;


    if (!userName || !firstName || !lastName || !password || !enrollmentNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {

        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object
        const newUser = new User({
            userName,
            firstName,
            lastName,
            password : hashedPassword,
            enrollmentNumber
        });


        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




// user login


router.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    

    if (!userName || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const accessToken = jwt.sign({ userId: user._id , role : user.role}, process.env.JWT_KEY);
        const { password: userPassword, ...others } = user._doc; 
    
        res.cookie("token", accessToken, { httpOnly: true });
        res.status(200).json({ ...others, accessToken });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});











module.exports = router;
