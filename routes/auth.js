import express from "express";
import { getCollection } from "../db/dbConnection.js";

const router = express.Router();

// POST - /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  try {
    const users = await getCollection("users");
    const user = await users.findOne({ username });

    if (!user || user.password !== password)
      return res.status(401).json({ error: "Invalid credentials" });

    req.session.user = {
      id: user._id.toString(),
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    res.json({ message: "Logged in", user: req.session.user });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// POST - /api/auth/logout
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

// GET - /api/auth/me  – used by frontend to check if session is active
router.get("/me", (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ error: "Not logged in" });
  res.json(req.session.user);
});

export default router;
