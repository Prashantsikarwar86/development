const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Event = require('../models/Event');

// Create a Task
router.post('/tasks', async (req, res) => {
    try {
        const {
            title,
            description,
            eventId,
            assignedTo,
            priority,
            dueDate
        } = req.body;

        // Verify that the event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const newTask = new Task({
            title,
            description,
            event: eventId,
            assignedTo,
            priority,
            dueDate
        });

        const savedTask = await newTask.save();
        
        // Populate the task with event and assignee details
        const populatedTask = await Task.findById(savedTask._id)
            .populate('event', 'title')
            .populate('assignedTo', 'username email');

        res.status(201).json({
            message: 'Task created successfully',
            task: populatedTask
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating task',
            error: error.message
        });
    }
});

// Get Tasks for an Event
router.get('/events/:eventId/tasks', async (req, res) => {
    try {
        const { eventId } = req.params;
        const { status } = req.query; // Optional status filter

        // Build query
        let query = { event: eventId };
        if (status) {
            query.status = status;
        }

        const tasks = await Task.find(query)
            .populate('event', 'title')
            .populate('assignedTo', 'username email')
            .sort({ dueDate: 1 });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching tasks',
            error: error.message
        });
    }
});

// Update Task Status
router.patch('/tasks/:taskId/status', async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;

        // Validate status
        const validStatuses = ['pending', 'in-progress', 'completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Invalid status. Must be one of: pending, in-progress, completed'
            });
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.status = status;
        await task.save();

        // Populate the updated task
        const updatedTask = await Task.findById(taskId)
            .populate('event', 'title')
            .populate('assignedTo', 'username email');

        res.status(200).json({
            message: 'Task status updated successfully',
            task: updatedTask
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating task status',
            error: error.message
        });
    }
});

// Additional useful endpoints

// Get a single task
router.get('/tasks/:taskId', async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId)
            .populate('event', 'title')
            .populate('assignedTo', 'username email');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching task',
            error: error.message
        });
    }
});

// Update task details
router.put('/tasks/:taskId', async (req, res) => {
    try {
        const {
            title,
            description,
            assignedTo,
            priority,
            dueDate
        } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.taskId,
            {
                title,
                description,
                assignedTo,
                priority,
                dueDate
            },
            { new: true }
        ).populate('event', 'title')
         .populate('assignedTo', 'username email');

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({
            message: 'Task updated successfully',
            task: updatedTask
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating task',
            error: error.message
        });
    }
});

module.exports = router; 