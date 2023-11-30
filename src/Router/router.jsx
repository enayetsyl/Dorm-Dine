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
import UpdateMeal from "../DashBoard/UpdateMeal";
import InfiniteScrollComponent from "../Pages/infiniteScrollComponent";
 
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
        loader: ({params}) => fetch(`https://dorm-dine-server.vercel.app/api/v1/meals/${params.id}`),
      },
      {
        path: '/upcomingmeals',
        element:<UpcomingMeals/>
      },
      {
        path: '/checkout',
        element:<PrivateRoute><Checkout/></PrivateRoute>
      },
      {
        path: '/register',
        element:<Register/>
      },
      {
        path: '/login',
        element:<Login/>
      },
      // {
      //   path: '/contact',
      //   element:<InfiniteScrollComponent/>
      // },
      // {
      //   path: '/contact',
      //   element:<Meal2/>
      // },
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
      },
      {
        path:'addMeal',
        element:<PrivateRoute><AddMeal/></PrivateRoute>
      },
      {
        path:'updateMeal/:id',
        element:<PrivateRoute><UpdateMeal/></PrivateRoute>,
      },
      {
        path:'allMeals',
        element:<PrivateRoute><AllMeals/></PrivateRoute>,
      },
      {
        path:'allReviews',
        element:<PrivateRoute><AllReviews/></PrivateRoute>,
      },
      {
        path:'serveMeals',
        element:<PrivateRoute><ServeMeals/></PrivateRoute>,
      },
      {
        path:'upcomingMeals',
        element:<PrivateRoute><UpcomingMealsAdmin/></PrivateRoute>,
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