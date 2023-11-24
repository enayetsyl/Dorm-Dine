import bgImage from '../assets/16.jpg'

import { useForm } from "react-hook-form"
import useAuth from '../hooks/useAuth';
import swal from 'sweetalert';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Login = () => {
  const {signInUser, setUser, googleSignIn, setGoogleUser} = useAuth();
  const axiosSecure = useAxiosSecure()
  const location = useLocation();
  const navigate = useNavigate();
  const { register, 
    formState: { errors },
    handleSubmit } = useForm()
  const onSubmit = (data) => {
    signInUser(data.email, data.password)
    .then(response => {
      console.log(response)
      setUser(response.user)
      swal('Ovinondon', "Your Login Successful", "success")
      navigate(location?.state ? location.state : '/')
    })
    .catch(err => {
      if(err){
        swal("ERROR", `${err.message}`, "error")
      }
    })
  }

  const handleGoogleSignIn = () => {
    googleSignIn()
    .then(response => {
      const userInfo = {
        name: response.user.displayName,
        email: response.user.email,
        password: 'n/a'
      }
      console.log(userInfo)
      axiosSecure.post('/api/v1/user', userInfo)
      .then(response => {
        console.log(response)
        if(response.data.statusText === 'OK'){
          swal('Congratulations', 'Your registration is complete', 'success');
          setUser(userInfo)
          setGoogleUser(userInfo)
          navigate(location?.state ? location.state : '/')
        } else if (response.data.message === 'User already registered'){
          swal('Congratulations', 'Your Login is Successful', 'success');
          console.log(userInfo)
          setUser(userInfo)
          setGoogleUser(userInfo)
          navigate(location?.state ? location.state : '/')
        }
        else{
          swal('Something Wrong', 'Try again', 'error');
        }
      })
      .catch(err => {
        console.log(err)
      })
    })

  }

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
      <div>
      {
        errors.email?.type === "required" && (
          <p role='alert'>Email is required</p>
        )
      }
      </div>
      <div className='flex flex-row justify-start items-center gap-1'>
      <label htmlFor="" className='font-bold text-black'>Password: </label>
      <input {...register("password", {required: true, pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, })} 
      className='py-2 px-5 rounded-lg w-full' 
      placeholder='Name'
      type='password'
      />
      </div>
      <div>
      {
        errors.password?.type === "required" && (
          <p role='alert'>Password is required</p>
        )
      }
      {errors.password?.type === "pattern" && (
    <p role='alert'>Password must contain at least 6 digits, 1 capital letter, and 1 special character</p>
  )}
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
      <button 
      onClick={handleGoogleSignIn}
      className='bg-three text-black font-semibold py-3 px-5 w-full rounded-lg text-xl'>Login With Google</button>
    </div>
    <div>
      <p className=' text-center text-black font-secondary'>Already have account? <span className='underline font-bold text-four'>
        <Link to='/register'>
        Register
        </Link>
        </span></p>
    </div>
     </div>
    </div>
  );
};

export default Login;