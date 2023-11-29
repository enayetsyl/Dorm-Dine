import {
  createBrowserRouter
} from "react-router-dom";
// 
import Error from "../Pages/Error";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import Meals from "../Pages/Meals";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import UpcomingMeals from "../Pages/UpcomingMeals";
import DashboardLayout from "../MainLayout/DashboardLayout";
import MyProfile from "../DashBoard/MyProfile";
import RequestedMeals from "../DashBoard/RequestedMeals";
import MyReviews from "../DashBoard/MyReviews";
import AdminProfile from "../DashBoard/AdminProfile";
import ManageUsers from "../DashBoard/ManageUsers";
import AddMeal from "../DashBoard/AddMeal";
import AllMeals from "../DashBoard/AllMeals";
import AllReviews from "../DashBoard/AllReviews";
import ServeMeals from "../DashBoard/ServeMeals";
import UpcomingMealsAdmin from "../DashBoard/UpcomingMealsAdmin";
import MealDetails from "../Pages/MealDetails";
import Checkout from "../Pages/Checkout";
import PrivateRoute from "./PrivateRoute";
import Contact from "../Pages/Contact";
import UpdateMeal from "../DashBoard/UpdateMeal";
 
 const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children:[
      {
        path: '/',
        element:<Home></Home>
      },
      {
        path: '/meals',
        element:<Meals/>
      },
      {
        path: '/mealdetails/:id',
        element:<MealDetails/>,
        loader: ({params}) => fetch(`http://localhost:5000/api/v1/meals/${params.id}`),
      },
      {
        path: '/upcomingmeals',
        element:<UpcomingMeals/>
      },
      {
        path: '/checkout',
        element:<PrivateRoute><Checkout/></PrivateRoute>
      },
      // {
      //   path: '/addjob',
      //   element:<PrivateRoute><AddJob></AddJob></PrivateRoute>
      // },
      // {
      //   path: '/updatejob/:id',
      //   element:<PrivateRoute><UpdateJob></UpdateJob></PrivateRoute>,
      //   loader: ({params}) => fetch(`http://localhost:5000/api/v1/jobs/${params.id}`)
      // },
      // {
      //   path: '/login',
      //   element:<Login></Login>
      // },
      {
        path: '/register',
        element:<Register/>
      },
      {
        path: '/login',
        element:<Login/>
      },
      {
        path: '/contact',
        element:<Contact/>
      },
     
    ]
  },
  {
    path:'dashboard',
    element:<DashboardLayout/>,
    children:[
      // ADMIN ROUTE
      {
        path:'adminProfile',
        element:<PrivateRoute><AdminProfile/></PrivateRoute>
      },
      {
        path:'manageUsers',
        element:<PrivateRoute><ManageUsers/></PrivateRoute>,
        loader: () => fetch('http://localhost:5000/api/v1/allUserCount')
      },
      {
        path:'addMeal',
        element:<PrivateRoute><AddMeal/></PrivateRoute>
      },
      {
        path:'updateMeal/:id',
        element:<PrivateRoute><UpdateMeal/></PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/api/v1/editmeal/${params.id}`)
      },
      {
        path:'allMeals',
        element:<PrivateRoute><AllMeals/></PrivateRoute>,
        loader: () => fetch('http://localhost:5000/api/v1/allmealCount')
      },
      {
        path:'allReviews',
        element:<PrivateRoute><AllReviews/></PrivateRoute>,
        loader: () => fetch('http://localhost:5000/api/v1/allReviewCount')
      },
      {
        path:'serveMeals',
        element:<PrivateRoute><ServeMeals/></PrivateRoute>,
        loader: () => fetch('http://localhost:5000/api/v1/allServeMealCount')
      },
      {
        path:'upcomingMeals',
        element:<PrivateRoute><UpcomingMealsAdmin/></PrivateRoute>,
        loader: () => fetch('http://localhost:5000/api/v1/upcomingMealCount')
      },

      // USER ROUTE
      {
        path:'myProfile',
        element:<PrivateRoute><MyProfile/></PrivateRoute>,
      },
      {
        path:'requestedMeals',
        element:<PrivateRoute><RequestedMeals/></PrivateRoute>,
      },
      {
        path:'myReviews',
        element:<PrivateRoute><MyReviews/></PrivateRoute>,
      },
    ]
  }
]);

export default router;

// change the path, element and loader as per your requirement