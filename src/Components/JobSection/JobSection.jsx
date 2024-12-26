import React, { useEffect, useState } from 'react';
import SingleJobs from '../SingleJobs/SingleJobs';
import { jobService } from '../../services/jobService';

const JobSection = () => {
    const [jobs, setJobs] = useState([]);
    const [seeAll, setAll] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Initialize job service (this will load company.json if needed)
                await jobService.initializeStorage();

                // Get all jobs including new postings
                const allJobs = await jobService.getAllJobs();
                setJobs(allJobs);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return (
            <div className="text-center my-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
                    <div className="grid md:grid-cols-2 gap-4 md:w-3/4 mx-auto">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="border p-4 rounded-lg">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='text-center my-6'>
            <h1 className='text-5xl custom-text p-4'>Featured Jobs</h1>
            <p className='text-lg my-4'>
                Explore thousands of job opportunities with all the information you need. Its your future
            </p>
            <div className="grid md:grid-cols-2 gap-4 md:w-3/4 mx-auto">
                {seeAll
                    ? jobs.map((job) => (
                        <SingleJobs key={job.id} job={job} />
                    ))
                    : jobs.slice(0, 4).map((job) => (
                        <SingleJobs key={job.id} job={job} />
                    ))}
            </div>
            {jobs.length > 4 && (
                <button
                    onClick={() => setAll(!seeAll)}
                    className='custom-btn mt-6'
                >
                    {seeAll ? 'Show Less' : 'Show All'}
                </button>
            )}
        </div>
    );
};

export default JobSection;