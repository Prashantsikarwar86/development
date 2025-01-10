import React, { useState, useEffect } from 'react';
import { eventAPI } from '../services/api';
import DashboardLayout from '../components/DashboardLayout';

const EventManagement = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await eventAPI.getAllEvents();
            setEvents(response.data);
        } catch (err) {
            setError('Failed to fetch events');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateEvent = async (eventData) => {
        try {
            const response = await eventAPI.createEvent(eventData);
            setEvents([...events, response.data.event]);
        } catch (err) {
            console.error('Error creating event:', err);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await eventAPI.deleteEvent(eventId);
            setEvents(events.filter(event => event._id !== eventId));
        } catch (err) {
            console.error('Error deleting event:', err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <DashboardLayout>
            <div className="event-management">
                {/* ... rest of your component code ... */}
            </div>
        </DashboardLayout>
    );
};

export default EventManagement; 