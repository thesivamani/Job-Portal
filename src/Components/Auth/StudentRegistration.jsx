import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const StudentRegistration = () => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      institution: '',
      graduationYear: '',
      major: '',
      skills: '',
      linkedIn: '',
      portfolio: ''
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[^\w]/, 'Password must contain at least one symbol')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
      institution: Yup.string().required('Institution name is required'),
      graduationYear: Yup.number()
        .min(2020, 'Invalid graduation year')
        .max(2030, 'Invalid graduation year')
        .required('Graduation year is required'),
      major: Yup.string().required('Major is required'),
      skills: Yup.string().required('Skills are required'),
      linkedIn: Yup.string().url('Please enter a valid LinkedIn URL'),
      portfolio: Yup.string().url('Please enter a valid portfolio URL')
    }),
    onSubmit: async (values) => {
      try {
        await authService.registerStudent(values);
        setRegistrationSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (err) {
        setError(err.message);
      }
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create Your Student Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already registered?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10">
          {registrationSuccess ? (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Registration successful! Redirecting to login...
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps('fullName')}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...formik.getFieldProps('email')}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    {...formik.getFieldProps('password')}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    {...formik.getFieldProps('confirmPassword')}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Institution
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps('institution')}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                  />
                  {formik.touched.institution && formik.errors.institution && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.institution}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    {...formik.getFieldProps('graduationYear')}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                  />
                  {formik.touched.graduationYear && formik.errors.graduationYear && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.graduationYear}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Major
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps('major')}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                  />
                  {formik.touched.major && formik.errors.major && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.major}</div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Skills
                  </label>
                  <textarea
                    {...formik.getFieldProps('skills')}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                    placeholder="Enter your skills (e.g., JavaScript, React, Node.js)"
                  />
                  {formik.touched.skills && formik.errors.skills && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.skills}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    LinkedIn Profile (Optional)
                  </label>
                  <input
                    type="url"
                    {...formik.getFieldProps('linkedIn')}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                  {formik.touched.linkedIn && formik.errors.linkedIn && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.linkedIn}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Portfolio Website (Optional)
                  </label>
                  <input
                    type="url"
                    {...formik.getFieldProps('portfolio')}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                    placeholder="https://yourportfolio.com"
                  />
                  {formik.touched.portfolio && formik.errors.portfolio && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.portfolio}</div>
                  )}
                </div>
              </div>

             

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>

      {error && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md mt-4">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRegistration;