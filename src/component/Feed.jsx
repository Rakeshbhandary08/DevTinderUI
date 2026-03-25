import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import UserCard from './UserCard';

const Feed = () => {

  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if(feed) return;
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res?.data?.userFeed))
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  // Not loaded yet
  if(!feed) return null;

  // No users left in feed
  if(feed.length === 0) return (
    <div className='flex flex-col items-center justify-center mt-20 gap-3'>
      <div className='text-6xl'>🎉</div>
      <h1 className='text-2xl font-bold'>No more users!</h1>
      <p className='text-gray-400'>You have seen everyone for now.</p>
    </div>
  );

  return (
    <div className='mt-8 flex justify-center'>
      <UserCard user={feed[0]}/>   {/* ✅ always show top card */}
    </div>
  )
}

export default Feed;