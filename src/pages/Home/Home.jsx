import React, { useState, useEffect }from 'react';
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import preview_banner from '../../assets/hero_banner.jpg'
import trailer from '../../assets/the_protector_trailer.mp4'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'
import TrailerBanner from '../../components/TrailerBanner/TrailerBanner'
import PreviewModal from '../../components/PreviewModal/PreviewModal';
import top_10_img from '../../assets/top_10.svg'
import {useNavigate} from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
        <div className="trailer-banner">
          <TrailerBanner 
            preview_banner={preview_banner}
            trailer={trailer}
          />
        </div>    
        <div className="info-container">
            <div className="caption">
              <img src={hero_title} alt="" className='caption-img'/>
              <div className="ranking-caption">
                <img src={top_10_img} alt="" className='top-10-img' />
                <p>#5 in Movies Today</p>
              </div>
              
              <p>Discovering his ties to a secret ancient order, a young
              man living in modern Istanbul embarks on a quest to save the
              city from an immortal enemy.</p>
              <div className="hero-btns">
                <button className='btn' onClick={() => {navigate('/player/45408')}}><img src={play_icon} alt=""/>Play</button>
                <button 
                  className='btn dark-btn' 
                  onClick={openModal}
                >
                  <img 
                    src={info_icon} 
                    alt="" 
                    onClick={openModal} 
                    style={{
                      transform: 'scale(1.3)',
                    }}/>
                    More Info
                </button>
                <PreviewModal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  imageSrc={preview_banner}
                  title="🚧 🚧 🚧 Construction 👷‍♂️"
                />
              </div>
            </div>
        </div>
        
      </div>
      <div className="more-cards">
        <TitleCards title={"Popular on Netflix"} category={"popular"}/>
        <TitleCards title={"Trending"} category={"trending"}/>
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"}/>
        <TitleCards title={"Upcoming"} category={"upcoming"}/>
        <TitleCards title={"Top Picks for You"} category={"now_playing"}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
