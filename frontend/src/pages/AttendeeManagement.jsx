import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const AttendeeManagement = () => {
  const [attendees, setAttendees] = useState([]);
  const [selectedAttendee, setSelectedAttendee] = useState(null);

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const response = await fetch('/api/attendees/all');
      const data = await response.json();
      setAttendees(data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="attendee-management">
        <div className="page-header">
          <h2>Attendee Management</h2>
          <button className="btn btn-primary">Add Attendee</button>
        </div>

        <div className="attendee-list">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Registered Events</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map(attendee => (
                <tr key={attendee._id}>
                  <td>{attendee.attendeeProfile.fullName}</td>
                  <td>{attendee.email}</td>
                  <td>{attendee.attendeeProfile.phone}</td>
                  <td>{attendee.attendeeProfile.registeredEvents.length}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                    <button className="btn btn-sm btn-outline-danger">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AttendeeManagement; 