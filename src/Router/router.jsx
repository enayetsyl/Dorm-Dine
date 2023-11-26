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
        element:<Checkout/>
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
     
    ]
  },
  {
    path:'dashboard',
    element:<DashboardLayout/>,
    children:[
      // ADMIN ROUTE
      {
        path:'adminProfile',
        element:<AdminProfile/>
      },
      {
        path:'manageUsers',
        element:<ManageUsers/>
      },
      {
        path:'addMeal',
        element:<AddMeal/>
      },
      {
        path:'allMeals',
        element:<AllMeals/>
      },
      {
        path:'allReviews',
        element:<AllReviews/>
      },
      {
        path:'serveMeals',
        element:<ServeMeals/>
      },
      {
        path:'upcomingMeals',
        element:<UpcomingMealsAdmin/>
      },

      // USER ROUTE
      {
        path:'myProfile',
        element:<MyProfile/>,
      },
      {
        path:'requestedMeals',
        element:<RequestedMeals/>,
      },
      {
        path:'myReviews',
        element:<MyReviews/>,
      },
    ]
  }
]);

export default router;

// change the path, element and loader as per your requirement