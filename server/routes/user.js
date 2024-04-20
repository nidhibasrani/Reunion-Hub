const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const Event = require("../models/Event");
const axios = require("axios");
const crypto = require("crypto");
const Cms = require("../models/Cms");
const Contact = require("../models/Contact");
const frontUrl = process.env.FRONT_URL;
const {enrollNumbers} = require('../data/Enrollment')



// user register
router.post("/register", upload.single("profileImage"), async (req, res) => {
  const { userName, firstName, lastName, password, enrollmentNumber } =
    req.body;

  if (!userName || !firstName || !lastName || !password || !enrollmentNumber) {
    return res.status(400).json({ message: "All fields are required" });
  } 


  if(!enrollNumbers.includes(enrollmentNumber)){
    return res.status(400).json({ message: "Invalid Enrollment Number." });
  }

  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }



    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      firstName,
      lastName,
      password: hashedPassword,
      enrollmentNumber,
      profileImage: req.file ? req.file.path : null,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// user login

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_KEY
    );
    const { password: userPassword, ...others } = user._doc;

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ ...others, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get me

router.get("/me", auth, async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Phone Pay

const MERCHANT_ID = process.env.MERCHANT_ID;
const SALT_KEY = process.env.SALT_KEY;
function generateUniqueId() {
  const timestamp = Date.now().toString(36); // Convert current timestamp to base36 string
  const randomString = Math.random().toString(36).substr(2, 5); // Generate a random string
  return timestamp + randomString; // Concatenate timestamp and random string
}

async function phonePay(amount, userId, eventId) {
  try {
    const merchantTransactionId = generateUniqueId();
    console.log(merchantTransactionId);

    const data = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: userId,
      amount: amount * 100,
      redirectUrl: `http://localhost:5000/api/user/status/${merchantTransactionId}/${userId}/${eventId}`,
      redirectMode: "REDIRECT",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const base64Payload = Buffer.from(JSON.stringify(data)).toString("base64");

    const saltKey = SALT_KEY;
    const saltIndex = 1;
    const payloadWithApiEndpoint = base64Payload + "/pg/v1/pay" + saltKey;
    const xVerify =
      crypto.createHash("sha256").update(payloadWithApiEndpoint).digest("hex") +
      "###" +
      saltIndex;

    const response = await axios.post(
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
      { request: base64Payload },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerify,
        },
      }
    );

    return response.data; // Return the payment response
  } catch (error) {
    console.error("Error:", error);
    throw error; // Propagate the error
  }
}

async function participateInEvent(userId, eventId) {
  try {
    const [user, event] = await Promise.all([
      User.findById(userId),
      Event.findById(eventId),
    ]);

    if (!user || !event) {
      throw new Error("User or Event not found");
    }

    if (event.participants.includes(userId)) {
      throw new Error("You are Already Participating in this Event");
    }

    // Add user to event participants
    user.events.push(eventId);
    event.participants.push(userId);

    // Update user and event
    await Promise.all([user.save(), event.save()]);

    return true; // Event participation added successfully
  } catch (error) {
    console.error(error);
    throw error; // Propagate the error
  }
}

// status check

router.get(
  "/status/:merchantTransactionId/:userId/:eventId",
  async (req, res) => {
    try {
      const { merchantTransactionId, userId, eventId } = req.params;
      console.log("event Id:", eventId); // Log userId to check its value

      // Ensure userId is not undefined
      if (!userId) {
        return res.status(400).json({ error: "userId is undefined" });
      }

      // Assuming MERCHANT_ID is defined somewhere in your code

      // Calculate X-VERIFY header
      const saltKey = SALT_KEY; // Get from PhonePe documentation
      const saltIndex = 1; // Get from PhonePe documentation
      const xVerify =
        crypto
          .createHash("sha256")
          .update(
            `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}${saltKey}`
          )
          .digest("hex") +
        "###" +
        saltIndex;

      const options = {
        method: "get",
        url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-MERCHANT-ID": MERCHANT_ID,
          "X-VERIFY": xVerify,
        },
      };

      axios.request(options).then(async function (response) {
        console.log("status report", response.data);
        if (response.data.code === "PAYMENT_SUCCESS") {
          const result = await participateInEvent(userId, eventId);
          res.redirect(frontUrl);
        } else {
          // Payment failed or pending
          return res.status(200).json({ message: "Payment not successful" });
        }
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" }); // Send error response to the client
    }
  }
);

// Participate In Event

router.post("/participate/:eventId", auth, async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.userId;
  const amount = req.body.amount;

  try {
    const [user, event] = await Promise.all([
      User.findById(userId),
      Event.findById(eventId),
    ]);

    if (!user || !event) {
      throw new Error("User or Event not found");
    }

    if (event.participants.includes(userId)) {
      throw new Error("You are Already Participating in this Event");
    }
    // Check if the payment is successful before adding user to event
    const paymentResult = await phonePay(amount, userId, eventId);

    // Return the payment response
    res.status(200).json(paymentResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//  Get All Events
router.get("/all-events", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Event
router.get("/event/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("participants");
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Get My Events

router.get("/my-events", auth, async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId).populate("events");
  res.json(user.events);
} catch (err) {
  res.status(500).json({ error: err.message });
}
});

//  user profile edit

router.post("/edit-profile", auth, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

//  get single user

router.get("/user/:userId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

// get all gallery images

try {
router.get("/website-gallery", async (req, res) => {
  try {
    const cmsDocuments = await Cms.find();
    if (cmsDocuments.length === 0) {
      return res.status(404).json({ message: "Cms document not found" });
    }

    res.status(200).json(cmsDocuments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Submit contact form

router.post("/contact-us", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Assuming you have a Contact model imported
    const contact = new Contact({
      name,
      email,
      message,
    });

    // Save the new contact entry
    await contact.save();

    // Optionally, you can send a response to the client
    res.status(200).json({ message: "Contact information saved successfully" });
  } catch (error) {
    console.log(error);
    // Handle errors appropriately
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
});



module.exports = router;
