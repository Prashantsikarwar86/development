const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Add an Attendee
router.post('/add', async (req, res) => {
    try {
        const { userId, fullName, phone, address } = req.body;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isAttendee = true;
        user.attendeeProfile = {
            fullName,
            phone,
            address,
            registeredEvents: []
        };

        await user.save();
        res.status(201).json({ message: 'Attendee profile created successfully', attendee: user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating attendee profile', error: error.message });
    }
});

// Get all Attendees
router.get('/all', async (req, res) => {
    try {
        const attendees = await User.find({ isAttendee: true })
            .select('username email attendeeProfile');
        res.status(200).json(attendees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendees', error: error.message });
    }
});

// Delete an Attendee
router.delete('/delete/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isAttendee = false;
        user.attendeeProfile = undefined;
        await user.save();

        res.status(200).json({ message: 'Attendee profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting attendee', error: error.message });
    }
});

module.exports = router; 