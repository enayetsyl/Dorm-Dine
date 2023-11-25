import { useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const Meals = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()

  useEffect(() => {
    axiosSecure.get(`/api/v1/test?email=${user?.email}`)
    .then(res => console.log(res.data))
  },[axiosSecure, user.email])


  return (
    <div>
      All meals here      
    </div>
  );
};

export default Meals;