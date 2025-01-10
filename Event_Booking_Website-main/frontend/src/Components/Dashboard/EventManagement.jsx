import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventManagement = () => {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        price: '',
        capacity: '',
        category: '',
        image: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('/api/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.location) newErrors.location = 'Location is required';
        if (!formData.price) newErrors.price = 'Price is required';
        if (!formData.capacity) newErrors.capacity = 'Capacity is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            if (formData._id) {
                await axios.put(`/api/events/${formData._id}`, formData);
            } else {
                await axios.post('/api/events', formData);
            }
            fetchEvents();
            setShowForm(false);
            setFormData({});
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    const handleDelete = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await axios.delete(`/api/events/${eventId}`);
                fetchEvents();
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Event Management</h2>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add New Event
                </button>
            </div>

            {/* Event Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">
                            {formData._id ? 'Edit Event' : 'Add New Event'}
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Title</label>
                                <input
                                    type="text"
                                    value={formData.title || ''}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="w-full border p-2 rounded"
                                />
                                {errors.title && <span className="text-red-500">{errors.title}</span>}
                            </div>
                            {/* Add similar input fields for other event properties */}
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

            {/* Events List */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events.map(event => (
                    <div key={event._id} className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-2">{event.description}</p>
                        <div className="text-sm text-gray-500">
                            <p>Location: {event.location}</p>
                            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                            <p>Price: ${event.price}</p>
                            <p>Capacity: {event.capacity}</p>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setFormData(event);
                                    setShowForm(true);
                                }}
                                className="text-blue-500"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(event._id)}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventManagement; 