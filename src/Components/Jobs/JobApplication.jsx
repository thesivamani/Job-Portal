import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { applicationService } from '../../services/applicationService';

const JobApplication = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [applicationSuccess, setApplicationSuccess] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadingFile, setUploadingFile] = useState(false);
    const [error, setError] = useState(null);
    const [jobDetails, setJobDetails] = useState(null);
    const user = authService.getCurrentUser();

    useEffect(() => {
        // Load job details when component mounts
        const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        const job = jobs.find(j => j.id === jobId);
        if (job) {
            setJobDetails(job);
        }
    }, [jobId]);

    const formik = useFormik({
        initialValues: {
            coverLetter: '',
            experience: '',
            education: '',
            skills: '',
            expectedSalary: '',
            availability: '',
            linkedinProfile: '',
            portfolioUrl: '',
            resume: null,
            phoneNumber: '',
            noticePeriod: ''
        },
        validationSchema: Yup.object({
            coverLetter: Yup.string()
                .min(20, 'Cover letter must be at least 20 characters')
                .required('Cover letter is required'),
            experience: Yup.string().required('Experience details are required'),
            education: Yup.string().required('Education details are required'),
            skills: Yup.string().required('Skills are required'),
            expectedSalary: Yup.number()
                .min(0, 'Invalid salary amount')
                .required('Expected salary is required')
                .typeError('Expected salary must be a number'),
            linkedinProfile: Yup.string().url('Must be a valid URL').nullable(),
            portfolioUrl: Yup.string().url('Must be a valid URL').nullable(),
            phoneNumber: Yup.string().required('Phone number is required'),
            noticePeriod: Yup.string().required('Notice period is required')
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            setError(null);

            try {
                const applicationData = {
                    ...values,
                    resume: uploadedFile ? uploadedFile.name : null,
                    resumeUrl: uploadedFile?.url,
                    jobId,
                    userId: user.id,
                    userName: user.name,
                    jobTitle: jobDetails?.position,
                    companyName: jobDetails?.company_name,
                    companyLogo: jobDetails?.company_logo,
                    jobLocation: jobDetails?.location,
                    jobType: jobDetails?.job_type
                };

                await applicationService.submitApplication(applicationData);
                setApplicationSuccess(true);
                
                setTimeout(() => {
                    navigate('/appliedjobs');
                }, 2000);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!(file.type === 'application/pdf' || 
            file.type === 'application/msword' || 
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setError('Please upload a PDF or Word document');
            return;
        }

        setUploadingFile(true);
        setError(null);

        try {
            const result = await applicationService.uploadResume(file);
            setUploadedFile({
                name: result.fileName,
                url: result.fileUrl
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setUploadingFile(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Job Application</h2>
                    
                    {applicationSuccess ? (
                        <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg max-w-3xl mx-auto">
                            <p className="text-green-700 font-medium text-xl">Application submitted successfully!</p>
                            <p className="text-green-600 mt-2 text-lg">Redirecting to your applications...</p>
                        </div>
                    ) : (
                        <form onSubmit={formik.handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-3">
                                    <label className="block text-lg font-medium text-gray-700 mb-3">
                                        Cover Letter
                                    </label>
                                    <textarea
                                        {...formik.getFieldProps('coverLetter')}
                                        rows={8}
                                        className="w-full border border-gray-300 rounded-lg shadow-sm py-4 px-5 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                        placeholder="Tell us why you're perfect for this role..."
                                    />
                                    {formik.touched.coverLetter && formik.errors.coverLetter && (
                                        <div className="text-red-500 text-sm mt-2">{formik.errors.coverLetter}</div>
                                    )}
                                </div>

                                <div className="lg:col-span-2">
                                    <label className="block text-lg font-medium text-gray-700 mb-3">
                                        Professional Experience
                                    </label>
                                    <textarea
                                        {...formik.getFieldProps('experience')}
                                        rows={6}
                                        className="w-full border border-gray-300 rounded-lg shadow-sm py-4 px-5 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                    />
                                    {formik.touched.experience && formik.errors.experience && (
                                        <div className="text-red-500 text-sm mt-2">{formik.errors.experience}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-lg font-medium text-gray-700 mb-3">
                                        Education
                                    </label>
                                    <textarea
                                        {...formik.getFieldProps('education')}
                                        rows={6}
                                        className="w-full border border-gray-300 rounded-lg shadow-sm py-4 px-5 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                    />
                                    {formik.touched.education && formik.errors.education && (
                                        <div className="text-red-500 text-sm mt-2">{formik.errors.education}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-lg font-medium text-gray-700 mb-3">
                                        Key Skills
                                    </label>
                                    <input
                                        type="text"
                                        {...formik.getFieldProps('skills')}
                                        className="w-full border border-gray-300 rounded-lg shadow-sm py-4 px-5 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                    />
                                    {formik.touched.skills && formik.errors.skills && (
                                        <div className="text-red-500 text-sm mt-2">{formik.errors.skills}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-lg font-medium text-gray-700 mb-3">
                                        Expected Salary (₹)
                                    </label>
                                    <input
                                        type="number"
                                        {...formik.getFieldProps('expectedSalary')}
                                        className="w-full border border-gray-300 rounded-lg shadow-sm py-4 px-5 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                    />
                                    {formik.touched.expectedSalary && formik.errors.expectedSalary && (
                                        <div className="text-red-500 text-sm mt-2">{formik.errors.expectedSalary}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-lg font-medium text-gray-700 mb-3">
                                        LinkedIn Profile
                                    </label>
                                    <input
                                        type="url"
                                        {...formik.getFieldProps('linkedinProfile')}
                                        className="w-full border border-gray-300 rounded-lg shadow-sm py-4 px-5 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                    />
                                    {formik.touched.linkedinProfile && formik.errors.linkedinProfile && (
                                        <div className="text-red-500 text-sm mt-2">{formik.errors.linkedinProfile}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-lg font-medium text-gray-700 mb-3">
                                        Portfolio URL
                                    </label>
                                    <input
                                        type="url"
                                        {...formik.getFieldProps('portfolioUrl')}
                                        className="w-full border border-gray-300 rounded-lg shadow-sm py-4 px-5 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                    />
                                    {formik.touched.portfolioUrl && formik.errors.portfolioUrl && (
                                        <div className="text-red-500 text-sm mt-2">{formik.errors.portfolioUrl}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-lg font-medium text-gray-700 mb-3">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        {...formik.getFieldProps('phoneNumber')}
                                        className="w-full border border-gray-300 rounded-lg shadow-sm py-4 px-5 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                    />
                                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                        <div className="text-red-500 text-sm mt-2">{formik.errors.phoneNumber}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-lg font-medium text-gray-700 mb-3">
                                        Notice Period
                                    </label>
                                    <select
                                        {...formik.getFieldProps('noticePeriod')}
                                        className="w-full border border-gray-300 rounded-lg shadow-sm py-4 px-5 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                    >
                                        <option value="">Select Notice Period</option>
                                        <option value="immediate">Immediate</option>
                                        <option value="15days">15 Days</option>
                                        <option value="30days">30 Days</option>
                                        <option value="60days">60 Days</option>
                                        <option value="90days">90 Days</option>
                                    </select>
                                    {formik.touched.noticePeriod && formik.errors.noticePeriod && (
                                        <div className="text-red-500 text-sm mt-2">{formik.errors.noticePeriod}</div>
                                    )}
                                </div>

                                <div className="lg:col-span-3">
                                    <label className="block text-lg font-medium text-gray-700 mb-3">
                                        Resume Upload
                                    </label>
                                    <div className="mt-1 flex justify-center px-8 pt-6 pb-8 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                                        <div className="space-y-2 text-center">
                                            <svg className="mx-auto h-16 w-16 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="flex text-lg text-gray-600 justify-center">
                                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-4 py-2">
                                                    <span>Upload a file</span>
                                                    <input 
                                                        type="file" 
                                                        className="sr-only"
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={handleFileUpload}
                                                    />
                                                </label>
                                                <p className="pl-2 py-2">or drag and drop</p>
                                            </div>
                                            <p className="text-sm text-gray-500">PDF or Word up to 10MB</p>
                                            {uploadedFile && (
                                                <p className="text-lg text-green-600">Uploaded: {uploadedFile.name}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end mt-10">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || uploadingFile}
                                    className={`bg-blue-600 text-white py-4 px-10 rounded-lg transition duration-200 font-medium text-lg
                                        ${(isSubmitting || uploadingFile) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </span>
                                    ) : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg">
                    <p className="text-red-700">{error}</p>
                </div>
            )}
        </div>
    );
};

export default JobApplication;