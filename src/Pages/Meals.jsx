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
  const [searchTerm, setSearchTerm] = useState('')

  if(isLoading){
    return <p>loading</p>
  }

  const filteredData = data.filter((meal) => {
    const categoryFilter = !selectedCategory || meal.mealCategory === selectedCategory;

    const priceFilter = !selectedPriceRange || (selectedPriceRange === 'below1000' && meal.price < 1000) || (selectedPriceRange === 'above1000' && meal.price >= 1000)

    const searchFilter = !searchTerm || meal.mealTitle.toLowerCase().includes(searchTerm.toLowerCase())

    return categoryFilter && priceFilter && searchFilter
  })

console.log(data)
  return (
    <Container>
      <div className="space-y-5 py-10">
    
    {/* search bar */}
    <div >
      <form 
      onSubmit={(e)=> {
        e.preventDefault()
      }}
      action="" 
      className="flex flex-col md:flex-row justify-center items-center gap-5 w-[90%] mx-auto">
        <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text" name="search" id="" placeholder="Search Meal" className="border border-solid border-four rounded w-3/4 py-2 px-3"/>
        <AwesomeButton type="primary" className='aws-btn font-bold px-20 w-1/2 md:w-1/4' >Search Meal</AwesomeButton>
      </form>
      </div>
      {/* search by category and price range */}
      <div className=" flex flex-col md:flex-row justify-center items-center gap-10">
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
      </div>
      <div className=" flex flex-col md:flex-row justify-center items-center gap-10">
      <AwesomeButton type="primary" className='aws-btn font-bold px-20 ' >Filter by Price</AwesomeButton>
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