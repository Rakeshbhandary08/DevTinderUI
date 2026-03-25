import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {

    const dispatch = useDispatch();    //Add data from backend to Redux store
    const connections = useSelector((store) => store.connection);   //Get the Added data from redux store

    const fetchConnections = async () => {
        try {
            let res = await axios.get(BASE_URL + "/user/connection", { withCredentials: true })
            console.log(res?.data?.data);
            dispatch(addConnections(res?.data?.data))
        }
        catch (err) {
            console.log(err)
            if (err.response?.status === 404) {
                dispatch(addConnections([]));  // ← set empty array so UI shows "NO REQUEST FOUND"
            }
        }

    }

    useEffect(() => {
        fetchConnections()
    }, []);

    if (!connections) return;

    if (connections.length === 0) {
        return <div>
            <h1 className='text-xl'>NO CONNECTION FOUND!</h1>
        </div>
    }

    return (
        <div className='text-center mt-5'>
            <h1 className='text-4xl font-medium tracking-tighter'>Connections</h1>

            {/* when we have connections in an array list */}
            {connections.map((connect, index) => {
                const { firstName, lastName, photoUrl, age, gender } = connect;
                return (
                    <div key={index} className='flex  items-center m-4 p-4 border border-white/50 rounded-lg bg-base-300 md:w-1/2 mx-auto' >
                        <div>
                            <img className='w-20 h-20 rounded-full' src={photoUrl}></img>
                        </div>

                        <div className='text-left mx-4'>
                            <h2 className='text-xl font-medium'>{firstName + " " + lastName}</h2>
                            <h3>{gender + " " + age}</h3>
                        </div>
                    </div>
                )
            })}
        </div>

    )
}

export default Connections;