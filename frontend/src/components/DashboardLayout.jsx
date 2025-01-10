import React from 'react';
import { Link } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-container">
      <nav className="dashboard-sidebar">
        <div className="sidebar-header">
          <h3>Event Manager</h3>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard/events" className="menu-item">
              <i className="fas fa-calendar-alt"></i>
              Events
            </Link>
          </li>
          <li>
            <Link to="/dashboard/attendees" className="menu-item">
              <i className="fas fa-users"></i>
              Attendees
            </Link>
          </li>
          <li>
            <Link to="/dashboard/tasks" className="menu-item">
              <i className="fas fa-tasks"></i>
              Tasks
            </Link>
          </li>
        </ul>
      </nav>
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout; 