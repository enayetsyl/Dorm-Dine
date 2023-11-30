import axios from "axios";
import useAxiosSecure, { axiosSecure } from "../hooks/useAxiosSecure";


const useApi = () => {
  const axiosSecure = useAxiosSecure()

  const getMeal = async(id) => {
    try{
      const response = await axiosSecure.get(`/api/v1/editmeal/${id}`)
      return response.data
    }catch(error){
      console.log('Error getMeal', error)
      throw error
    }
  }

  return {
    getMeal
  }
};

export default useApi;