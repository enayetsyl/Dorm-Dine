import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getAuth, signOut } from "@firebase/auth";
import app from "../Firebase/firebase.config";

export const axiosSecure = axios.create({
  baseURL:'http://localhost:5000/',
  withCredentials: true
})

 const useAxiosSecure = () => {
  // const {logOut } = useAuth()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const auth = getAuth(app)

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  useEffect(() => {
    axiosSecure.interceptors.response.use(res => {
      return res;
    }, error => {
      if(error.response.status === 401 || error.response.status === 403){
        logOut()
        .then(() => {
          navigate('/login')
        })
        .catch (error => console.log(error))
      }
    })
  },[logOut, navigate])


  return axiosSecure
};

export default useAxiosSecure;