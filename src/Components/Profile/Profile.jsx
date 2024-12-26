import { useState, useEffect, Suspense } from 'react';
import { getUserProfile, updateUserProfile } from "../../services/profileService"
import { toast, Toaster } from 'react-hot-toast';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FiCamera, FiMapPin, FiMail, FiPhone, FiLinkedin, FiGithub } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().matches(/^\+?[\d\s-]+$/, 'Invalid phone number'),
  location: Yup.string(),
  bio: Yup.string(),
  linkedin: Yup.string().url('Must be a valid URL'),
  github: Yup.string().url('Must be a valid URL'),
  title: Yup.string()
});

const LoadingProfile = () => (
  <div className="max-w-6xl mx-auto p-6 m-5">
    <div className="bg-white rounded-xl shadow-soft p-8 animate-pulse">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 rounded-full bg-gray-200"></div>
        <div className="flex-1">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: '',
    role: '',
    phone: '',
    location: '',
    bio: '',
    skills: [],
    experience: '',
    avatar: '',
    title: '',
    linkedin: '',
    github: '',
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(prev => ({
        ...data,
        name: user?.name || data.name
      }));
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateUserProfile(values);
      setIsEditing(false);
      setProfile(values);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
    setSubmitting(false);
  };

  const handleAvatarChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue('avatar', file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Suspense fallback={<LoadingProfile />}>
      {isLoading ? (
        <LoadingProfile />
      ) : (
        <div className="max-w-6xl mx-auto p-6 mt-10">
          <div className="bg-white rounded-xl shadow-soft p-8">
            <Formik
              enableReinitialize
              initialValues={profile}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting, setFieldValue, values }) => (
                <Form>
                  <div className="relative mb-12 pb-8 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-50">
                          <img
                            src={avatarPreview || profile.avatar || 'https://via.placeholder.com/128'}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {isEditing && (
                          <label className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white cursor-pointer hover:bg-blue-600 transition-colors">
                            <FiCamera className="w-5 h-5" />
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleAvatarChange(e, setFieldValue)}
                            />
                          </label>
                        )}
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <Field
                          type="text"
                          name="name"
                          disabled={!isEditing}
                          className="text-3xl font-bold text-gray-800 bg-transparent border-0 focus:ring-0 p-0 text-center md:text-left w-full disabled:bg-transparent"
                          placeholder="Your Name"
                        />
                        <Field
                          type="text"
                          name="title"
                          disabled={!isEditing}
                          className="text-lg text-gray-600 mt-2 bg-transparent border-0 focus:ring-0 p-0 text-center md:text-left w-full disabled:bg-transparent"
                          placeholder="Your Professional Title"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsEditing(!isEditing)}
                        className="absolute top-0 right-0 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        style={{
                          backgroundColor: isEditing ? '#FEE2E2' : '#EBF5FF',
                          color: isEditing ? '#DC2626' : '#2563EB'
                        }}
                      >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <FiMail className="w-5 h-5 text-gray-400" />
                        <div className="flex-1">
                          <label className="text-sm text-gray-500">Email</label>
                          <Field
                            type="email"
                            name="email"
                            disabled={!isEditing}
                            className="block w-full bg-transparent border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 disabled:border-0"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <FiPhone className="w-5 h-5 text-gray-400" />
                        <div className="flex-1">
                          <label className="text-sm text-gray-500">Phone</label>
                          <Field
                            type="tel"
                            name="phone"
                            disabled={!isEditing}
                            className="block w-full bg-transparent border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 disabled:border-0"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <FiMapPin className="w-5 h-5 text-gray-400" />
                        <div className="flex-1">
                          <label className="text-sm text-gray-500">Location</label>
                          <Field
                            type="text"
                            name="location"
                            disabled={!isEditing}
                            className="block w-full bg-transparent border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 disabled:border-0"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <FiLinkedin className="w-5 h-5 text-gray-400" />
                        <div className="flex-1">
                          <label className="text-sm text-gray-500">LinkedIn</label>
                          <Field
                            type="url"
                            name="linkedin"
                            disabled={!isEditing}
                            className="block w-full bg-transparent border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 disabled:border-0"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <FiGithub className="w-5 h-5 text-gray-400" />
                        <div className="flex-1">
                          <label className="text-sm text-gray-500">GitHub</label>
                          <Field
                            type="url"
                            name="github"
                            disabled={!isEditing}
                            className="block w-full bg-transparent border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 disabled:border-0"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-500">Skills</label>
                        <div className="flex flex-wrap gap-2">
                          {values.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600"
                            >
                              {skill}
                              {isEditing && (
                                <button
                                  type="button"
                                  className="ml-2 text-blue-400 hover:text-blue-600"
                                  onClick={() => {
                                    const newSkills = values.skills.filter((_, i) => i !== index);
                                    setFieldValue('skills', newSkills);
                                  }}
                                >
                                  ×
                                </button>
                              )}
                            </span>
                          ))}
                          {isEditing && (
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500"
                              onClick={() => {
                                const skill = window.prompt('Enter new skill:');
                                if (skill && !values.skills.includes(skill)) {
                                  setFieldValue('skills', [...values.skills, skill]);
                                }
                              }}
                            >
                              + Add Skill
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm text-gray-500">Bio</label>
                        <Field
                          as="textarea"
                          name="bio"
                          disabled={!isEditing}
                          rows="4"
                          className="block w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:ring-0 disabled:bg-transparent disabled:border-0"
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-8 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-100 disabled:opacity-50 transition-all"
                      >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
          <Toaster />
        </div>
      )}
    </Suspense>
  );
};

export default Profile;