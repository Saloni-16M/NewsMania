import React, { useState, useEffect } from 'react';
import Card from './smallcomponents/Card';  // Assuming you have the Card component in the `smallcomponents` folder
import Navbar from './smallcomponents/Navbar';
const Home = () => {
    const [newspapers, setNewspapers] = useState([]);

    // Fetching data on component mount
    useEffect(() => {
        const fetchNewspapers = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/newspapers'); // Adjust with your API URL
                const data = await response.json();
                setNewspapers(data);
            } catch (error) {
                console.error('Error fetching newspapers:', error);
            }
        };

        fetchNewspapers();
    }, []);

    return (
        <>
            
            <div className="container">
                <div className="row">
                    {newspapers.length > 0 ? (
                        newspapers.map((newspaper, index) => (
                            <div className="col-md-4" key={index}>
                                <Card title={newspaper.title} description={newspaper.description}  newspaperName={newspaper.id} />
                            </div>
                        ))
                    ) : (
                        <p>Loading newspapers...</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;
