import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getCollection } from "../db/dbConnection.js";

const router = express.Router();

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const users = await getCollection("users");
      const user = await users.findOne({ username });
      if (!user)
        return cb(null, false, { message: "Incorrect username or password" });
      if (user.password !== password)
        return cb(null, false, { message: "Incorrect username or password" });
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }),
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, {
      id: user._id.toString(),
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// POST - /api/auth/login
router.post("/login", passport.authenticate("local"), function (req, res) {
  res.json({ message: "Logged in", user: req.user });
});

// POST - /api/auth/logout
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    res.json({ message: "Logged out" });
  });
});

// GET - /api/auth/me
router.get("/me", function (req, res) {
  if (!req.user) return res.status(401).json({ error: "Not logged in" });
  res.json(req.user);
});

// POST - /api/auth/signup
router.post("/signup", async (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  if (!first_name || !last_name || !username || !password)
    return res.status(400).json({ error: "All fields are required" });
  try {
    const users = await getCollection("users");
    const existing = await users.findOne({ username });
    if (existing)
      return res.status(409).json({ error: "Username already taken" });
    const result = await users.insertOne({
      first_name,
      last_name,
      username,
      password,
      created_at: new Date(),
    });
    const user = {
      id: result.insertedId.toString(),
      username,
      first_name,
      last_name,
    };
    req.login(user, function (err) {
      if (err)
        return res.status(500).json({ error: "Login after signup failed" });
      res.json({ message: "Account created", user });
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

export default router;
