const mongoose = require(`mongoose`);
const { ObjectId } = mongoose.Schema.Types;

// category schema creation

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "please provide a category name"],
      lowercase: true,
    },
    description: String,
    imageURL: {
      type: String,
      validate: [validator.isURL, "please provide a valid URL"],
    },
  },
  {
    timestamps: true,
  }
);

// category model creation

const Category = mongoose.model(`Category`, categorySchema);


module.exports = Category;
