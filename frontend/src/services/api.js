import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Event APIs
export const eventAPI = {
    getAllEvents: () => api.get('/events'),
    getEvent: (id) => api.get(`/events/${id}`),
    createEvent: (data) => api.post('/events', data),
    updateEvent: (id, data) => api.put(`/events/${id}`, data),
    deleteEvent: (id) => api.delete(`/events/${id}`)
};

// Task APIs
export const taskAPI = {
    getEventTasks: (eventId) => api.get(`/events/${eventId}/tasks`),
    createTask: (data) => api.post('/tasks', data),
    updateTaskStatus: (taskId, status) => api.patch(`/tasks/${taskId}/status`, { status }),
    updateTask: (taskId, data) => api.put(`/tasks/${taskId}`, data)
};

// Attendee APIs
export const attendeeAPI = {
    getAllAttendees: () => api.get('/attendees/all'),
    addAttendee: (data) => api.post('/attendees/add', data),
    deleteAttendee: (userId) => api.delete(`/attendees/delete/${userId}`)
};

export default api; 