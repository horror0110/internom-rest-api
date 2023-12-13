const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const userRoute = require("./routes/users");


const app = express();

dotenv.config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
    });
    console.log("MONGODB CONNECTED!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectToDatabase();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "ganaa247", // Change this to a secret key for session encryption
    resave: false,
    saveUninitialized: false,
  
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1/auth", userRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Express server is running !");
});
