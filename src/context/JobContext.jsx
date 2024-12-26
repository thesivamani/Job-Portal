import { createContext, useContext, useState, useEffect } from 'react';
import { getStoredJobApplication } from '../utilities/LocalStorage';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        const storedJobs = getStoredJobApplication();
        setAppliedJobs(storedJobs);
    }, []);

    const value = {
        appliedJobs,
        setAppliedJobs
    };

    return (
        <JobContext.Provider value={value}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobContext = () => {
    const context = useContext(JobContext);
    if (!context) {
        throw new Error('useJobContext must be used within a JobProvider');
    }
    return context;
}; 