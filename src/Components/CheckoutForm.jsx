import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import swal from "sweetalert";
import useAxiosPublic from "../hooks/useAxiosPublic";

const CheckoutForm = () => {
  const [error, setError] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const stripe = useStripe();
  const elements = useElements()

  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const {membershipData, googleUser, setGoogleUser} = useAuth()
  console.log('price for server', membershipData.price)
  useEffect(() => {
    axiosSecure.post('/api/v1/create-payment-intent', {price: membershipData.price})
    .then(res => {
      console.log(res.data.clientSecret)
      setClientSecret(res.data.clientSecret)
    })
  }, [axiosSecure, membershipData.price])

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(!stripe || !elements){
      return;
    }

    const card = elements.getElement(CardElement)

    if(card == null){
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card
    })

    if(error){
      console.log('payment error', error)
      setError(error.message)
    }
    else{
      console.log('payment method', paymentMethod)
      setError('')
    }

    // confirm payment

    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details:{
          name: googleUser?.name || 'anonymous',
          email: googleUser?.email || 'anonymous',
        }
      }
    })
    if(confirmError){
      console.log('confirm error', confirmError)
      
    }else{
      console.log('payment intent', paymentIntent)
      if(paymentIntent.status === 'succeeded'){
        console.log(('transaction id', paymentIntent.id))
        setTransactionId(paymentIntent.id)
        const membershipPackage = {
          package: membershipData.type,
          badge:'gold',
        }

        const response = await axiosSecure.put(`/api/v1/checkout/${googleUser._id}`, membershipPackage)
      if(response.data.modifiedCount > 0){
        const getUserInfo = await axiosPublic.get(`/api/v1/user?email=${googleUser.email}`)
        if(getUserInfo.data.length > 0){
          setGoogleUser(getUserInfo.data[0])
          swal('Congratulation', 'You successfully purchase the package', "success")
        }
      }
      }
    }
  }

  return (
  <div className="w-[90%] mx-auto">
    <form onSubmit={handleSubmit}>
    <CardElement
    options={{
      style:{
        base:{
          fontSize: '16px',
          color: '#424770',
          '::placeholder':{
            color:'#aab7c4'
          },
        },
        invalid:{
          color:'#9e2146',
        },
      },
    }}
    />
<button
type="submit" 
disabled={!stripe || !clientSecret}
className="my-3 bg-four text-white py-3 px-5 rounded-lg font-bold text-lg"
>Pay</button>
<p className="text-xl font-bold">{error}</p>
  {
    transactionId && <p className="text-two">Your transaction Id: {transactionId}</p>
  }
  </form>
  </div>
  );
};

export default CheckoutForm;