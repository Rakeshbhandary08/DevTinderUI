import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const requests = useSelector((store) => store.request)
    const dispatch = useDispatch();

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests", { withCredentials: true })

            console.log(res?.data);

            dispatch(addRequest(res?.data?.connectionRequest))

        }
        catch (err) {
            if (err.response?.status === 404) {
                dispatch(addRequest([]));  // ← set empty array so UI shows "NO REQUEST FOUND"
            }
        }
    }

    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true })
            dispatch(removeRequest(_id))
        }
        catch (err) {
            console.log(err)
        }
    }

    function closeDropDown() {
        document.activeElement.blur()
    }

    useEffect(() => {
        fetchRequests()
    }, []);

    if (!requests) return;

    if (requests.length === 0) {
        return <div>
            <h1 className='text-center text-xl text-red-600 mt-3'>NO REQUEST FOUND!</h1>
        </div>
    }

    return (
        <div className='text-center mt-5'>
            <h1 className='text-4xl font-medium tracking-tighter'>Connections Request</h1>

            {/* when we have connections in an array list */}
            {requests.map((request, index) => {
                const { _id, firstName, lastName, photoUrl, age, gender } = request.senderId;
                return (
                    <div key={_id} className='flex  items-center m-4 p-4 border border-white/50 rounded-lg bg-base-300 md:w-1/2 mx-auto' onClick={() => closeDropDown()} >
                        <div>
                            <img className='w-20 h-20 rounded-full object-cover' src={photoUrl}></img>
                        </div>

                        <div className='text-left mx-4'>
                            <h2 className='text-xl font-medium'>{firstName + " " + lastName}</h2>
                            <h3>{gender + " " + age}</h3>
                        </div>
                        <div className='flex gap-2 mx-auto mr-1'>
                            <button className="btn" onClick={() => reviewRequest("rejected", request._id)}>
                                Reject ✘
                            </button>
                            <button className="btn bg-green-700" onClick={() => reviewRequest("accepted", request._id)}>
                                Accept
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>


    )
}

export default Requests;