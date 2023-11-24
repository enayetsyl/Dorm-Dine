import bgImage from '../assets/8.jpg'
import { useForm } from "react-hook-form"
import useAuth from '../hooks/useAuth';
import { getAuth, updateProfile } from 'firebase/auth';
import app from '../Firebase/firebase.config';
import swal from 'sweetalert';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const {createUser, setUser, googleSignIn} = useAuth();
  const auth = getAuth(app)
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const { register, 
    formState: { errors },
    handleSubmit } = useForm()
  const onSubmit = async (data) => {
    const userInfo = {
      ...data,
      role: 'resident',
      package: 'none', 
    }
    
    try {
      const res = await createUser(userInfo.email, userInfo.password)
    if(res.user){
      await updateProfile(auth.currentUser, {
        displayName: userInfo.name,
      })
      setUser(auth.currentUser)
      axiosSecure.post('/api/v1/user', userInfo)
      .then(response => {
        if (response.data.insertedId){
          swal('Congratulations', 'Your registration is complete', 'success');
          navigate('/')
        }else{
          swal('Something Wrong', 'Try again', 'error');
        }
      })
    } 
    }
    catch (err){
      swal('Error', err.message, 'error')
    }
  }
  // GOOGLE SING IN

  const handleGoogleSignIn = () => {
    googleSignIn()
    .then(response => {
      const userInfo = {
        name: response.user.displayName,
        email: response.user.email,
        password: 'n/a'
      }
      axiosSecure.post('/api/v1/user', userInfo)
      .then(response => {
        console.log(response)
        if(response.data.insertedId){
          swal('Congratulations', 'Your registration is complete', 'success');
          setUser(userInfo)
          navigate('/')
        } else if (response.data.message === 'User already registered'){
          swal('Congratulations', 'Your Login is Successful', 'success');
          setUser(userInfo)
          navigate('/')
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
      <h1 className='text-center text-four text-5xl font-primary font-bold'>Register</h1>
     <form onSubmit={handleSubmit(onSubmit)}
     className='space-y-3'
     >
      <div className='flex flex-row justify-start items-center gap-7 '>
        <label htmlFor="" className='font-bold text-black'>Name: </label>
      <input {...register("name", { required: true, maxLength: 20 })} 
      className='py-2 px-5  rounded-lg w-full' 
      placeholder='Name'
      />
      </div>
      <div>
      {
        errors.name?.type === "required" && (
          <p role='alert'>Name is required</p>
        )
      }
      </div>
      <div className='flex flex-row justify-start items-center gap-8'>
      <label htmlFor="" className='font-bold text-black'>Email:    </label>
      <input {...register("email", { required: true })} 
      className='py-2 px-5  rounded-lg w-full' 
      placeholder='Email'
      type='email'
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
      placeholder='Password'
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
      value={'Register'}
      />
      </div>
    </form>
    <hr className='w-full bg-four h-1' />
    <h1 className='text-center font-bold text-xl uppercase'>or</h1>
    <div className='w-full'>
      <button
      onClick={handleGoogleSignIn}
      className='bg-three text-black font-semibold py-3 px-5 w-full rounded-lg text-xl'>Register With Google</button>
    </div>
    <div>
      <p className=' text-center text-black font-secondary'>Already have account? <span className='underline font-bold text-four'>Login</span></p>
    </div>
     </div>
    </div>
  )
  

};

export default Register;


