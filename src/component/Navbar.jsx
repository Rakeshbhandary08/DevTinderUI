import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {

  const user = useSelector(store => store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogout=async ()=>{

    try{
      await axios.post(BASE_URL + "/logout",{},{ withCredentials: true })
      //How to remove the user details from the redux store
      dispatch(removeUser());
      return navigate("/login");
    }
    catch(err){
        console.log(err)
    }
  }

  const closeDropdown = () => {
    document.activeElement.blur();
  }


  return (
    <div>

      <div className="navbar bg-base-200 shadow-sm px-2">
        <div className="flex-1 mx-5">
          <Link to="/" className="btn btn-ghost text-xl"><span className='hidden md:flex'>✌️</span>DevTinder</Link>
        </div>
        <div className="flex gap-2 ">

          {user && (<div className="dropdown dropdown-end  flex justify-center gap-2">
            <p className='flex items-center font-medium'>Welcome, {user.firstName}</p>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-yellow-100">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><Link to="/" onClick={closeDropdown}> <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg> Home</Link></li>
              <li>
                <Link onClick={closeDropdown} to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/connection" onClick={closeDropdown} >Connections</Link></li>
              <li><Link to="/request" onClick={closeDropdown} >Requests</Link></li>
              <li><Link onClick={handleLogout}>Logout</Link></li>
              
            </ul>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default Navbar;