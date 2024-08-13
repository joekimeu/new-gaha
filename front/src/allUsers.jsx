import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllUsers() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //fetch employees from server
    useEffect(() => {
        axios.get('https://gaha-website-002d2aeac73a.herokuapp.com/home')
            .then(res => {
                console.log('Data fetched:', res.data);
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError(err);
                setLoading(false);
            });
    }, []);

    //delete an employee with button push
    const handleDelete = (username) => {
        axios.delete('https://gaha-website-002d2aeac73a.herokuapp.com/delete/' + username)
            .then(res => {
                setData(data.filter(employee => employee.username !== username));
            })
            .catch(err => console.log(err));
    };

    //gracefully handle program failure by displaying information inside formatted code
    function output() {
        if (loading) {
            return <div>Loading...</div>;
        }
    
        if (error) {
            return <div>Error fetching data: {error.message}</div>;
        }

        return Array.isArray(data) && data.length > 0 ? (
            data.map((employee, index) => (
                <tr key={index}>
                    <td>{employee.username}</td>
                    <td>{employee.password}</td>
                    <td>{employee.email}</td>
                    <td>{employee.firstname}</td>
                    <td>{employee.lastname}</td>
                    <td>{employee.position}</td>
                    <td>
                        <Link to={'./read/' + employee.username} className='btn btn-sm btn-info'>Read</Link>
                        <Link to={'/edit/' + employee.username} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                        <button onClick={() => handleDelete(employee.username)} className='btn btn-sm btn-danger'>Delete</button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="7">No data available</td>
            </tr>
        );
    }

    return (
        <div className='d-flex flex-column vh-100 bg-primary justify-content-center align-items-center'>
            <h2>Employee List</h2>
            <div className='d-flex justify-content-end'>
                <Link to="./create" className="btn btn-success">Create +</Link>
            </div>
            <div className='w-70 bg-white rounded p-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Position</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {output()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

