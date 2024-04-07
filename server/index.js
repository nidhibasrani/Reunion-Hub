const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connectDb = require('./config/db');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const chatRoutes = require('./routes/chat')
const {app, server} = require('./socket')

const port = process.env.PORT || 5000; 

connectDb();


app.use(express.json());
app.use(cors());


const uploadFolder = path.resolve(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

app.use('/uploads', express.static('uploads'));
app.use('/uploads/website-gallery', express.static('uploads/website-gallery'));


// Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chatRoutes);


server.listen(port, () => {
    console.log('Server is running on port:', port);
});
