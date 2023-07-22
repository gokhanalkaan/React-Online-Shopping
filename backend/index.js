import express from "express";

import mongoose from "mongoose";

import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import productsRoutes from "./routes/product.js";
import ordersRoutes from "./routes/order.js";

import cookieParser from "cookie-parser";

import cors from "cors";

import Stripe from "stripe";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

dotenv.config();

const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);

app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  if (products) {
    const lineItems = req.body.products.map((p) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: p.title,
            images: [p.img[0]],
            description: "Product",
            metadata: { product_id: p._id },
          },

          unit_amount: Math.round(p.price * 100),
        },

        quantity: p.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "TR", "NE", "DE"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 7, currency: "usd" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 3 },
            },
          },
        },
      ],
      line_items: lineItems,
      mode: "payment",

      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:3000/cart",
    });

    return res.send({ url: session.url });
  } else return res.status(500).json("eror");
});

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to mongoose"))
    .catch((err) => {
      throw err;
    });
};

app.listen(5000, () => {
  connect();
  console.log("Backend server running ");
});
