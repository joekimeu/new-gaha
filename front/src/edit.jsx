import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Edit() {
    const { username } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        position: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8081/read/' + username)
            .then(res => {
                console.log(res);
                setValues({
                    username: res.data[0].username,
                    password: res.data[0].password,
                    email: res.data[0].email,
                    firstname: res.data[0].firstname,
                    lastname: res.data[0].lastname,
                    position: res.data[0].position
                });
            })
            .catch(err => console.log(err));
    }, [username]);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/edit/' + username, values)
            .then(res => {
                console.log(res);
                navigate('/home');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-4 shadow'>
                <form onSubmit={handleUpdate}>
                    <h2 className='mb-4'>Update Employee Information</h2>
                    <div className='mb-3'>
                        <label htmlFor="username" className='form-label'>Username</label>
                        <input type="text" name="username" className="form-control" id="username" value={values.username} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className='form-label'>Password</label>
                        <input type="text" name="password" className="form-control" id="password" value={values.password} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email" className='form-label'>Email</label>
                        <input type="email" name="email" className="form-control" id="email" value={values.email} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="firstname" className='form-label'>First Name</label>
                        <input type="text" name="firstname" className="form-control" id="firstname" value={values.firstname} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="lastname" className='form-label'>Last Name</label>
                        <input type="text" name="lastname" className="form-control" id="lastname" value={values.lastname} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="position" className='form-label'>Position</label>
                        <input type="text" name="position" className="form-control" id="position" value={values.position} onChange={handleChange} />
                    </div>
                    <button type="submit" className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}