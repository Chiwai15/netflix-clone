
import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  function getApiUrl(category) {
    if (category === "trending") {
      return "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
    } else {
      return `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`;
    }
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ${process.env.TMDB_API_ACCESS_TOKEN}'
    }
  };

  const handleWeel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{
    
    fetch(getApiUrl(category), options)
      .then(res => res.json())
      .then((res) => {        
        const shuffledResults = res.results.sort(() => Math.random() - 0.5);
        setApiData(shuffledResults)
      })
      .catch(err => console.error(err));
      
    // cardsRef.current.addEventListener('wheel', handleWeel);
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500/` + card.backdrop_path} alt="" onClick={()=>{}}/>
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
  
}

export default TitleCards
