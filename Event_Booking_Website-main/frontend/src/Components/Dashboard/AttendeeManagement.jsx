import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendeeManagement = () => {
    const [attendees, setAttendees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchAttendees();
    }, []);

    const fetchAttendees = async () => {
        try {
            const response = await axios.get('/api/attendees/all');
            setAttendees(response.data);
        } catch (error) {
            console.error('Error fetching attendees:', error);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.address) newErrors.address = 'Address is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.post('/api/attendees/add', formData);
            fetchAttendees();
            setShowForm(false);
            setFormData({});
        } catch (error) {
            console.error('Error saving attendee:', error);
        }
    };

    const handleDelete = async (attendeeId) => {
        if (window.confirm('Are you sure you want to remove this attendee?')) {
            try {
                await axios.delete(`/api/attendees/delete/${attendeeId}`);
                fetchAttendees();
            } catch (error) {
                console.error('Error deleting attendee:', error);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Attendee Management</h2>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add New Attendee
                </button>
            </div>

            {/* Attendee Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Add New Attendee</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.fullName || ''}
                                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                    className="w-full border p-2 rounded"
                                />
                                {errors.fullName && <span className="text-red-500">{errors.fullName}</span>}
                            </div>
                            {/* Add similar input fields for phone and address */}
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

            {/* Attendees List */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {attendees.map(attendee => (
                    <div key={attendee._id} className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-2">{attendee.attendeeProfile.fullName}</h3>
                        <div className="text-sm text-gray-500">
                            <p>Phone: {attendee.attendeeProfile.phone}</p>
                            <p>Address: {attendee.attendeeProfile.address}</p>
                            <p>Email: {attendee.email}</p>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => handleDelete(attendee._id)}
                                className="text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AttendeeManagement; 