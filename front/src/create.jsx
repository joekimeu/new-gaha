import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Create() {
    const [confirmedPassword, setConfirmedPassword] = useState("")

    const handleConfirmedPassword = (e) => {
        e.preventDefault();
        setConfirmedPassword(e.target.value);
    }

    const [values, setValues] = useState({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        position: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if passwords match
        if (values.password !== confirmedPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        // Confirm the action
        if (!window.confirm('Are you sure you want to create this user?')) {
            return;
        }

        axios.post('https://gaha-website-002d2aeac73a.herokuapp.com/employees', values)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-4 shadow'>
                <form onSubmit={handleSubmit}>
                    <h2 className='mb-4'>Add Employee</h2>
                    <div className='mb-3'>
                        <label htmlFor="username" className='form-label'>Username</label>
                        <input type="text" name="username" className="form-control" id="username" onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className='form-label'>Password</label>
                        <input type="password" name="password" className="form-control" id="password" onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="confirmPassword" className='form-label'>Confirm Password</label>
                        <input type="password" name="confirmPassword" className="form-control" id="confirmPassword" onChange={handleConfirmedPassword} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email" className='form-label'>Email</label>
                        <input type="email" name="email" className="form-control" id="email" onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="firstname" className='form-label'>First Name</label>
                        <input type="text" name="firstname" className="form-control" id="firstname" onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="lastname" className='form-label'>Last Name</label>
                        <input type="text" name="lastname" className="form-control" id="lastname" onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="position" className='form-label'>Position</label>
                        <input type="text" name="position" className="form-control" id="position" onChange={handleChange} />
                    </div>
                    <button type="submit" className='btn btn-success w-100'>Submit</button>
                </form>
            </div>
        </div>
    );
}
