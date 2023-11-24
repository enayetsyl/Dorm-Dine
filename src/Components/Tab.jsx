// Tab.js
import { useState, useEffect } from 'react';
import MealCard from './MealCard';
import Container from './Container';
// import JobCard from './JobCard';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import './button.css'

const Tab = () => {
  const [activeTab, setActiveTab] = useState('All'); 
  const [jobs, setJobs] = useState([]);

  // useEffect(() => {
  //   // Fetch data from your server based on the active tab
  //   fetch(`http://localhost:5000/api/v1/tabJobs?category=${activeTab}`)
  //     .then((response) => response.json())
  //     .then((data) => setJobs(data))
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [activeTab]); 

  const tabs = ['All', 'Breakfast', 'Lunch', 'Dinner'];

  const tabButtonStyle = {
    padding: '10px 20px',
    margin: '5px',
    backgroundColor: '#e67e22',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '700',
  };

  return (
    <Container>
      <div className='space-y-10'>
      <div>
        {tabs?.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...tabButtonStyle,
              backgroundColor: activeTab === tab ? '#e67e22' : '',
              color: activeTab === tab ? 'white' : '',
              borderRadius: activeTab === tab ? '8px' : '',
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 lg:gap-5'>
        
         <MealCard></MealCard>
         <MealCard></MealCard>
         <MealCard></MealCard>
        
      </div>
      <div className='flex items-center justify-center'>
      <AwesomeButton type="primary" className='aws-btn font-bold px-20' >See All</AwesomeButton>
      </div>
    </div>
    </Container>
  );
};

export default Tab;