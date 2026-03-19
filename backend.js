import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import authRouter from "./routes/auth.js";
import pollsRouter from "./routes/polls.js";
import submissionsRouter from "./routes/submissions.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("./frontend/dist"));
app.use("/api/auth", authRouter);
app.use("/api/polls", pollsRouter);
app.use("/api/submissions", submissionsRouter);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "quickpik_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: "quickpik",
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  }),
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Catch-all route: serves up the index.html (React app) for any non-API GET request (lets the route to be handled by React Router)
app.get("*", (req, res) => {
  res.sendFile("./frontend/dist/index.html");
});
