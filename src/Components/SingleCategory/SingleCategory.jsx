import React from 'react';

const SingleCategory = ({ ct, isHovered }) => {
    const {logo, title, available} = ct;
    
    return (
        <div className="h-full">
            <div className={`
                relative h-full
                bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
                shadow-md hover:shadow-2xl
                rounded-2xl
                p-8
                transition-all duration-300 ease-in-out
                transform ${isHovered ? 'scale-[1.02]' : ''}
                border border-gray-100 dark:border-gray-700
                hover:border-blue-500/50 dark:hover:border-blue-400/50
                group
            `}>
                <div className="flex flex-col items-center">
                    <div className="
                        w-28 h-28 mb-6 
                        rounded-2xl
                        bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800
                        p-5
                        flex items-center justify-center
                        shadow-inner
                        group-hover:shadow-lg
                        transition-all duration-300
                    ">
                        <img 
                            className="w-full h-full object-contain filter drop-shadow-md"
                            src={logo} 
                            alt={`${title} category icon`}
                        />
                    </div>
                    
                    <h2 className="
                        text-2xl font-bold 
                        text-gray-800 dark:text-white 
                        mb-3 text-center
                        tracking-tight
                    ">
                        {title}
                    </h2>
                    
                    <div className="flex items-center gap-2">
                        <span className="
                            inline-flex items-center 
                            px-4 py-2 
                            rounded-lg
                            text-sm font-semibold
                            bg-blue-600/10 text-blue-700
                            dark:bg-blue-500/10 dark:text-blue-300
                            backdrop-blur-sm
                        ">
                            {available} Positions Open
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCategory;