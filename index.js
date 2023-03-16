const express = require(`express`);
const cors = require(`cors`);
const { default: mongoose } = require("mongoose");
const app = express();

// middlewires
app.use(express.json());
app.use(cors());

// schema design

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name for this product"],
      trim: true,
      unique: [true, "name must be unique"],
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [100, "name is too large"],
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
        value: ["kg", "litre", "pcs"], // enum: ["kg", "litre", "pcs"]
        message: "unit value can't be {VALUE}, must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity can't be negative"],
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
        value: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    createdAt: {
      type: String,
      default: Date.now(),
    },
    updatedAt: {
      type: String,
      default: Date.now(),
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    categories: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

app.get(`/`, (req, res) => {
  res.send(`Route is Working`.red.bold);
});

module.exports = app;
