import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/firebase.config";
// import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";
// import { useNavigate } from "react-router-dom";



export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [googleUser, setGoogleUser] = useState(null)
  const [loading, setLoading] = useState(true);
  // const axiosSecure = useAxiosSecure()
  // const navigate = useNavigate()

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const googleSignIn = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser => {
      console.log(currentUser)
    const userEmail = currentUser?.email || user?.email || googleUser?.email;
    const loggedUser = {email: userEmail}
      console.log(user)
      console.log(googleUser)
      setUser(currentUser)
      setLoading(false);
      if(currentUser){
        axios.post('http://localhost:5000/api/v1/jwt', loggedUser, {withCredentials: true})
        .then(response => {
          console.log(response.data)
        })
      }else {
        axios.post('http://localhost:5000/api/v1/logout', loggedUser, {withCredentials: true})
        .then(response => {
          console.log(response.data)
          // navigate('/login')
        })
      }


    }))

    return () => {
      unSubscribe()
    }
  },[googleUser, user])

  const authInfo = {
    user, 
    loading,
    createUser,
    signInUser,
    googleSignIn, 
    logOut,
    setUser,
    googleUser,
    setGoogleUser,
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// change the imports if necessary
// in the useState you can use userName and userPhoto use state if necessary
// you should keep user useState for making the observer within useEffect to work.
// if you change the authInfo variable name then make sure to change the value inside AuthContext.Provider tag. 