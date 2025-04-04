import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams} from 'react-router-dom'

const Player = () => {

  const {id} = useParams(); // use id from router
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => {
        console.log("Fetched video data:", res);
        if (res.results && res.results.length > 0 && res.results[0].key) {
            setApiData(res.results[0]);
        } else {
            console.warn("No valid video found, using fallback.");
            setApiData({
                name: "Trailer not available",
                key: "", // No video key, so iframe won't render anything
                published_at: "",
                type: ""
            })
        }}).catch(err => console.error(err));
  }, [])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => navigate('/')} />
      {apiData.key ? (
        <div className='player-wrapper'>
            <iframe
                width="90%"
                height="90%"
                src={`https://www.youtube-nocookie.com/embed/${apiData.key}?autoplay=1&showinfo=0&modestbranding=1&controls=0&rel=0`}
                title="trailer"
                allow="autoplay"
                allowFullScreen
                frameBorder="0" 
                controls="0" 
                modestbranding="true" 
            />
            <div className="player-info">
                <p>{apiData.published_at.slice(0,10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
        ) : (
        <p className="fallback-message">Trailer not available.</p>
       )}
    </div>
  )
}

export default Player
