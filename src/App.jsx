import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import AppliedJobs from './Components/AppliedJobs/AppliedJobs';
import JobDetails from './Components/JobDetails/JobDetails';
import Login from './Components/Auth/Login';
import StudentRegistration from './Components/Auth/StudentRegistration';
import JobApplication from './Components/Jobs/JobApplication';
import JobPosting from './Components/Jobs/JobPosting';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import { JobProvider } from './context/JobContext';
import { authService } from './services/authService';
import RecruiterRegistration from './Components/Auth/RecruiterRegistration';
import Profile from './Components/Profile/Profile';
import { AuthProvider } from './context/AuthContext';

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = authService.getCurrentUser();
    if (!user) {
        return <Navigate to="/login" />;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }
    return children;
};

function App() {
    return (
        <AuthProvider>
            <JobProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/student-registration" element={<StudentRegistration />} />
                        <Route path="/recruiter-registration" element={<RecruiterRegistration />} />
                        <Route 
                            path="/appliedjobs" 
                            element={
                                <ProtectedRoute allowedRoles={['student']}>
                                    <AppliedJobs />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/job-application/:jobId" 
                            element={
                                <ProtectedRoute allowedRoles={['student']}>
                                    <JobApplication />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/post-job" 
                            element={
                                <ProtectedRoute allowedRoles={['recruiter']}>
                                    <JobPosting />
                                </ProtectedRoute>
                            } 
                        />
                        <Route path="/details" element={<JobDetails />} />
                        <Route path="/details/:id" element={<JobDetails />} />
                        <Route path="/profile" element={
                            <ProtectedRoute allowedRoles={['student', 'recruiter']}>
                                <Profile />
                            </ProtectedRoute>
                        } />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </BrowserRouter>
            </JobProvider>
        </AuthProvider>
    );
}

export default App;