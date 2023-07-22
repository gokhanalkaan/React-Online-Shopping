import Stripe from "stripe";
import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  console.log(newOrder);

  try {
    const savedOrder = await newOrder.save();

    return res.status(200).json(savedOrder);
  } catch (error) {
    return res.status(500).json(error);

    const { products } = req.body;
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    console.log(orders);

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getOrdersFromStripe = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const session_line_items = await stripe.checkout.sessions.listLineItems(
    req.query.session_id
  );

  let session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  session = { ...session, ...session_line_items };

  return res.status(200).json(session);
};
