const JOBS_STORAGE_KEY = 'company_jobs';

class JobService {
    constructor() {
        // Initialize storage with company.json data if empty
        this.initializeStorage();
    }

    async initializeStorage() {
        const existingJobs = localStorage.getItem(JOBS_STORAGE_KEY);
        if (!existingJobs) {
            try {
                const response = await fetch('/company.json');
                const data = await response.json();
                localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(data));
            } catch (error) {
                console.error('Error initializing jobs:', error);
                localStorage.setItem(JOBS_STORAGE_KEY, '[]');
            }
        }
    }

    async getAllJobs() {
        const jobs = localStorage.getItem(JOBS_STORAGE_KEY);
        return JSON.parse(jobs || '[]');
    }

    async addJob(jobData, recruiter) {
        const jobs = await this.getAllJobs();
        const newJob = {
            id: Date.now(),
            company_logo: recruiter.companyLogo || "https://via.placeholder.com/150",
            job_title: jobData.title,
            company_name: recruiter.companyName,
            remote_or_onsite: jobData.remoteWork === 'yes' ? 'Remote' : 'Onsite',
            location: jobData.location,
            fulltime_or_parttime: jobData.employmentType === 'full-time' ? 'Fulltime' : 'Part-time',
            salary: `${jobData.salary.min} - ${jobData.salary.max}`,
            job_description: jobData.description,
            job_responsibility: jobData.responsibilities,
            educational_requirements: jobData.requirements,
            experiences: `${jobData.experienceLevel} level position`,
            contact_information: {
                phone: recruiter.phoneNumber,
                email: recruiter.email
            }
        };

        jobs.push(newJob);
        localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
        return newJob;
    }
}

export const jobService = new JobService(); 