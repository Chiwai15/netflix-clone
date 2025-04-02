
import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'
import PreviewModal from '../PreviewModal/PreviewModal'


const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null); // Track hovered card
  const cardsRef = useRef();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  
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
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
    }
  };

  // useEffect(()=>{
    
  //   fetch(getApiUrl(category), options)
  //     .then(res => res.json())
  //     .then((res) => {        
  //       console.log(res)
  //       const shuffledResults = res.results.sort(() => Math.random() - 0.5);
  //       setApiData(shuffledResults)
  //     })
  //     .catch(err => console.error(err));
      
  //   // cardsRef.current.addEventListener('wheel', handleWeel);
  // }, [])

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getApiUrl(category), options);
        const data = await response.json();
        // const shuffledResults = data.results.sort(() => Math.random() - 0.5);
        setApiData(data.results);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []); // Refetch data if category changes

  useEffect(() => {
    const cardsContainer = cardsRef.current;
  
    const setInitialScrollPosition = () => {
      if (cardsContainer) {
        // Set scroll position to 1/4 of scrollWidth after any screen resize
        cardsContainer.scrollLeft = cardsContainer.scrollWidth / 4;
      }
    };
  
    setInitialScrollPosition(); // Set on mount
  
    const handleScroll = () => {
      if (!cardsContainer) return;
  
      // Reset scroll position when reaching ends
      if (cardsContainer.scrollLeft >= cardsContainer.scrollWidth / 2) {
        cardsContainer.scrollLeft = cardsContainer.scrollWidth / 4;
      } else if (cardsContainer.scrollLeft <= 0) {
        cardsContainer.scrollLeft = cardsContainer.scrollWidth / 4;
      }
    };
  
    const handleResize = () => {
      setInitialScrollPosition(); // Reapply correct scroll position on resize
    };
  
    cardsContainer?.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize); // Listen for resize events
  
    return () => {
      cardsContainer?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize); // Clean up on unmount
    };
  }, [cardsRef]); // Ref dependency, runs again if ref changes

  return (
    <div className="card-container">
      <div className='card-wrapper'>
        <h2 className='card-title'>{title?title:"Popular on Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>
          {apiData.concat(apiData).map((card, index)=>{
            return <Link 
              to={`/player/${card.id}`} 
              className="card"
              key={index}
              onMouseEnter={() => setHoveredCard(card.id)} // Set hovered card
              onMouseLeave={() => setHoveredCard(null)} // Clear on mouse leave
            >
              {/* Original Image */}
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                alt={card.original_title}
                className="card-image"
              />
              <p>{card.original_title}</p>

              {/* Hover Details */}
              {/* {hoveredCard === card.id && (
                  <PreviewModal
                    isOpen={true}
                    onClose={closeModal}
                    imageSrc={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                    title="Sample Modal"
                    className="preview-model"
                  />
              )} */}
            </Link>
          })}
        </div>
      </div>
    </div>
  )
  
}

export default TitleCards
