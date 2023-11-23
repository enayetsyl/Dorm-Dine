import {
  createBrowserRouter
} from "react-router-dom";
// 
import Error from "../Pages/Error";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
 
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
      // {
      //   path: '/register',
      //   element:<Register></Register>
      // },
      // {
      //   path: '/alljob',
      //   element:<AllJob></AllJob>,
      //   loader:() => fetch('http://localhost:5000/api/v1/jobs')
      // },
    ]
  },
]);

export default router;

// change the path, element and loader as per your requirement