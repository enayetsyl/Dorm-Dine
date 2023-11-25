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
import MealDetails from "../Pages/MealDetails";
import UpcomingMeals from "../Pages/UpcomingMeals";
import DashboardLayout from "../MainLayout/DashboardLayout";
import MyProfile from "../DashBoard/MyProfile";
import RequestedMeals from "../DashBoard/RequestedMeals";
import MyReviews from "../DashBoard/MyReviews";
 
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
        path: '/mealdetails',
        element:<MealDetails/>
      },
      {
        path: '/upcomingmeals',
        element:<UpcomingMeals/>
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