import { Link, Outlet } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import '../Components/button.css'
import useAdmin from "../hooks/useAdmin";


const DashboardLayout = () => {
  const [isAdmin] = useAdmin()
  return (
    <div className="flex justify-between">
      {/* sidebar */}
    <div className="min-h-screen bg-five p-10 space-y-5 flex flex-col">
      {
        isAdmin ? <>
        <Link to='/dashboard/myProfile'>
      <AwesomeButton type="primary" className='aws-btn font-bold px-20 w-full' >My Profile</AwesomeButton>
      </Link>
      <Link to='/dashboard/requestedMeals'>
      <AwesomeButton type="primary" className='aws-btn font-bold px-20 w-full' >Requested Meals</AwesomeButton>
      </Link>
     
        </> : <>
        <Link to='/dashboard/myReviews'>
      <AwesomeButton type="primary" className='aws-btn font-bold px-20 w-full' >My Reviews</AwesomeButton>
      </Link>
        </>
      }
    </div>
      {/* main section */}
      <div>
        <Outlet/>
      </div>
    </div>
  );
};


export default DashboardLayout;