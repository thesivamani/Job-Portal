import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import JobSection from '../JobSection/JobSection';
import JobCategory from '../JobCategory/JobCategory';
import Footer from '../Footer/Footer';
import useTitle from '../hooks/useTitle';

const Home = () => {
    const [category, setCategory] = useState([]);
    useTitle('Home')

    useEffect(() => {
        async function fetchCategory() {
            const data = await fetch('/category.json')
            const category = await data.json()
            setCategory(category)
        }
        fetchCategory()
    }, []);
    
    return (
        <div>
            <Header />
            <JobCategory category={category} />
            <JobSection />
            <Footer />
        </div>
    );
};

export default Home;