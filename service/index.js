const express = require('express');
const app = express();
const mongoose = require('mongoose');

const UserRouter = require('./routes/UserRouter');

require('dotenv').config()

//Body parser (read req body)
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Endpoint URL routing, pass to appropriate router to handle
app.use('/api/users', UserRouter);

//MongoDB boilerplate setup (https://mongoosejs.com/docs/connections.html)
//Establish the connection
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useCreateIndex : true, useUnifiedTopology: true}).then(
    () => { console.log("New MongoDB instance connected"); },
    err => { console.log(`MongoDB connection error: ${err}`); }
);
const mConnection = mongoose.connection;
mConnection.on('disconnected', () => {
    console.log(`MongoDB instance has been disconnected!`);
});
//Catch errors during server operation
mConnection.on('error', err => {
    console.log(`MongoDB has encountered an error: ${err}`);
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server has started on port ${port}`));