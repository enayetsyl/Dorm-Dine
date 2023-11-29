
import { useQuery } from "@tanstack/react-query";
import Container from "../Components/Container";
import MealCard from "../Components/MealCard";
import useAxiosPublic from "../hooks/useAxiosPublic";
import UpcomingMealCard from "../Components/UpcomingMealCard";


const UpcomingMeals = () => {
  const axiosPublic = useAxiosPublic()

  const {data, isLoading} = useQuery({
    queryKey:['upcominglMeal'],
    queryFn: async () => {
      const result = await axiosPublic.get('/api/v1/upcomingmeal')
      return result.data
    }
  })

  if(isLoading){
    return <p>loading</p>
  }

  console.log('upcoming meal', data)

  return (
    <Container>
      <div>
      <h1 className="text-center text-5xl text-four font-bold font-primary py-14 drop-shadow-xl">Coming Soon</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
       {
        data.length > 0 ? (
          data.map((upcomingMeal, index) => (
            <UpcomingMealCard
            key={index}
            upcomingMeal={upcomingMeal}
            />
          ))

        ) : (<p>No upcoming meal to show</p>)
       }
      </div>
    </div>
    </Container>
  );
};

export default UpcomingMeals;