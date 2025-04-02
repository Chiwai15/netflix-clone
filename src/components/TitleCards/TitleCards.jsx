
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
  const retryCount = useRef(0);

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

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(options);
        const response = await fetch(getApiUrl(category), options);
        const data = await response.json();
        // const shuffledResults = data.results.sort(() => Math.random() - 0.5);
        console.log(data.results);
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

  const handleError = (e) => {
    const img = e.currentTarget; // capture reference early
  
    if (retryCount.current < 2) {
      retryCount.current += 1;
  
      const originalSrc = img.src;
      img.src = '';
  
      setTimeout(() => {
        if (img) {
          img.src = originalSrc;
        }
      }, 1000);
    } else {
      img.onerror = null;
      img.src = '/fallback.jpg';
    }
  };

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
                src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
                alt={card.original_title}
                className="card-image"
              />
              <p>{card.title?card.title.length>17?card.title.slice(0,17)+"...":card.title:card.original_name}</p>

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
