import axios from "axios";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// const axiosSecure = useAxiosSecure()


// export function getMeal(id){
//   return axios
//   .get(`http://localhost:5000/api/v1/editmeal/${id}`)
//   .then(res => res.data)
// }


export function allMealCount(){
  return axios
  .get(`http://localhost:5000/api/v1/allmealCount`)
  .then(res => res.data)
}

export function allMeal(currentPage, itemsPerPage){
  return axios
  .get(`http://localhost:5000/api/v1/allmeal?page=${currentPage}&size=${itemsPerPage}`)
  .then(res => res.data)
}