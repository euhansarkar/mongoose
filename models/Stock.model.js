const mongoose = require(`mongoose`);
const validator = require(`validator`);
const { ObjectId } = mongoose.Schema.Types;


// stock schema creation
const stockSchema = mongoose.Schema(
    
  {
    productId: {
        type: ObjectId,
        ref: "Product",
        required: true,
    },
    name: {
      type: String,
      required: [true, "product name is required"],
      trim: true,
      unique: [true, "name must be unique"],
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [100, "name is tooo long"],
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
        values: ["kg", "pcs", "litre", "bag"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag",
      },
    },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }

            let isValid = true;

            value.forEach((val) => {
              if (!validator.isURL(val)) {
                isValid = false;
              }
            });
            return isValid;
          },
        },
      },
    ],
    price: {
        type: Number,
        required: true,
        min: [0, "product price can't negative"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "quantity can't be negative"]
    },
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
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "status can't be {VALUE}"
        }
    },
    store: {
        name: {
            type: String,
            trim: true,
            required: [true, "please provide a store name"],
            lowercase: true,
            enum: {
                values: ["dhaka", "rajshahi", "chittagong", "khulna", "barishal", "rangpur"],
                message: "{VALUE} is not a valid name"
            }
        },
        id: {
            type: ObjectId,
            ref: "Store",
            required: true,
        }
    },
    suppliedBy: {
        name: {
            type: String,
            required: [true, "please provide a supplier name"],
            trim: true 
        },
        id: {
            type: ObjectId,
            ref: "Supplier"
        }
    }
  },
  { timestamps: true }
);


// stock model creation

const Stock = mongoose.model(`Stock`, stockSchema);

module.exports = Stock;
