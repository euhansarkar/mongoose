const mongoose = require(`mongoose`);
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
        message: "quantity must be an integer",
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "supplier",
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