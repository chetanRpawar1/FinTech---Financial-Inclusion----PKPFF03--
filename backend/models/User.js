const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    budget: {
        monthlyTarget: { type: Number, default: 0 },
        dailyLimit: { type: Number, default: 0 }
    },
    expenses: [
        {
            name: String,
            amount: Number,
            category: String,
            date: { type: Date, default: Date.now }
        }
    ],
    savings: { type: Number, default: 0 },
    totalDebt: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
