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
import Modal from '../../components/PreviewModal/PreviewModal';

const Home = () => {
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
        <div className="hero-caption">
          <img src={hero_title} alt="" className='caption-img'/>
          <p>Discovering his ties to a secret ancient order, a young
          man living in modern Istanbul embarks on a quest to save the
          city from an immortal enemy.</p>
          <div className="hero-btns">
            <button className='btn'><img src={play_icon} alt="" />Play</button>
            <button className='btn dark-btn' onClick={openModal}><img src={info_icon} alt="" onClick={openModal}/>More Info</button>
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              imageSrc="https://via.placeholder.com/500x300"
              title="Sample Modal"
            >
              This is a modal content. You can add any description here.
            </Modal>
          </div>
        </div>
        
      </div>
      <div className="more-cards">
      <TitleCards title={"Popular on Netflix"} category={"popular"}/>
      <TitleCards title={"Trending"} category={"trending"}/>
      <TitleCards title={"Blockbuster Movies"} category={"top_rated"}/>
      <TitleCards title={"Upcoming"} category={"upcoming"}/>
      <TitleCards title={"Top Picks for You"} category={"now_playing"}/>
      <Footer/>
      </div>
    </div>
  )
}

export default Home
