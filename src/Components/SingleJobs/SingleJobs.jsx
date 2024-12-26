import React from 'react';
import { MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';
import { useJobContext } from '../../context/JobContext';
import { addToDb } from '../../utilities/LocalStorage';

const SingleJobs = ({ job }) => {
    const { setAppliedJobs } = useJobContext();
    
    const handleApplyJob = () => {
        addToDb(job.id);
        setAppliedJobs(prev => [...prev, job]);
    };


    const { company_logo, company_name, job_title, location, remote_or_onsite, salary} = job;
    
    return (
        <div className="transform hover:scale-[1.02] transition-all duration-300">
            <div className="
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                rounded-2xl
                shadow-lg hover:shadow-xl
                transition-all duration-300
                p-6
            ">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                            <img 
                                src={company_logo} 
                                className="w-24 h-24 object-contain"
                                alt={`${company_name} logo`}
                            />
                        </div>
                        <div className="flex-shrink-0">
                            <span className="
                                px-4 py-2
                                bg-blue-50 dark:bg-blue-900/30
                                text-blue-600 dark:text-blue-300
                                rounded-lg
                                text-sm font-medium
                                border border-blue-100 dark:border-blue-800
                            ">
                                {remote_or_onsite}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                {job_title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg">
                                {company_name}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <MapPinIcon className="h-5 w-5 text-blue-500 mr-2" />
                                <span>{location}</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <CurrencyDollarIcon className="h-5 w-5 text-blue-500 mr-2" />
                                <p className="text-gray-600">
                                    <span className="font-semibold">Salary:</span> ₹{salary}
                                </p>
                            </div>
                        </div>
                    </div>

                    <Link 
                        to={`/details/${job.id}`}
                        className="
                            block w-full
                            text-center
                            px-6 py-3
                            bg-gradient-to-r from-blue-500 to-blue-600
                            hover:from-blue-600 hover:to-blue-700
                            text-white font-semibold
                            rounded-xl
                            transition-all duration-300
                            shadow-md hover:shadow-lg
                            transform hover:-translate-y-0.5
                        "
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SingleJobs;