import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import '../Components/button.css'
import MealCard from "../Components/MealCard";
import Container from "../Components/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useState } from "react";

const Meals = () => {
  const axiosPublic = useAxiosPublic()

  const {data, isLoading} = useQuery({
    queryKey:['publicallmeal'],
    queryFn: async () => {
      const result = await axiosPublic.get('/api/v1/meals')
      return result.data
    }
  })

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPriceRange, setSelectedPriceRange] = useState('')

  if(isLoading){
    return <p>loading</p>
  }

  const filteredData = data.filter((meal) => {
    const categoryFilter = !selectedCategory || meal.mealCategory === selectedCategory;

    const priceFilter = !selectedPriceRange || (selectedPriceRange === 'below1000' && meal.price < 1000) || (selectedPriceRange === 'above1000' && meal.price >= 1000)
    return categoryFilter && priceFilter
  })

console.log(data)
  return (
    <Container>
      <div className="space-y-5">
    
    {/* search bar */}
    <div >
      <form action="" className="flex justify-center items-center gap-5">
        <input type="text" name="search" id="" placeholder="Search Meal" className="border border-solid border-four rounded w-3/4 py-2 px-3"/>
        <AwesomeButton type="primary" className='aws-btn font-bold px-20 w-1/4' >Search Meal</AwesomeButton>
      </form>
      </div>
      {/* search by category and price range */}
      <div className=" flex justify-center items-center gap-10">
      <AwesomeButton type="primary" className='aws-btn font-bold px-20 ' >Filter by category</AwesomeButton>
      <div>
    <label htmlFor="mealCategory" className="mr-2">Select by category:</label>
    <select id="mealCategory" name="mealCategory" 
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="border border-solid border-four rounded py-2 px-3">
      <option value="">All</option>
      <option value="breakfast">Breakfast</option>
      <option value="lunch">Lunch</option>
      <option value="dinner">Dinner</option>
    </select>
  </div>
      <AwesomeButton type="primary" className='aws-btn font-bold px-20 ' >Filter by Price</AwesomeButton>
      </div>
      <div>
            <label htmlFor="priceRange" className="mr-2">
              Filter by Price:
            </label>
            <select
              id="priceRange"
              name="priceRange"
              className="border border-solid border-four rounded py-2 px-3"
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
            >
              <option value="">All</option>
              <option value="below1000">Below 1000</option>
              <option value="above1000">Above 1000</option>
            </select>
          </div>
      <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {
        filteredData?.length > 0 ? (
          
            filteredData?.map(meal => <MealCard key={meal._id} meal={meal}/>)
          
          
        ) :(<p>No meal available</p>)
      }

        </div>    
    </div>
    </Container>
  );
};

export default Meals;