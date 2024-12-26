import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-white to-indigo-50 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                            JobPortal
                        </h2>
                        <p className="mt-4 text-gray-600">
                            Connecting talent with opportunity. Your next career move starts here.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <motion.a 
                                whileHover={{ scale: 1.1 }}
                                href="#" 
                                className="text-gray-600 hover:text-indigo-600"
                            >
                                <span className="sr-only">LinkedIn</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </motion.a>
                            <motion.a 
                                whileHover={{ scale: 1.1 }}
                                href="#" 
                                className="text-gray-600 hover:text-indigo-600"
                            >
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">About Us</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Careers</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Resources</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Blog</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Help Center</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-center text-gray-600 text-sm">
                        © {new Date().getFullYear()} Sivamani. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;