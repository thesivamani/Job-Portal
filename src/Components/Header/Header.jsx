import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-white to-indigo-50 m-10">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
            <div className='max-w-7xl mx-auto md:flex items-center justify-between py-20 px-6 min-h-[calc(100vh-6rem)]'>
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="header-details md:w-3/5 space-y-8"
                >
                    <h1 className='text-5xl md:text-7xl font-bold leading-tight'>
                        Transform Your Career{' '}
                        <span className='bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent'>
                            Journey Today
                        </span>
                    </h1>
                    <p className='text-lg text-gray-600 md:w-5/6 leading-relaxed'>
                        Unlock a world of limitless career possibilities tailored just for you. 
                        Your next big opportunity awaits - from application to offer letter, 
                        we're here to make your professional dreams a reality.
                    </p>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-4 rounded-full 
                        font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 
                        hover:from-indigo-700 hover:to-blue-600'
                    >
                        Launch Your Future
                    </motion.button>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="image-section md:w-1/2 mt-12 md:mt-0 relative"
                >
                    <motion.div
                        animate={{ 
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative w-full aspect-square"
                    >
                        {/* Abstract Background Shape */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200 via-blue-300 to-purple-200 rounded-full blur-3xl opacity-30"></div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-2xl rotate-45 opacity-20"></div>
                        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-indigo-500 rounded-full opacity-20"></div>
                        
                        {/* Main Design Elements */}
                        <div className="absolute inset-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 flex flex-col justify-center items-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl mb-6"></div>
                            <div className="w-3/4 h-3 bg-gray-200 rounded-full mb-4"></div>
                            <div className="w-1/2 h-3 bg-gray-200 rounded-full mb-8"></div>
                            <div className="grid grid-cols-2 gap-4 w-full">
                                <div className="h-20 bg-gray-100 rounded-lg"></div>
                                <div className="h-20 bg-gray-100 rounded-lg"></div>
                            </div>
                        </div>
                        
                        {/* Floating Elements */}
                        <motion.div 
                            animate={{ 
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute -top-4 right-10 w-12 h-12 bg-blue-400 rounded-full opacity-20"
                        ></motion.div>
                        <motion.div 
                            animate={{ 
                                rotate: [360, 0],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute bottom-0 left-10 w-16 h-16 bg-indigo-400 rounded-full opacity-20"
                        ></motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Header;