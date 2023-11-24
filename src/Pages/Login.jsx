import bgImage from '../assets/16.jpg'

import { useForm } from "react-hook-form"

const Login = () => {
  
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => console.log(data)
  return (
    <div
    className="min-h-screen bg-no-repeat bg-cover relative"
    style={{backgroundImage: `url(${bgImage})`}}>
     <div className='bg-five absolute left-6 top-[1px] md:left-48 md:top-1 lg:left-[700px] lg:top-20 py-5 px-10  space-y-5'>
      <h1 className='text-center text-four text-5xl font-primary font-bold'>Login</h1>
     <form onSubmit={handleSubmit(onSubmit)}
     className='space-y-3'
     >
     
      <div className='flex flex-row justify-start items-center gap-8'>
      <label htmlFor="" className='font-bold text-black'>Email:    </label>
      <input {...register("email", { required: true })} 
      className='py-2 px-5  rounded-lg w-full' 
      placeholder='Email'
      />
      </div>
      <div className='flex flex-row justify-start items-center gap-1'>
      <label htmlFor="" className='font-bold text-black'>Password: </label>
      <input {...register("password", { pattern: /^[A-Za-z]+$/i })} 
      className='py-2 px-5 rounded-lg w-full' 
      placeholder='Name'
      />
      </div>
      <div className='flex justify-center items-center'>
      <input type="submit"
      className='bg-four text-white font-semibold text-lg py-2 px-4 rounded-lg w-full mt-5'
      value={'Login'}
      />
      </div>
    </form>
    <hr className='w-full bg-four h-1' />
    <h1 className='text-center font-bold text-xl uppercase'>or</h1>
    <div className='w-full'>
      <button className='bg-three text-black font-semibold py-3 px-5 w-full rounded-lg text-xl'>Login With Google</button>
    </div>
    <div>
      <p className=' text-center text-black font-secondary'>Already have account? <span className='underline font-bold text-four'>Register</span></p>
    </div>
     </div>
    </div>
  );
};

export default Login;