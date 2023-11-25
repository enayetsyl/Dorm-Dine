
import Container from "../Components/Container";
import MealCard from "../Components/MealCard";


const UpcomingMeals = () => {
  return (
    <Container>
      <div>
      <h1 className="text-center text-5xl text-four font-bold font-primary py-14 drop-shadow-xl">Coming Soon</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <MealCard/>
        <MealCard/>
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

export default UpcomingMeals;