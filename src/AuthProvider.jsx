import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";
import auth from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);


  // get current user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
    });

    return () => {
      unSubscribe();
    }
  }, []);

  //get local storage info
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  // set cart items
  useEffect(()=>{
    if(user){
      axios.get(`https://medico-mall-server.vercel.app/users?email=${user.email}`)
      .then(res=>res.data)
      .then(user=>setCartItems(user.cartItems))
    }
  }, [user, setCartItems]);

  //get all medicines data
  useEffect(() => {
    axios.get('https://medico-mall-server.vercel.app/medicines')
      .then(response => response.data)
      .then(data => {
        console.log("Number of medicines from db: ", data.length);
        setMedicines(data);
      })
      .catch(error => console.error("Error fetching medicines:", error));
  }, []);

  // get categories
  useEffect(() => {
    axios.get('https://medico-mall-server.vercel.app/categories')
      .then(response => response.data)
      .then(data => {
        console.log(data)
        setCategories(data)
      })
      .catch(error => console.error('Error fetching categories:', error)); // Optional: Handle errors
  }, []);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  const signInGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .finally(() => setLoading(false));
  };

  const signInGitHub = () => {
    setLoading(true);
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider)
      .finally(() => setLoading(false));
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .finally(() => setLoading(false));
  };


  const authInfo = {
    user,
    setUser,
    createUser,
    signInUser,
    signInGoogle,
    signInGitHub,
    logOut,
    loading,
    setLoading,
    medicines,
    categories,
    cartItems,
    setCartItems
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export default AuthProvider;