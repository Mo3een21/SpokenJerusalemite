"use client";
import React, { useState } from 'react';
import '/app/chance/styles.css';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const images = [
    "/assets/opportunities/Partners/1.jpg",
    "/assets/opportunities/Partners/2.png",
    "/assets/opportunities/Partners/3.png",
    "/assets/opportunities/Partners/4.jpg",
    "/assets/opportunities/Partners/5.png",
    "/assets/opportunities/Partners/6.jpg",
    "/assets/opportunities/Partners/7.jpg",
    "/assets/opportunities/Partners/8.jpg",
    "/assets/opportunities/Partners/9.png",
    "/assets/opportunities/Partners/10.png",
    "/assets/opportunities/Partners/11.png",
    "/assets/opportunities/Partners/12.jpg",    
    "/assets/opportunities/Partners/13.png",
    "/assets/opportunities/Partners/14.png",
    "/assets/opportunities/Partners/15.png",
    "/assets/opportunities/Partners/16.jpg",
    "/assets/opportunities/Partners/17.png",
    "/assets/opportunities/Partners/18.png",
    "/assets/opportunities/Partners/19.webp",
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleMouseEnter = (side) => {
    if (side === 'left') setShowLeftButton(true);
    if (side === 'right') setShowRightButton(true);
  };

  const handleMouseLeave = () => {
    setShowLeftButton(false);
    setShowRightButton(false);
  };

  // Ensure that the visible images array wraps around correctly
  const visibleImages = images.slice(currentIndex, currentIndex + 12);
  if (visibleImages.length < 12) {
    visibleImages.push(...images.slice(0, 12 - visibleImages.length));
  }

  return (
    <div 
      className="slider-container"
      onMouseMove={(e) => {
        const { clientX, currentTarget } = e;
        const { left, right } = currentTarget.getBoundingClientRect();
        const width = right - left;
        if (clientX - left < width * 0.2) {
          handleMouseEnter('left');
        } else if (right - clientX < width * 0.2) {
          handleMouseEnter('right');
        } else {
          handleMouseLeave();
        }
      }}
      onMouseLeave={handleMouseLeave}
    >
      {showLeftButton && (
        <button className="slider-button left" onClick={handlePrev}>
          &gt; {/* Changed from &lt; to &gt; */}
        </button>
      )}
      <div className="slider-content">
        {visibleImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Opportunity ${currentIndex + index + 1}`}
            className="slider-image"
          />
        ))}
      </div>
      {showRightButton && (
        <button className="slider-button right" onClick={handleNext}>
          &lt; {/* Changed from &gt; to &lt; */}
        </button>
      )}
    </div>
  );
};

export default Slider;
