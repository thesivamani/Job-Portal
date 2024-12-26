import React, { useEffect, useState, memo } from 'react';
import { applicationService } from '../../services/applicationService';
import { format } from 'date-fns';
import useTitle from '../hooks/useTitle';
import { jobService } from '../../services/jobService';

// Memoized application card component
const ApplicationCard = memo(({ application }) => {
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {application.companyLogo && (
                            <img
                                src={application.companyLogo}
                                alt={application.companyName}
                                className="h-12 w-12 object-contain rounded-full"
                            />
                        )}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                {application.jobTitle}
                            </h3>
                            <div className="flex items-center space-x-4 mt-1">
                                <p className="text-sm text-gray-600">
                                    {application.companyName}
                                </p>
                                {application.jobLocation && (
                                    <span className="flex items-center text-sm text-gray-500">
                                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {application.jobLocation}
                                    </span>
                                )}
                                {application.jobType && (
                                    <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                        {application.jobType}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                        ${application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'}`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Applied On</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                            {format(new Date(application.applicationDate), 'PPP')}
                        </dd>
                    </div>

                    <div>
                        <dt className="text-sm font-medium text-gray-500">Expected Salary</dt>
                        <dd className="mt-1 text-sm text-gray-900">₹{application.expectedSalary}</dd>
                    </div>

                    <div>
                        <dt className="text-sm font-medium text-gray-500">Notice Period</dt>
                        <dd className="mt-1 text-sm text-gray-900">{application.noticePeriod}</dd>
                    </div>

                    <div>
                        <dt className="text-sm font-medium text-gray-500">Documents</dt>
                        <dd className="mt-1">
                            {application.resume && (
                                <a
                                    href={application.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
                                >
                                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                    </svg>
                                    View Resume
                                </a>
                            )}
                        </dd>
                    </div>
                </div>
            </div>
        </div>
    );
});

// Memoized empty state component
const EmptyState = memo(() => (
    <div className="text-center py-12 bg-white rounded-lg shadow">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No applications found</h3>
        <p className="mt-1 text-gray-500">Start applying for jobs to see your applications here.</p>
    </div>
));

const AppliedJobs = () => {
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [jobs, setJobs] = useState([]);

    useTitle('Applied Jobs');

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            const storedApplications = JSON.parse(localStorage.getItem('applications') || '[]');
            const allJobs = await jobService.getAllJobs();
            setJobs(allJobs);

            const applicationsWithJobDetails = storedApplications.map(application => {
                const job = allJobs.find(job => job.id === parseInt(application.jobId));
                return {
                    ...application,
                    jobTitle: job?.job_title || application.jobTitle || 'Unknown Position'
                };
            });

            setApplications(applicationsWithJobDetails);
            setFilteredApplications(applicationsWithJobDetails);
        } catch (error) {
            console.error('Error loading applications:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const status = e.target.value;
        setFilterStatus(status);

        if (status === 'all') {
            setFilteredApplications(applications);
        } else {
            const filtered = applications.filter(app => app.status === status);
            setFilteredApplications(filtered);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen m-10 bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 text-center">My Applications</h1>
                    <p className="mt-2 text-center text-gray-600">Track all your job applications in one place</p>
                </div>

                <div className="mb-6 flex justify-end">
                    <select
                        value={filterStatus}
                        onChange={handleFilterChange}
                        className="bg-white border border-gray-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Applications</option>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                {filteredApplications.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="space-y-6">
                        {filteredApplications.map((application) => (
                            <ApplicationCard key={application.id} application={application} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(AppliedJobs);