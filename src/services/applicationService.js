import { delay } from '../utils/helpers';

class ApplicationService {
    async submitApplication(applicationData) {
        // Simulate API call with delay
        await delay(1500);
        
        try {
            // Get existing applications
            const applications = JSON.parse(localStorage.getItem('applications') || '[]');
            
            // Check for duplicate applications
            const isDuplicate = applications.some(
                app => app.jobId === applicationData.jobId && app.userId === applicationData.userId
            );
            
            if (isDuplicate) {
                throw new Error('You have already applied for this position');
            }
            
            // Add new application
            applications.push({
                ...applicationData,
                id: `app_${Date.now()}`,
                status: 'pending',
                applicationDate: new Date().toISOString()
            });
            
            localStorage.setItem('applications', JSON.stringify(applications));
            return { success: true, message: 'Application submitted successfully' };
            
        } catch (error) {
            throw new Error(error.message || 'Failed to submit application');
        }
    }

    async uploadResume(file) {
        // Simulate file upload
        await delay(1000);
        
        if (!file) {
            throw new Error('No file provided');
        }

        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            throw new Error('File size exceeds 10MB limit');
        }

        // Simulate successful upload
        return {
            success: true,
            fileUrl: URL.createObjectURL(file),
            fileName: file.name
        };
    }
}

export const applicationService = new ApplicationService(); 