import Banner from "../Components/Banner";
import MemberSection from "../Components/MemberSection";
import Review from "../Components/Review";
import Tab from "../Components/Tab";

const Home = () => {
  return (
    <div className="space-y-20 mb-10">
       <Banner/>  
       <Tab/> 
       <Review/>  
       <MemberSection/>
    </div>
  );
};

export default Home;