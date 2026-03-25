// UserCard.jsx
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user;

  const handleSwipe = async (status) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));  // ✅ remove top card after swipe
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="card w-80 md:w-96 bg-base-300 shadow-xl">

      {/* Photo */}
      <figure>
        <img
          src={photoUrl}
          alt={firstName}
          className='w-full h-72 object-cover'
        />
      </figure>

      {/* Info */}
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p className='text-sm text-gray-400'>
          {age && gender && `${age} • ${gender}`}
        </p>
        {about && <p className='text-sm'>{about}</p>}

        {/* Skills */}
        {skills?.length > 0 && (
          <div className='flex flex-wrap gap-2 mt-2'>
            {skills.map((skill, i) => (
              <span key={i} className='badge badge-primary badge-sm'>{skill}</span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="card-actions justify-center gap-5 mt-4">
          <button
            className="btn btn-error px-8"
            onClick={() => handleSwipe("ignored")}>
            👎 Pass
          </button>
          <button
            className="btn btn-success px-8"
            onClick={() => handleSwipe("interested")}>
            👍 Like
          </button>
        </div>

      </div>
    </div>
  )
}

export default UserCard;