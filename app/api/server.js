import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ HEALTH CHECK (MANDATORY)
app.get("/", (req, res) => {
  res.status(200).send("Dexfluence API Running");
});

// Example route
app.get("/api/status", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});