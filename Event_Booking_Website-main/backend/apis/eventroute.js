const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Create an Event
router.post('/api/events', async (req, res) => {
    try {
        const {
            title,
            description,
            date,
            location,
            price,
            capacity,
            category,
            image,
            organizer
        } = req.body;

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            price,
            capacity,
            category,
            image,
            organizer: req.user._id // Assuming you're using authentication
        });

        const savedEvent = await newEvent.save();
        res.status(201).json({
            message: 'Event created successfully',
            event: savedEvent
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating event',
            error: error.message
        });
    }
});

// Get all Events
router.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find()
            .populate('organizer', 'username email')
            .sort({ date: 1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching events',
            error: error.message
        });
    }
});

// Get Single Event
router.get('/api/events/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('organizer', 'username email')
            .populate('attendees', 'username email');
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching event',
            error: error.message
        });
    }
});

// Update an Event
router.put('/api/events/:id', async (req, res) => {
    try {
        const {
            title,
            description,
            date,
            location,
            price,
            capacity,
            category,
            image
        } = req.body;

        // Optional: Add authorization check
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        
        // Optional: Check if user is authorized to update
        // if (event.organizer.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ message: 'Not authorized to update this event' });
        // }

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                date,
                location,
                price,
                capacity,
                category,
                image
            },
            { new: true }
        );

        res.status(200).json({
            message: 'Event updated successfully',
            event: updatedEvent
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating event',
            error: error.message
        });
    }
});

// Delete an Event
router.delete('/api/events/:id', async (req, res) => {
    try {
        // Optional: Add authorization check
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Optional: Check if user is authorized to delete
        // if (event.organizer.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ message: 'Not authorized to delete this event' });
        // }

        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Event deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting event',
            error: error.message
        });
    }
});

module.exports = router;