const express = require('express');
const errorHenhler = require('./middleware/errorHendler');
const connectdb = require('./config/mongoose');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 8080;

connectdb();
app.use(express.json());
app.use("/api/contacts", require('./routes/contact'))
app.use("/api/users", require('./routes/user'))
app.use(errorHenhler);




app.listen(port, () => {
    console.log("connected to port : " + port)
})