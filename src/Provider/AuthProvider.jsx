import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/firebase.config";
import useAxiosSecure from "../hooks/useAxiosSecure";
// import { useNavigate } from "react-router-dom";



export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [googleUser, setGoogleUser] = useState(null)
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure()
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
        axiosSecure.post('/api/v1/jwt', loggedUser)
        .then(response => {
          console.log(response.data)
        })
      }else {
        axiosSecure.post('/api/v1/logout', loggedUser)
        .then(response => {
          console.log(response.data)
          // navigate('/login')
        })
      }


    }))

    return () => {
      unSubscribe()
    }
  },[googleUser, user, axiosSecure])

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
