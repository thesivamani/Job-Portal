import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { updateUser } = useAuth();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: async (values) => {
            try {
                const userData = await authService.login(values.email, values.password);
                updateUser(userData);
                navigate('/');
            } catch (err) {
                setError(err.message);
            }
        }
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="container mx-auto mt-10 max-w-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        New user?{' '}
                        <Link to="/student-registration" className="text-indigo-600 hover:text-indigo-500">
                            Register as Student
                        </Link>
                        {' or '}
                        <Link to="/recruiter-registration" className="text-indigo-600 hover:text-indigo-500">
                            Register as Recruiter
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login; 