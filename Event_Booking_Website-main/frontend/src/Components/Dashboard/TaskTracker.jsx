import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskTracker = () => {
    const [tasks, setTasks] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        assignedTo: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (selectedEvent) {
            fetchTasks(selectedEvent);
        }
    }, [selectedEvent]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('/api/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const fetchTasks = async (eventId) => {
        try {
            const response = await axios.get(`/api/events/${eventId}/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.post('/api/tasks', {
                ...formData,
                eventId: selectedEvent
            });
            fetchTasks(selectedEvent);
            setShowForm(false);
            setFormData({});
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const handleStatusUpdate = async (taskId, newStatus) => {
        try {
            await axios.patch(`/api/tasks/${taskId}/status`, {
                status: newStatus
            });
            fetchTasks(selectedEvent);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Task Tracker</h2>
                <div className="flex gap-4">
                    <select
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="">Select Event</option>
                        {events.map(event => (
                            <option key={event._id} value={event._id}>
                                {event.title}
                            </option>
                        ))}
                    </select>
                    {selectedEvent && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Add New Task
                        </button>
                    )}
                </div>
            </div>

            {/* Task Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Add New Task</h3>
                        <form onSubmit={handleSubmit}>
                            {/* Add form fields for task properties */}
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="bg-gray-300 px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Tasks List */}
            <div className="grid gap-4">
                {tasks.map(task => (
                    <div key={task._id} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                                <p className="text-gray-600 mb-2">{task.description}</p>
                                <div className="text-sm text-gray-500">
                                    <p>Priority: {task.priority}</p>
                                    <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                                    <p>Assigned To: {task.assignedTo?.username || 'Unassigned'}</p>
                                </div>
                            </div>
                            <select
                                value={task.status}
                                onChange={(e) => handleStatusUpdate(task._id, e.target.value)}
                                className="border p-2 rounded"
                            >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskTracker; 