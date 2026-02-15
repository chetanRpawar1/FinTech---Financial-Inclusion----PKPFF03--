const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get current user data
router.get('/data', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update budget
router.post('/budget', auth, async (req, res) => {
    try {
        const { monthlyTarget, dailyLimit } = req.body;
        const update = {};
        if (monthlyTarget !== undefined) update["budget.monthlyTarget"] = monthlyTarget;
        if (dailyLimit !== undefined) update["budget.dailyLimit"] = dailyLimit;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: update },
            { new: true }
        );
        res.json(user.budget);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add expense
router.post('/expense', auth, async (req, res) => {
    try {
        const { name, amount, category, date } = req.body;
        const user = await User.findById(req.user.id);

        user.expenses.unshift({ name, amount, category, date: date || Date.now() });
        await user.save();

        res.json(user.expenses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Sync numeric fields (savings, debt)
router.post('/sync', auth, async (req, res) => {
    try {
        const { savings, totalDebt } = req.body;
        const update = {};
        if (savings !== undefined) update.savings = savings;
        if (totalDebt !== undefined) update.totalDebt = totalDebt;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: update },
            { new: true }
        );
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
