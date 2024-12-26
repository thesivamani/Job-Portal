import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { jobService } from '../../services/jobService';

const JobPosting = () => {
  const [postingSuccess, setPostingSuccess] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (!authService.isRecruiter()) {
      navigate('/');
      return;
    }

    fetch('/category.json')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error loading categories:', err));
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      title: '',
      category: '',
      companyName: '',
      location: '',
      employmentType: 'full-time',
      experienceLevel: 'entry',
      salary: {
        min: '',
        max: '',
        currency: 'INR',
        period: 'yearly'
      },
      description: '',
      requirements: '',
      responsibilities: '',
      benefits: '',
      applicationDeadline: '',
      remoteWork: 'no',
      skills: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Job title is required'),
      category: Yup.string().required('Category is required'),
      location: Yup.string().required('Location is required'),
      employmentType: Yup.string().required('Employment type is required'),
      experienceLevel: Yup.string().required('Experience level is required'),
      salary: Yup.object({
        min: Yup.number().required('Minimum salary is required'),
        max: Yup.number().moreThan(Yup.ref('min'), 'Maximum salary must be greater than minimum'),
        currency: Yup.string().required('Currency is required'),
        period: Yup.string().required('Payment period is required')
      }),
      description: Yup.string()
        .min(20, 'Description must be at least 100 characters')
        .required('Job description is required'),
      requirements: Yup.string().required('Requirements are required'),
      responsibilities: Yup.string().required('Responsibilities are required'),
      benefits: Yup.string(),
      applicationDeadline: Yup.date()
        .min(new Date(), 'Deadline cannot be in the past')
        .required('Application deadline is required'),
      remoteWork: Yup.string().required('Remote work option is required'),
      skills: Yup.string().required('Required skills are required')
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
        const recruiter = {
          companyName: user.name,
          companyLogo: user?.companyLogo,
          email: user.email,
          phoneNumber: user.phoneNumber
        };

        await jobService.addJob(values, recruiter);

        // Update category counts
        
        setPostingSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (err) {
        setError(err.message);
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Post a New Job</h2>

          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-3 rounded">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {postingSuccess ? (
            <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
              <p className="text-green-700 text-sm">Job posted successfully! Redirecting...</p>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Job Title</label>
                  <input
                    type="text"
                    {...formik.getFieldProps('title')}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="text-red-500 text-xs">{formik.errors.title}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select
                    {...formik.getFieldProps('category')}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {['Software Development', 'Data Science', 'Design', 'Marketing', 'Sales', 
                      'Customer Service', 'Finance', 'Human Resources', 'Operations', 'Other'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    {...formik.getFieldProps('location')}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Employment Type</label>
                  <select
                    {...formik.getFieldProps('employmentType')}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {['Full Time', 'Part Time', 'Contract', 'Internship'].map(type => (
                      <option key={type} value={type.toLowerCase().replace(' ', '-')}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Experience Level</label>
                  <select
                    {...formik.getFieldProps('experienceLevel')}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {['Entry Level', 'Mid Level', 'Senior Level', 'Executive'].map(level => (
                      <option key={level} value={level.toLowerCase().split(' ')[0]}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Remote Work</label>
                  <select
                    {...formik.getFieldProps('remoteWork')}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {['No', 'Yes', 'Hybrid'].map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-sm font-medium text-gray-700">Salary Range (₹)</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      {...formik.getFieldProps('salary.min')}
                      placeholder="Minimum"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      {...formik.getFieldProps('salary.max')}
                      placeholder="Maximum"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-sm font-medium text-gray-700">Job Description</label>
                  <textarea
                    {...formik.getFieldProps('description')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-sm font-medium text-gray-700">Requirements</label>
                  <textarea
                    {...formik.getFieldProps('requirements')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-sm font-medium text-gray-700">Responsibilities</label>
                  <textarea
                    {...formik.getFieldProps('responsibilities')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-sm font-medium text-gray-700">Benefits</label>
                  <textarea
                    {...formik.getFieldProps('benefits')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Required Skills</label>
                  <input
                    type="text"
                    {...formik.getFieldProps('skills')}
                    placeholder="e.g. JavaScript, React, Node.js"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Application Deadline</label>
                  <input
                    type="date"
                    {...formik.getFieldProps('applicationDeadline')}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Post Job
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPosting;