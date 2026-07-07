
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 20,
    },
    emailId: {
        type: String,
        required: true,
        maxLength: 30,
        unique: true,
        trim: true,
        lowercase: true,
        immutable: true,
    },
    age: {
        type: Number,
        min: 5,
        max: 80,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

    password: {
        type: String,
        required: true,
    },
    image: [{
        data: Buffer,
        contentType: String,
    }],
    address: {
        type:
            [{
                label: String,
                street: String,
                city: String,
                pincode: String,
                isDefault: { type: Boolean, default: false },
            },],
        validate:
        {
            validator: function (addresses) {
                return addresses.length <= 3;
            },
            message: "A user can have at most 3 address",
        },

    },
    isActive: { type: Boolean, default: true },
    userSegment: {
        type: Number,
        default: null,
        index: true,
        description: 'Customer segment from K-Means clustering'
    },
    segmentUpdatedAt: {
        type: Date,
        default: null
    },

    // Analytics fields
    orderCount: {
        type: Number,
        default: 0
    },
    totalSpent: {
        type: Number,
        default: 0
    }
},

    {
        timestamps: true,
    }
);
// userSchema.index({ userSegment: 1 });

const User = mongoose.model('User', userSchema);
module.exports = User;