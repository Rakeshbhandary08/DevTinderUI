import React, { useEffect } from 'react'
import Navbar from './component/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './component/Footer';
import axios from 'axios';
import { BASE_URL } from './utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './utils/userSlice';

const Body = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData=useSelector(store =>store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view",
        { withCredentials: true });

      dispatch(addUser(res.data));  // ✅ res.data not fetchUser.data

    } catch (err) {
      if(err.status===401){
      return navigate("/login");           // ✅ redirect to login if not authenticated
      }
      console.log(err);
    }
  };

  useEffect(() => {
    
    fetchUser()

  },[]);

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body;