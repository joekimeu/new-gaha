import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './context/AuthProvider';
import { jwtDecode } from 'jwt-decode';

const ClockInOut = () => {
    const { auth } = useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const employeeUsername = jwtDecode(localStorage.getItem('authToken')).username

    useEffect(() => {
        fetchHistory();
        fetchCurrentStatus();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await axios.get('http://localhost:8081/clockhistory/' + employeeUsername, {
                headers: { Authorization: auth.token }
            });
            setHistory(res.data);
        } catch (err) {
            setError("Failed to fetch history: " + (err.response?.data?.error || err.message));
        }
    };

    const fetchCurrentStatus = async () => {
        try {
            const res = await axios.get('http://localhost:8081/currentstatus', {
                headers: { Authorization: auth.token }
            });
            setCurrentStatus(res.data);
        } catch (err) {
            setError("Failed to fetch current status: " + (err.response?.data?.error || err.message));
        }
    };

    const handleAction = async (action) => {
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            const res = await axios.post(`http://localhost:8081/${action}`, {}, {
                headers: { Authorization: auth.token }
            });
            setMessage(res.data.message);
            fetchHistory();
            fetchCurrentStatus();
        } catch (err) {
            setError(`Failed to ${action}: ` + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    const calculateDuration = (start, end) => {
        if (!start || !end) return 'N/A';
        const startTime = new Date(`2000-01-01T${start}`);
        const endTime = new Date(`2000-01-01T${end}`);
        const duration = (endTime - startTime) / 1000 / 60; // duration in minutes
        const hours = Math.floor(duration / 60);
        const minutes = Math.round(duration % 60);
        return `${hours}h ${minutes}m`;
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Clock In/Out</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}
            <div className="mb-3">
                <button className="btn btn-success me-2" onClick={() => handleAction('clockin')} disabled={loading || (currentStatus && !currentStatus.clockout_time)}>
                    Clock In
                </button>
                <button className="btn btn-warning me-2" onClick={() => handleAction('lunchstart')} disabled={loading || !currentStatus || currentStatus.clockout_time || (currentStatus.lunch_start && !currentStatus.lunch_end) || (currentStatus.lunch_start && currentStatus.lunch_end)}>
                    Start Lunch
                </button>
                <button className="btn btn-info me-2" onClick={() => handleAction('lunchend')} disabled={loading || !currentStatus || !currentStatus.lunch_start || currentStatus.lunch_end}>
                    End Lunch
                </button>
                <button className="btn btn-danger" onClick={() => handleAction('clockout')} disabled={loading || !currentStatus || currentStatus.clockout_time || (currentStatus.lunch_start && !currentStatus.lunch_end)}>
                    Clock Out
                </button>
            </div>
            <h3 className="mt-5">History</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Clock In</th>
                        <th>Lunch Start</th>
                        <th>Lunch End</th>
                        <th>Clock Out</th>
                        <th>Work Duration</th>
                        <th>Lunch Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.date}</td>
                            <td>{entry.clockin_time}</td>
                            <td>{entry.lunch_start || 'N/A'}</td>
                            <td>{entry.lunch_end || 'N/A'}</td>
                            <td>{entry.clockout_time || 'N/A'}</td>
                            <td>
                                {calculateDuration(
                                    entry.clockin_time,
                                    entry.clockout_time
                                )}
                            </td>
                            <td>
                                {calculateDuration(
                                    entry.lunch_start,
                                    entry.lunch_end
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClockInOut;