const mongoose = require(`mongoose`);
const {ObjectId} = mongoose.Schema.Types;
const validator = require(`validator`)
// mongoose product design schema

// price, quantity and status remove due to refectoring module 8.4

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
      trim: true,
      unique: [true, "name must be unique"],
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [100, "name is too long"],
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag",
      },
    },
    imageURLs: [{
      type: String,
      required: true,
      validate: [validator.isURL, "wrong url"]
    }],
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
  },
  { timestamps: true }
);

productSchema.pre(`save`, function (next) {
  console.log(`before saviing data`);

  if (this.quantity === 0) {
    this.status = `out of stock`;
  }

  next();
});

productSchema.post(`save`, function (doc, next) {
  console.log(`after saving data`);

  next();
});

// product schema methods
productSchema.methods.logger = function (next) {
  console.log(`data saved for ${this.name}`);
  next();
};

// SCHEMA  =>  MODEL  =>  QUERY

const Product = mongoose.model(`Product`, productSchema);

module.exports = Product;
