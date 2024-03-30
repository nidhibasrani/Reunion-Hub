const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin')
const User = require('../models/User');
const Event = require('../models/Event');
const upload = require('../middleware/upload');
const eventImage = require('../middleware/EventImage')
const Cms = require('../models/Cms');
const websiteGallery = require('../middleware/Website');
const isAdmin = require('../middleware/isAdmin');
const auth = require('../middleware/auth')


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
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY);
        res.json({
            token,
            user: {
                id: user._id,
                userName: user.userName,
                role: user.role
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: err.message });
    }
});



// Get All Users 

router.get('/users', auth, async (req, res) => {
    try {
        const { role } = req.user;
        console.log(role);
        if (role !== 'admin') {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        const users = await User.find().select('userName profileImage');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Delete a User

router.delete('/delete-user/:id', auth, async (req, res) => {



    try {
        const { role } = req.user;
        console.log(role);
        if (role !== 'admin') {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const user = await User.findByIdAndDelete(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//  Add an Event


router.post('/add-event', auth, eventImage('featuredImage', 'gallery'), async (req, res) => {

    const { role } = req.user;
    console.log(role);
    if (role !== 'admin') {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const { title, description } = req.body;

    // Check if all required fields are provided
    if (!title || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newEvent = new Event({
            title,
            description,

            featuredImage: req.files['featuredImage'] ? req.files['featuredImage'][0].path : null,
            gallery: req.files['gallery'] ? req.files['gallery'].map(file => file.path) : []
        });

        // Save the new event
        await newEvent.save();

        // Respond with success message
        res.status(201).json({ message: 'Event added successfully', event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


//  Get All Events
router.get('/all-events', auth, async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Event

router.delete('/delete-event/:id', auth, async (req, res) => {
    try {
        const { role } = req.user;

        if (role !== 'admin') {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        const event = await Event.findByIdAndDelete(req.params.id);
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Add Images in Websites Gallery
router.post('/website-gallery', auth, websiteGallery('gallery'), async (req, res) => {
    try {
        const { role } = req.user;
        console.log(role);
        if (role !== 'admin') {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No images uploaded or invalid image format' });
        }

        const galleryPaths = req.files.map(file => file.path);

        const newCms = new Cms({
            gallery: galleryPaths
        });

        await newCms.save();

        res.status(201).json({ message: 'Images added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;