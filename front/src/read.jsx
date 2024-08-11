import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function Read() {
    const { username } = useParams();
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8081/read/' + username)
            .then(res => {
                setEmployee(res.data[0]);
                console.log(res);
            })
            .catch(err => console.log(err));
    }, [username]);

    return (
        <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-4 shadow'>
                <h2 className='mb-4'>{employee.firstname}'s Summary</h2>
                <table className='table'>
                    <tbody>
                        <tr>
                            <th>Username:</th>
                            <td>{employee.username}</td>
                        </tr>
                        <tr>
                            <th>Password:</th>
                            <td>{employee.password}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{employee.email}</td>
                        </tr>
                        <tr>
                            <th>First Name:</th>
                            <td>{employee.firstname}</td>
                        </tr>
                        <tr>
                            <th>Last Name:</th>
                            <td>{employee.lastname}</td>
                        </tr>
                        <tr>
                            <th>Position:</th>
                            <td>{employee.position}</td>
                        </tr>
                    </tbody>
                </table>
                <div className='d-flex justify-content-between mt-3'>
                    <Link to="/home" className='btn btn-info'>Back</Link>
                    <Link to={"/edit/" + employee.username} className='btn btn-primary'>Edit</Link>
                </div>
            </div>
        </div>
    );
}