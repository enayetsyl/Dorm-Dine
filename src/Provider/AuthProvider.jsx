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
  console.log('userinfo',user)
  console.log('google user info', googleUser)

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
      // console.log(currentUser)
    const userEmail = currentUser?.email || user?.email 
    const loggedUser = {email: userEmail}
      // console.log(user)
      // console.log(googleUser)
      setUser(currentUser)
      // setLoading(false);
      if(currentUser){
        setLoading(true)
        axios.post('http://localhost:5000/api/v1/jwt', loggedUser, {withCredentials: true})
        .then(() => {
          axios.get(`http://localhost:5000/api/v1/user?email=${loggedUser.email}`)
          .then(getRes => {
            setGoogleUser(getRes.data[0])
            setLoading(false)
          })
          .catch(getError => {
            console.log('get error', getError)
            setLoading(false)
          })
        })
        .catch(tokenErr => {
          console.log('Token error', tokenErr)
          setLoading(false)
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
  },[])

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
