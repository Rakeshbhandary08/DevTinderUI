import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { transformValueTypes } from 'framer-motion';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [gender, setGender] = useState(user.gender);
    const [age, setAge] = useState(user.age);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    //const [password, setPassword] = useState("Kokushibo@9298");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [successMsg, setSuccessMsg] = useState("");
    const [showMsg, setShowMsg] = useState(false);


    const saveProfile = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, age, gender, photoUrl },
                { withCredentials: true });

            dispatch(addUser(res?.data?.data));
            
            setShowMsg(true)
            setSuccessMsg(res?.data?.message)

            setTimeout(() => {
                setShowMsg(false);
                setSuccessMsg("");

            }, 2000)
        }

        catch (err) {
            setError(err?.response?.data || "something went wrong");
            console.log(err);
            setTimeout(() => {
                setError("");       // ✅ auto clear error after 2 seconds
            }, 5000);
        }
    }


    return (
        <div className='flex flex-col md:flex-row  justify-center gap-5 items-center mb-4'>
            <div className='flex justify-center mt-10 '>
                <div className="card bg-base-300 w-96 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title flex justify-center">Edit Profile</h2>
                        <div >
                            <fieldset className="fieldset flex flex-col gap-5">
                                <div>
                                    <legend className="fieldset-legend gap-2">First Name</legend>
                                    <input type="text" value={firstName}
                                        className="input border-0 outline-0 "
                                        onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div>
                                    <legend className="fieldset-legend gap-2">Last Name</legend>
                                    <input type="text" value={lastName}
                                        className="input border-0 outline-0 "
                                        onChange={(e) => setLastName(e.target.value)} />
                                </div>
                                <div>
                                    <legend className="fieldset-legend gap-2">Age</legend>
                                    <input type="text" value={age}
                                        className="input border-0 outline-0 "
                                        onChange={(e) => setAge(e.target.value)} />
                                </div>
                                <div>
                                    <legend className="fieldset-legend gap-2">Gender</legend>
                                    <select value={gender} onChange={(e) => setGender(e.target.value)}
                                        className='select border-0 outline-0 '>
                                        <option disabled value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>

                                    </select>
                                </div>

                                <div>
                                    <legend className="fieldset-legend gap-2">Photo Url</legend>
                                    <input type="text" value={photoUrl}
                                        className="input border-0 outline-0 "
                                        onChange={(e) => setPhotoUrl(e.target.value)} />
                                </div>

                            </fieldset>

                        </div>
                        {error && <p className='text-red-500 font-medium'>{error}</p>}
                        {showMsg && <div> <div className="toast toast-top toast-center">
                            <div className="alert alert-success">
                                <span>Profile saved successfully.</span>
                            </div>
                        </div></div>}
                        <div className="card-actions justify-center mt-3">
                            <button className="btn btn-primary" onClick={saveProfile} >Save Profile</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <UserCard user={{ firstName, lastName, age, gender, photoUrl }} />
            </div>
            <div>

            </div>
        </div>
    )
}

export default EditProfile