import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import '../Components/button.css'
import MealCard from "../Components/MealCard";
import Container from "../Components/Container";

const Meals = () => {
  

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
      <AwesomeButton type="primary" className='aws-btn font-bold px-20 ' >Filter by Price</AwesomeButton>
      </div>

      <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
       <MealCard/>
       <MealCard/>
       <MealCard/>
       <MealCard/>
       <MealCard/>
       <MealCard/>
       <MealCard/>
        </div>    
    </div>
    </Container>
  );
};

export default Meals;