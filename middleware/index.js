import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import usersRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import spotifyRoute from "./routes/spotify.js";

dotenv.config();
const app = express();
const port = 3001;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

// api routes
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/spotify", spotifyRoute);

// server
app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

app.listen(port, () => {
  connectDB();
  console.log(`app listening on port ${port}`);
});
