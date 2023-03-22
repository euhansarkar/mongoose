const mongoose = require(`mongoose`);
const validator = require(`validator`);
const bcrypt = require(`bcryptjs`);

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, `provide a valid email`],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, `email is required`],
    },
    password: {
      type: String,
      required: [true, `password is required`],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 3,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: `password {VALUE} is not a strong enough`,
      },
    },
    confirmPassword: {
      type: String,
      required: [true, `please confirm your password`],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: `password dosn't match`,
      },
    },
    role: {
      type: String,
      enum: [`buyer`, `store-manager`, `admin`],
      default: `buyer`,
    },
    firstName: {
      type: String,
      required: [true, `please provide a first name`],
      trim: true,
      minLength: [3, `name must be at least 3 characters`],
      maxLength: [100, `name is too long`],
    },
    lastName: {
      type: String,
      required: [true, `please provide a first name`],
      trim: true,
      minLength: [3, `name must be at least 3 characters`],
      maxLength: [100, `name is too long`],
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        `please provide a valid contact number`,
      ],
    },
    shippingAddress: String,
    imageURL: {
      type: String,
      validate: [validator.isURL, `please provide a valid image url`],
    },
    status: {
      type: String,
      default: `active`,
      enum: [`active`, `inactive`, `blocked`],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);



userSchema.pre(`save`, function(next){
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
})

userSchema.methods.comparePassword = function(password, hash){
    const isPasswordValid = bcrypt.compareSync(password, hash);
    return isPasswordValid;
}


const User = mongoose.model(`User`, userSchema);

module.exports = User;
