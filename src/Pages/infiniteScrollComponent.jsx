import  { useState, useEffect } from 'react';

const InfiniteScrollComponent = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  // Function to fetch more data
  const fetchData = async () => {
    try {
      const response = await fetch(`https://dorm-dine-server.vercel.app/api/v1/allmealscroll`);
      const newData = await response.json();

      // Update state with new data
      setData(prevData => [...prevData, ...newData]);

      // Increment page number for the next request
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Event listener for scrolling
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Check if the user has scrolled to the bottom
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      fetchData(); // Fetch more data when reaching the bottom
    }
  };

  // useEffect to handle initial data load and attach scroll event listener
  useEffect(() => {
    fetchData(); // Initial data load
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      {/* Render your data here */}
      {data.map((item, index) => (
        <div key={index}>{item.title}</div> 
      ))}
    </div>
  );
};

export default InfiniteScrollComponent;
