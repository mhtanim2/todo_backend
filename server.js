// Basic Lib Import
const express = require("express");
const app = new express();
//dotenv file for environment variables
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
//read directory for routers
const {readdirSync} = require("fs");
// Security Middleware Lib Import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const bcrypt = require("bcrypt");

// Database Lib Import
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Body Parser Implement
app.use(express.json());

// Request Rate Limit
const limiter = rateLimit({windowMs: 15 * 60 * 1000, max: 3000});
app.use(limiter);

// Routing Implement
readdirSync("./src/routes/").map((r) =>
    app.use("/api/v1", require(`./src/routes/${r}`))
);

// Undefined Route Implement
app.use("*", (req, res) => {
    res.status(404).json({status: "fail", data: "Not Found"});
});

//Mongoose connection and run the server
let URI = process.env.DATABASE || "mongodb://127.0.0.1:27017/Todo";
port = process.env.PORT || 8080;
mongoose
    .connect(URI, {
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(port, () => {
            console.log("Mongoose connected");
            console.log(`The app is listening on http://localhost:${port}`);
        });
    })
    .catch((err) => console.log(err));

module.exports = app;