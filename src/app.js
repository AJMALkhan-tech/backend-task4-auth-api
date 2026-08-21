const express = require("express");
const helmet = require("helmet");
const { port } = require("./config/config");
const logger = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(logger);

app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});