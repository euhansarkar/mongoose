const mongoose = require(`mongoose`);
const validator = require(`validator`);
const { ObjectId } = mongoose.Schema.Types;

//  schema creation
const brandSchema = mongoose.Schema(
  {
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    name: {
      type: String,
      trim: true,
      required: [true, "please provide a brand name"],
      unique: true,
      minLength: 3,
      maxLength: 100,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 8,
      maxLength: 50,
      lowercase: true,
      validate: [validator.isEmail, "please provide a valid Email"],
    },
    website: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isURL, "please provide a valid URL"],
    },
    location: String,
    supplier: [
      {
        name: String,
        contactNumber: String,
        id: {
          type: ObjectId,
          ref: "Supplier",
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

// model creation
const Brand = mongoose.model("Brand", brandSchema);

// export model

module.exports = Brand;
