const mongoose = require(`mongoose`);
const validator = require(`validator`);
const { ObjectId } = mongoose.Schema.Types;

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `supplier name is  required`],
      trim: true,
      lowercase: true,
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [100, "name is too large"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "provide a valid email"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    brand: {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
    contactNumber: [
      {
        type: String,
        required: [true, `please provide a contact number`],
        validate: {
          validator: (value) => {
            return validator.isMobilePhone(value);
          },
          message: `please provide a valid phone number`,
        },
      },
    ],
    emergencyContactNumber: {
      type: String,
      required: [true, `please provide a emergency contact number`],
      validate: {
        validator: (value) => {
          return validator.isMobilePhone(value);
        },
        message: `please provide a valid phone number`,
      },
    },
    tradeLicenceNumber: {
      type: Number,
      required: [true, `please provide a trade licence number`],
    },
    presentAddress: {
      type: String,
      required: [true, `please provide your present address`],
    },
    permanentAddress: {
      type: String,
      required: [true, `please provide your parmament address`],
    },
    location: {
      type: String,
      required: true,
      lowercase: true,
      enum: {
        values: [
          `dhaka`,
          `chittagong`,
          `rajshahi`,
          `sylet`,
          `rangpur`,
          `barishal`,
          `mymensingh`,
          `khulna`,
        ],
        message: `{VALUE} is not accurate division`,
      },
    },
    imageURL: {
      type: String,
      validate: [validator.isURL, `please provide a valid image URL`],
    },
    nationalIdImageURL: {
      type: String,
      required: true,
      validate: [validator.isURL, `please provide a valid image URL`],
    },
    status: {
      type: String,
      default: `active`,
      enum: [`active`, `inactive`],
    },
  },
  { timestamps: true }
);

// model creation

const Supplier = mongoose.model(`Supplier`, supplierSchema);

module.exports = Supplier;
