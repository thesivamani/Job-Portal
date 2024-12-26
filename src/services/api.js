const BASE_URL = 'https://your-api-endpoint.com/api';

// Utility function for handling API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Add authentication header to requests
const getHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
        'Content-Type': 'application/json',
        ...(user ? { 'Authorization': `Bearer ${user.token}` } : {})
    };
};

// Student-related API calls
export const studentAPI = {
  getProfile: async () => {
    try {
      const response = await fetch(`${BASE_URL}/student/profile`, {
        headers: getHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  },
  updateProfile: async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/student/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  }
};

// Job-related API calls
export const jobAPI = {
  getAllJobs: async () => {
    try {
      const response = await fetch(`${BASE_URL}/jobs`, {
        headers: getHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  },
  getJobById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/jobs/${id}`, {
        headers: getHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  },
  applyForJob: async (jobId, applicationData) => {
    try {
      const response = await fetch(`${BASE_URL}/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  }
}; 