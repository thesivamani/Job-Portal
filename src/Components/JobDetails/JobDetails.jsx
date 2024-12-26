import React, { useEffect, useState } from 'react';
import { CurrencyDollarIcon, CalendarDaysIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid'
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import useTitle from '../hooks/useTitle';
import { jobService } from '../../services/jobService';
import { authService } from '../../services/authService';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    useTitle("Job Details")
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const user = authService.getCurrentUser();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const allJobs = await jobService.getAllJobs();
                const jobDetails = allJobs.find(job => job.id === parseInt(id));
                if (jobDetails) {
                    setDetails(jobDetails);
                }
            } catch (error) {
                console.error('Error fetching job details:', error);
                toast.error('Failed to load job details');
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    const handleApplyBtn = async (job) => {
        // Check if user is logged in and is a student
        if (!user) {
            toast.error('Please login to apply');
            navigate('/login');
            return;
        }

        if (user.role !== 'student') {
            toast.error('Only students can apply for jobs');
            return;
        }

        try {
            // Get existing applications from localStorage
            const applications = JSON.parse(localStorage.getItem('applications') || '[]');
            
            // Check if already applied
            const alreadyApplied = applications.some(
                app => app.jobId === job.id && app.userId === user.id
            );

            if (alreadyApplied) {
                toast.error('You have already applied for this job');
                return;
            }

            // Navigate to application form
            navigate(`/job-application/${job.id}`);

        } catch (error) {
            console.error('Error handling application:', error);
            toast.error('Failed to process application');
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-pulse space-y-8 w-full max-w-7xl mx-auto px-4">
                    <div className="h-40 bg-gray-200 rounded-xl"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="h-60 bg-gray-200 rounded-xl"></div>
                            <div className="h-40 bg-gray-200 rounded-xl"></div>
                        </div>
                        <div className="h-96 bg-gray-200 rounded-xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!details) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
                    <p className="mt-2 text-gray-600">The job you're looking for doesn't exist or has been removed.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8">
                        <h1 className="text-4xl font-bold text-white text-center">
                            {details.company_name}
                        </h1>
                        <p className="mt-2 text-blue-100 text-center">
                            {details.job_title}
                        </p>
                    </div>

                    <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                                <p className="text-gray-600">{details.job_description}</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Responsibilities</h2>
                                <p className="text-gray-600">{details.job_responsibility}</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Education</h3>
                                        <p className="text-gray-600">{details.educational_requirements}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Experience</h3>
                                        <p className="text-gray-600">{details.experiences}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Details</h2>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <CurrencyDollarIcon className="h-5 w-5 text-blue-600" />
                                            <span className="ml-3 text-gray-600">₹{details.salary}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <CalendarDaysIcon className="h-5 w-5 text-blue-600" />
                                            <span className="ml-3 text-gray-600">{details.job_title}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <PhoneIcon className="h-5 w-5 text-blue-600" />
                                            <span className="ml-3 text-gray-600">{details.contact_information?.phone}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                                            <span className="ml-3 text-gray-600">{details.contact_information?.email}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPinIcon className="h-5 w-5 text-blue-600" />
                                            <span className="ml-3 text-gray-600">{details.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleApplyBtn(details)}
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster />
            </div>
        </div>
    );
};

export default JobDetails;