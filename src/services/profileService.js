// Dummy API implementation
const MOCK_PROFILE = {
  name: localStorage.getItem('userName') || 'John Doe',
  email: 'user@example.com',
  role: localStorage.getItem('userRole') || 'user',
  phone: '+1234567890',
  location: 'New York, USA',
  bio: 'Experienced professional with a passion for technology',
  skills: ['JavaScript', 'React', 'Node.js'],
  experience: '5 years',
  avatar: '',
  title: 'Senior Software Engineer',
  linkedin: 'https://linkedin.com/in/johndoe',
  github: 'https://github.com/johndoe'
};

export const getUserProfile = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PROFILE);
    }, 500);
  });
};

export const updateUserProfile = async (profileData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real application, you would send the data to a server
      resolve({ success: true });
    }, 500);
  });
}; 