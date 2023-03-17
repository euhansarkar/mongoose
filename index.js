const express = require(`express`);
const cors = require(`cors`);
const mongoose = require("mongoose");
const app = express();

// middlewires
app.use(express.json());
app.use(cors());

// mongoose product design schema

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
      trim: true,
      unique: [true, "name must be unique"],
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [100, "name is too long"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity can't be negatvie"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
    },
    status: {
      type: String,
      status: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    createAt: {
      type: String,
      default: Date.now(),
    },
    updateAt: {
      type: String,
      default: Date.now(),
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId(),
      ref: "supplier",
    },
    categories: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: mongoose.Schema.Types.ObjectId(),
      },
    ],
  },
  { timestamps: true }
);

app.get(`/`, (req, res) => {
  res.send(`Route is Working`.red.bold);
});

module.exports = app;
