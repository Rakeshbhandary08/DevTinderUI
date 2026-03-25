import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';


const Login = () => {
  const [emailId, setEmailId] = useState("Uppermoon9298@gmail.com");
  const [password, setPassword] = useState("Kokushibo@9298");
  const [error,setError] =useState("");
  const navigate=useNavigate();
  const dispatch = useDispatch();


  const handleLogin = async () => {
  
    try {
      const res = await
        axios.post( BASE_URL + "/login", { emailId, password },
          { withCredentials: true })

     
      // dispatch(addUser(res.data))
      dispatch(addUser(res.data.user));
      return navigate("/");


    }

    catch (err) {
      setError(err?.response?.data ||"something went wrong");
    }
  }

  return (
    <div className='flex justify-center mt-10 '>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Login</h2>
          <div >
            <fieldset className="fieldset flex flex-col gap-5">
              <div>
                <legend className="fieldset-legend gap-2">Email ID</legend>
                <input type="text" value={emailId}
                  className="input border-0 outline-0 "
                  onChange={(e) => setEmailId(e.target.value)} />
              </div>
              <div>
                <legend className="fieldset-legend gap-2">Password</legend>
                <input type="text" value={password}
                  className="input border-0 outline-0 "
                  onChange={(e) => setPassword(e.target.value)} />
              </div>
            </fieldset>

          </div>
          <p className='text-red-500 font-medium'>{error}</p>
          <div className="card-actions justify-center mt-3">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;