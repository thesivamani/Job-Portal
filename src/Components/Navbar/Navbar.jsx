import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { HiMenu, HiX } from 'react-icons/hi';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        updateUser(null);
        navigate('/');
    };

    const handleAppliedJobsClick = (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to view applied jobs');
            navigate('/login');
            return;
        }
        if (user.role !== 'student') {
            toast.error('Only students can access applied jobs');
            return;
        }
        navigate('/appliedjobs');
    };

    const handlePostJobClick = (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to post jobs');
            navigate('/login');
            return;
        }
        if (user.role !== 'recruiter') {
            toast.error('Only recruiters can post jobs');
            return;
        }
        navigate('/post-job');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 w-screen fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">JobPortal</span>
                        </Link>

                        <div className="hidden md:flex md:ml-10 md:space-x-8">
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                            >
                                Home
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                            </Link>
                            {user && (
                                <>
                                    <Link
                                        to="/appliedjobs"
                                        onClick={handleAppliedJobsClick}
                                        className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                                    >
                                        Applied Jobs
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                                    </Link>
                                    <Link
                                        to="/post-job"
                                        onClick={handlePostJobClick}
                                        className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                                    >
                                        Post a Job
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                                    >
                                        Profile
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Auth Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700 font-medium">Welcome, {user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:opacity-90 transition-all duration-200"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/student-registration"
                                    className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:opacity-90 transition-all duration-200"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
                        >
                            {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/"
                            className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                        >
                            Home
                        </Link>
                        {user && (
                            <>
                                <Link
                                    to="/appliedjobs"
                                    onClick={handleAppliedJobsClick}
                                    className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                                >
                                    Applied Jobs
                                </Link>
                                <Link
                                    to="/post-job"
                                    onClick={handlePostJobClick}
                                    className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                                >
                                    Post a Job
                                </Link>
                                <Link
                                    to="/profile"
                                    className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                        {!user && (
                            <>
                                <Link
                                    to="/login"
                                    className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/student-registration"
                                    className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
            <Toaster />
        </nav>
    );
};

export default Navbar;