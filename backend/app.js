import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import { Meal } from "./models/meal.js";
import { Order } from "./models/orders.js";
config();
const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

const corsOptions = {
  // origin: "https://quickquiz-0f4n.onrender.com", // frontend URI (ReactJS)
  origin: "http://localhost:3000", // frontend URI (ReactJS)
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL).then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log("Server listening on port", port);
  });
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/meals", async (req, res) => {
  try {
    const meals = await Meal.find();
    return res.status(200).json({ status: "SUCCESS", data: meals });
  } catch (err) {
    return res.status(404).json({ status: "ERROR", message: err.message });
  }
});
function generateRandomId() {
  return Math.random().toString(36).substring(2);
}

app.post("/meals", async (req, res) => {
  try {
    const meal = new Meal({
      id: `m${generateRandomId()}`,
      ...req.body,
    });
    meal.save();
    return res.status(200).json({ status: "SUCCESS", data: meal });
  } catch (err) {
    return res.status(404).json({ status: "ERROR", message: err.message });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const orderData = req.body.order;

    if (
      orderData === null ||
      orderData.items === null ||
      orderData.items.length === 0
    ) {
      return res.status(400).json({ status: "FAIL", message: "Missing data." });
    }

    if (
      orderData.customer.email === null ||
      !orderData.customer.email.includes("@") ||
      orderData.customer.name === null ||
      orderData.customer.name.trim() === "" ||
      orderData.customer.street === null ||
      orderData.customer.street.trim() === "" ||
      orderData.customer["postal-code"] === null ||
      orderData.customer["postal-code"].trim() === "" ||
      orderData.customer.city === null ||
      orderData.customer.city.trim() === ""
    ) {
      return res.status(400).json({
        status: "FAIL",
        message:
          "Missing data: Email, name, street, postal code or city is missing.",
      });
    }

    const newOrder = new Order({
      ...orderData,
      id: (Math.random() * 1000).toString(),
    });
    newOrder.save();
    return res.status(201).json({ status: "SUCCESS", data: "Order created!" });
  } catch (err) {
    return res.status(404).json({ status: "ERROR", message: err.message });
  }
});

app.use("/images", express.static("images"));

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});
