import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventManagement from './pages/EventManagement';
import AttendeeManagement from './pages/AttendeeManagement';
import TaskTracker from './pages/TaskTracker';
import './styles/dashboard.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard/events" element={<EventManagement />} />
        <Route path="/dashboard/attendees" element={<AttendeeManagement />} />
        <Route path="/dashboard/tasks" element={<TaskTracker />} />
      </Routes>
    </Router>
  );
}

export default App; 