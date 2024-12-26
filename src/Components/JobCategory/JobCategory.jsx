import React, { useState } from 'react';
import SingleCategory from '../SingleCategory/SingleCategory';
import { motion } from 'framer-motion';

const JobCategory = ({ category }) => {
    const [hoveredCategory, setHoveredCategory] = useState(null);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16'
        >
            <div className="text-center mb-16">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className='text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6'
                >
                    Explore Job Categories
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className='text-xl text-gray-600 max-w-2xl mx-auto'
                >
                    Discover your perfect career path among thousands of opportunities tailored to your skills and aspirations
                </motion.p>
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
                {category.map((ct, index) => (
                    <motion.div
                        key={ct.id}
                        whileHover={{ scale: 1.03 }}
                        onHoverStart={() => setHoveredCategory(ct.id)}
                        onHoverEnd={() => setHoveredCategory(null)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * index, duration: 0.5 }}
                    >
                        <SingleCategory
                            ct={ct}
                            isHovered={hoveredCategory === ct.id}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default JobCategory;