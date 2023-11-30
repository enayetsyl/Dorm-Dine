// Tab.js
import { useState, useEffect } from 'react';
import MealCard from './MealCard';
import Container from './Container';
// import JobCard from './JobCard';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import './button.css'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Tab = () => {
  const [activeTab, setActiveTab] = useState('All'); 
  const axiosPublic = useAxiosPublic()

 
  const {data: meals, isLoading, refetch} = useQuery({
    queryKey:['meals'],
    queryFn: async () => {
      const response = await axiosPublic.get(`/api/v1/meals?mealCategory=${activeTab}`)
      return response.data
    }
  })
  
  useEffect(() => {
    refetch()
  }, [activeTab, refetch])
  console.log(meals)



  // TAB NAME ARRAY
  const tabs = ['All', 'breakfast', 'lunch', 'dinner'];
  // TAB DESIGN
  const tabButtonStyle = {
    padding: '10px 20px',
    margin: '5px',
    backgroundColor: '#e67e22',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '700',
    textTransform: 'capitalize',
  };

  return (
    <Container>
      <div className='space-y-10 px-5'>
      <div>
        {tabs?.map((tab) => (
          <button
            key={tab}
            onClick={() => 
              setActiveTab(tab)
           }
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

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 lg:gap-5 '>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            meals.map((meal) => <MealCard key={meal._id} meal={meal} />)
          )}
        </div>

      
      <div className='flex items-center justify-center'>
      <Link to='/meals'>
      <AwesomeButton type="primary" className='aws-btn font-bold px-20' >See All</AwesomeButton>
      </Link>
      </div>
    </div>
    </Container>
  );
};

export default Tab;