import { Link, Outlet } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import '../Components/button.css'
import useAdmin from "../hooks/useAdmin";
import titleIcon from '../assets/titleIcon.png'

const DashboardLayout = () => {
  const [isAdmin] = useAdmin()
  return (
    <div className="">
      {/* sidebar */}
    <div className=" bg-five p-2 space-x-5 flex flex-row flex-wrap gap-5">
      {
        isAdmin ? <>
        <Link to='/'>
        <img src={titleIcon} alt="" className="max-w-[100px]"/>
        </Link>
        <Link to='/dashboard/adminProfile'>
      <AwesomeButton type="primary" className='aws-btn font-bold px-20 w-full' >Admin Profile</AwesomeButton>
      </Link>
        <Link to='/dashboard/manageUsers'>
      <AwesomeButton type="primary" className='aws-btn font-bold px-20 w-full' >Manage Users</AwesomeButton>
      </Link>
        <Link to='/dashboard/addMeal'>
      <AwesomeButton type="primary" className='aws-btn font-bold px-20 w-full' >Add Meal</AwesomeButton>
      </Link>
        <Link to='/dashboard/allMeals'>
      <AwesomeButton type="primary" className='aws-btn font-bold px-20 w-full' >All Meals</AwesomeButton>
      </Link>
        <Link to='/dashboard/allReviews'>
      <AwesomeButton type="primary" className='aws-btn font-bold px-20 w-full' >All Reviews</AwesomeButton>
      </Link>
        <Link to='/dashboard/serveMeals'>
      <AwesomeButton type="primary" className='aws-btn font-bold px-20 w-full' >Serve Meals</AwesomeButton>
      </Link>
        <Link to='/dashboard/upcomingMeals'>
      <AwesomeButton type="primary" className='aws-btn font-bold px-20 w-full' >Upcoming Meals</AwesomeButton>
      </Link>
     
        </> : <>
        <Link to='/'>
        <img src={titleIcon} alt="" className="max-w-[100px]"/>
        </Link>
        <Link to='/dashboard/myProfile'>
      <AwesomeButton type="primary" className='aws-btn font-bold px-20 w-full' >My Profile</AwesomeButton>
      </Link>
      <Link to='/dashboard/requestedMeals'>
      <AwesomeButton type="primary" className='aws-btn font-bold px-20 w-full' >Requested Meals</AwesomeButton>
      </Link>
        <Link to='/dashboard/myReviews'>
      <AwesomeButton type="primary" className='aws-btn font-bold px-20 w-full' >My Reviews</AwesomeButton>
      </Link>
        </>
      }
    </div>
      {/* main section */}
      <div className="py-10">
        <Outlet/>
      </div>
    </div>
  );
};


export default DashboardLayout;