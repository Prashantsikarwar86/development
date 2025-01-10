import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [events, setEvents] = useState([]);

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
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchTasks = async (eventId) => {
    try {
      const response = await fetch(`/api/events/${eventId}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="task-tracker">
        <div className="page-header">
          <h2>Task Tracker</h2>
          <select 
            className="form-select w-auto"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            <option value="">Select Event</option>
            {events.map(event => (
              <option key={event._id} value={event._id}>{event.title}</option>
            ))}
          </select>
        </div>

        <div className="task-columns">
          <div className="task-column">
            <h3>Pending</h3>
            {tasks.filter(task => task.status === 'pending').map(task => (
              <div key={task._id} className="task-card">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div className="task-meta">
                  <span className={`priority priority-${task.priority}`}>
                    {task.priority}
                  </span>
                  <span className="due-date">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="task-column">
            <h3>In Progress</h3>
            {tasks.filter(task => task.status === 'in-progress').map(task => (
              <div key={task._id} className="task-card">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div className="task-meta">
                  <span className={`priority priority-${task.priority}`}>
                    {task.priority}
                  </span>
                  <span className="due-date">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="task-column">
            <h3>Completed</h3>
            {tasks.filter(task => task.status === 'completed').map(task => (
              <div key={task._id} className="task-card">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div className="task-meta">
                  <span className={`priority priority-${task.priority}`}>
                    {task.priority}
                  </span>
                  <span className="due-date">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TaskTracker; 