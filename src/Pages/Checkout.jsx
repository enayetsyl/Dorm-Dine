import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import swal from "sweetalert";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm";



const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
const Checkout =  () => {
  const {membershipData, googleUser, setGoogleUser} = useAuth()
  const axiosSecure = useAxiosSecure()
  const axiosPublic = useAxiosPublic()
  console.log(membershipData)
  console.log(googleUser)


  return (
    <div className='pt-10'>
      <div className='bg-one w-[70%] mx-auto rounded-lg h-96 flex flex-col justify-start pt-20 items-center space-y-10'>
        <h1 className='w-full text-5xl text-white font-primary text-center '>Package Name: <span className='capitalize font-bold'>{membershipData?.type}</span></h1>
        <h2
        className='text-4xl text-white font-bold'
        >Price: ${membershipData?.price}</h2>
        {/* <button 
        onClick={handleCheckout}
        className="bg-four text-white py-5 px-20 font-bold text-xl mt-10 rounded-lg">Buy Now</button> */}
      </div>
      <div className="py-10">
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;