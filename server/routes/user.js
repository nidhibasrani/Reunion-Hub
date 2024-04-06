const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth')
const Event = require('../models/Event');


// user register
router.post('/register', upload.single('profileImage'), async (req, res) => {
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

       
        const newUser = new User({
            userName,
            firstName,
            lastName,
            password: hashedPassword,
            enrollmentNumber,
            profileImage: req.file ? req.file.path : null 
        });

       
        await newUser.save();

    
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

        const token = jwt.sign({ userId: user._id , role : user.role}, process.env.JWT_KEY);
        const { password: userPassword, ...others } = user._doc; 
    
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ ...others, token });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Get me

router.get('/me', auth, async (req, res)=>{
    try {
        
        const {userId} = req.user;

        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    
        
    }
})


// Participate In Event

router.post('/participate/:id', auth, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const [user, event] = await Promise.all([
            User.findById(userId),
            Event.findById(id)
        ]);

        if (!user || !event) {
            return res.status(404).json({ message: 'User or Event not found' });
        }

        
        if (event.participants.includes(userId)) {
            return res.status(400).json({ message: 'You are Already Participating in this Event' });
        }

        
        user.events.push(id);
        event.participants.push(userId);

        await Promise.all([
            User.findByIdAndUpdate(userId, { $push: { events: id } }),
            Event.findByIdAndUpdate(id, { $push: { participants: userId } })
        ]);

        res.status(200).json({ message: 'Event participation added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



//  Get All Events
router.get('/all-events',  async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get Single Event
router.get('/event/:id',  async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('participants');
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//  Get My Events

router.get('/my-events', auth, async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await User.findById(userId).populate('events'); 
        res.json(user.events); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});









module.exports = router;
