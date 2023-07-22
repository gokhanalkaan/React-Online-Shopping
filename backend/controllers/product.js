import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    return res.status(200).json(savedProduct);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAllProducts = async (req, res) => {
  const qGender = req.query.gender;
  const qCategory = req.query.category;
  const qnewest = req.query.newest;

  try {
    let products = [];

    if (qGender) {
      products = await Product.find({ gender: qGender })
        .sort({ createdAt: -1 })
        .limit(10);
    } else if (qCategory) {
      products = await Product.find({
        category: {
          $in: [qCategory],
        },
      });
    } else if (qnewest == true) {
      products = await Product.find({}).sort({ createdAt: "asc" }).limit(8);
      console.log(products);
    } else {
      products = await Product.find();
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product);

    if (!product) return res.status(401).json("No product found");

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getPopularProducts = async (req, res) => {
  try {
    let productIds = [];
    const popularProducts = await Order.aggregate([
      { $unwind: "$orderItems" },
      { $sortByCount: "$orderItems.productId" },
      { $limit: 8 },
    ]);

    console.log(popularProducts);

    popularProducts.forEach((e) => productIds.push(e._id));

    const products = await Product.find({
      _id: { $in: productIds },
    });

    //popularProducts.forEach(p=> arr.push(products.find(product => product._id=p._id )));

    let arr = [];
    arr = popularProducts.map((obj) => {
      const index = products.find((el) => el._id == obj._id);
      // const  count  = index !== -1 ? products[index] : {};
      const { _id, count } = obj;

      return {
        count,
        ...index._doc,
      };
    });

    console.log("arr \n" + arr);

    console.log(" popular products \n" + [...products]);

    // console.log(" popular product ids \n"+[...productIds]);

    return res.status(200).json(arr);
  } catch (error) {
    return res.status(500).json(error);
  }
};
