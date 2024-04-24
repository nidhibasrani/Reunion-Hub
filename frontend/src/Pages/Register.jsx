import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        enrollmentNumber: '',
        profileImage: null,
    });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profileImage: e.target.files[0] });
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        if (formData.userName.length < 4) {
            errors.userName = 'Username must be at least 4 characters long';
            isValid = false;
        }

        if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
            isValid = false;
        }

        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Simple enrollment number validation
        if (!formData.enrollmentNumber.trim()) {
            errors.enrollmentNumber = 'Enrollment number is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('userName', formData.userName);
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('lastName', formData.lastName);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('enrollmentNumber', formData.enrollmentNumber);
            formDataToSend.append('profileImage', formData.profileImage);

            const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/user/register`, formDataToSend);
            toast.success(response.data.message);
            navigate('/login')

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred while processing your request.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center py-20 bg-gray-100">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <h2 className="text-3xl mb-6 font-bold text-center montserrat">Register</h2>
                {message && <div className="text-red-500 mb-4">{message}</div>}
                <div className="mb-4">
                    <label htmlFor="userName" className="block text-gray-700">Username</label>
                    <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} className={`form-input mt-1 block w-full rounded ${errors.userName && 'border-red-500'}`} required />
                    {errors.userName && <p className="text-red-500 text-xs italic">{errors.userName}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700">First Name</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="form-input mt-1 block w-full rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="form-input mt-1 block w-full rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className={`form-input mt-1 block w-full rounded ${errors.password && 'border-red-500'}`} required />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`form-input mt-1 block w-full rounded ${errors.email && 'border-red-500'}`} required />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="enrollmentNumber" className="block text-gray-700">Enrollment Number</label>
                    <input type="text" id="enrollmentNumber" name="enrollmentNumber" value={formData.enrollmentNumber} onChange={handleChange} className={`form-input mt-1 block w-full rounded ${errors.enrollmentNumber && 'border-red-500'}`} required />
                    {errors.enrollmentNumber && <p className="text-red-500 text-xs italic">{errors.enrollmentNumber}</p>}
                </div>
                <div className="mb-6">
                    <label htmlFor="profileImage" className="block text-gray-700">Profile Image</label>
                    <input type="file" id="profileImage" name="profileImage" onChange={handleFileChange} className="form-input mt-1 block w-full rounded" />
                </div>
                <div className="flex items-center justify-center">
                    <button type="submit" className="bg-orange hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
