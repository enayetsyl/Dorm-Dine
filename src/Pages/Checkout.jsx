import { async } from "@firebase/util";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import swal from "sweetalert";


// _id
// 65618522c4e22b13ffbf539e
// name
// "Enayet"
// email
// "bottle@glass.com"
// password
// "123456A!"
// role
// "resident"
// package
// "none"
// badge
// "bronze"

const Checkout =  () => {
  const {membershipData, googleUser} = useAuth()
  const axiosSecure = useAxiosSecure()
  console.log(membershipData)
  console.log(googleUser)

  const handleCheckout = async () => {
    try{
      const membershipPackage = {
        package: membershipData.type,
      }
console.log(membershipPackage)
      const response = await axiosSecure.put(`/api/v1/checkout/${googleUser._id}`, membershipPackage)
      if(response.data.modifiedCount > 0){
        swal('Congratulation', 'You successfully purchase the package', "success")
      }

    }catch(error){
      console.log(error)
    }

  }

  return (
    <div className='pt-10'>
      <div className='bg-one w-[70%] mx-auto rounded-lg h-96 flex flex-col justify-start pt-20 items-center space-y-10'>
        <h1 className='w-full text-5xl text-white font-primary text-center '>Package Name: <span className='capitalize font-bold'>{membershipData?.type}</span></h1>
        <h2
        className='text-4xl text-white font-bold'
        >Price: ${membershipData?.price}</h2>
        <button 
        onClick={handleCheckout}
        className="bg-four text-white py-5 px-20 font-bold text-xl mt-10 rounded-lg">Buy Now</button>
      </div>
    </div>
  );
};

export default Checkout;