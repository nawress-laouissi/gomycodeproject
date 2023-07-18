import React, { useState } from 'react';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

function Slider() {
  const [slide, setSlide] = useState(0);
  const data = [
    'https://i.pinimg.com/564x/c9/b2/d3/c9b2d3136c9ee0b60aecd400b7b8f281.jpg',
    'https://i.pinimg.com/564x/a7/e5/96/a7e5966decb1503abd550a3e82027bb3.jpg',
    'https://i.pinimg.com/564x/9e/d2/9a/9ed29a6ae98e0fe95cdcb7e12d851c32.jpg',
    'https://i.pinimg.com/564x/72/1e/77/721e77d1a108b4cb9d4225da9342fa81.jpg',
  ];
  const previousSlide = () => {
    setSlide(slide === 0 ? 3 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setSlide(slide === 3 ? 0 : (prev) => prev + 1);
  };
  return (
    <div className="slider">
      <div
        className="container"
        style={{ transform: `translateX(-${slide * 55}vw)` }}
      >
        <img src={data[0]} alt="" className="sliderImg"></img>
        <img src={data[1]} alt="" className="sliderImg"></img>
        <img src={data[2]} alt="" className="sliderImg"></img>
        <img src={data[3]} alt="" className="sliderImg"></img>
      </div>
      <div className="icons">
        <div className="icon" onClick={previousSlide}>
          <ArrowBackIosOutlinedIcon />
        </div>
        <div className="icon">
          <ArrowForwardIosOutlinedIcon onClick={nextSlide} />
        </div>
      </div>
    </div>
  );
}

export default Slider;
