const addToDb = id => {
    let jobApplications = getStoredJobApplication();
    // add job id
    const exists = jobApplications[id];
    if (!exists) {
        jobApplications[id] = true;
    }
    localStorage.setItem('job-applications', JSON.stringify(jobApplications));
}

const getStoredJobApplication = () => {
    let jobApplications = {};
    //get the job applications from local storage
    const storedApplications = localStorage.getItem('job-applications');
    if (storedApplications) {
        jobApplications = JSON.parse(storedApplications);
    }
    return jobApplications;
}

const getShoppingCart = () => {
    let shoppingCart = {};

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('shopping-cart');
    if (storedCart) {
        shoppingCart = JSON.parse(storedCart);
    }
    return shoppingCart;
}

export {
    addToDb,
    getShoppingCart,
    getStoredJobApplication
}
