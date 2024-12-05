const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require('cors');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// MongoDB Connection to 'applications' database
mongoose
  .connect('mongodb://127.0.0.1:27017/applications')
  .then(() => console.log("MongoDB Connected to applications"))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

// Define Schema and Model
const applicationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true }
});

const Application = mongoose.model("Application", applicationSchema);

// Routes
app.post("/submit", async (req, res) => {
  try {
    const applicationData = new Application(req.body);
    await applicationData.save();
    res.status(200).send({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(400).send({ message: "Error submitting form", error });
  }
});

// Start the Server
const port = process.env.PORT || 4000; // Change 'port' to 'PORT'
app.listen(port, () => {
  console.log("App listening on port: " + port);
});
