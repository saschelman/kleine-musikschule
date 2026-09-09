require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const contactRoutes = require("./routes/contactRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
app.set("trust proxy", 1);

const PORT = Number(process.env.PORT || 3000);

// --- CORS & Security ---
const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((item) => item.trim())
  : [
      "https://www.kleine-musikschule.de",
      "https://kleine-musikschule.de",
      "https://kleine-musikschule-webseite-forty.onrender.com",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ];

app.use(cors({ origin: corsOrigin }));
app.use(helmet());
app.use(express.json({ limit: "200kb" }));

// --- Healthcheck ---
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// --- Routes ---
app.use("/api/contact", contactRoutes);
app.use("/api/kursanmeldung", courseRoutes);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`[backend] running on http://localhost:${PORT}`);
});
