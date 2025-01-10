import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4">
                    <h1 className="text-xl font-bold">Event Dashboard</h1>
                </div>
                <nav className="mt-4">
                    <Link to="/dashboard/events" 
                          className="block p-4 hover:bg-gray-100">
                        Event Management
                    </Link>
                    <Link to="/dashboard/attendees" 
                          className="block p-4 hover:bg-gray-100">
                        Attendee Management
                    </Link>
                    <Link to="/dashboard/tasks" 
                          className="block p-4 hover:bg-gray-100">
                        Task Tracker
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout; 