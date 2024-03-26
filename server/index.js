const express = require('express');
const cors = require('cors');
const app = express();
const connectDb = require('./config/db')
connectDb();
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
app.use(express.json());
const port = process.env.PORT;
app.use(cors());


app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);


app.listen(port, () => {
    console.log('Server is running on port:', port);
})



