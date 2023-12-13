const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      // Find user in the database
      const user = await User.findOne({ email });

      // If user not found or password is incorrect
      if (!user) {
        return done(null, false, { error: "User not found" });
      }

      const success = await bcrypt.compare(password, user.password);

      if (!success) {
        return done(null, false, { error: "Email or password is wrong!" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Retrieve user from the database
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const sameUser = await User.findOne({ email });

    if (sameUser) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await User.create(newUser);

    return res.status(201).json({ success: "Registration successful", user });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // User not found or incorrect email/password
      return res.status(401).json({ error: info.error });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ success: "Login successful", user: req.user });
    });
  })(req, res, next);
});
router.post('/logout', (req, res) => {
  req.logout();
  res.json({ success: 'Logout successful' });
});

module.exports = router;
