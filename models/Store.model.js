const mongoose = require(`mongoose`);
const validator = require(`validator`);
const {ObjectId} = mongoose.Schema.Types;

// store schema creation

const storeSchema = mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: [true, "please provide a store name"],
            unique: true,
            lowercase: true,
            enum: {
                values: ["rajshahi", "khulna", "sylet", "dhaka", "barishal", "rangpur"],
                message: "{VALUE} is not a store location"
            }
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        manager: {
            type: String,
            contactNumber: String,
            id: {
                type: ObjectId,
                ref: "User0"
            }
        }
}, {timestamps: true})


// store model creation
const Store = mongoose.model(`Store`, storeSchema);


module.exports = Store;