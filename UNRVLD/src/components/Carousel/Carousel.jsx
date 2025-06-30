import React, { useState, useEffect } from 'react';
import "./Carousel.scss";

const slides = [
  {
    img: '/src/assets/img/Carousel-1.png',
    heading: 'Headwear',
    price: 'From £24.00',
  },
  {
    img: '/src/assets/img/Carousel-2.png',
    heading: 'T-shirts',
    price: 'From £18.00',
  },
  {
    img: '/src/assets/img/Carousel-3.png',
    heading: 'Bottoms',
    price: 'From £30.00',
  },
  {
    img: '/src/assets/img/Carousel-1.png',
    heading: 'Headwear',
    price: 'From £24.00',
  }
];

export default function Carousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const visibleCount = isMobile ? 1 : 3;
  const maxStart = slides.length - visibleCount;

  // Calculate transform percent:
  // - On mobile, translate by 60% per slide
  // - Otherwise, normal calculation
  const transformPercent = isMobile 
    ? startIndex * 60 
    : (startIndex * 100) / visibleCount;

  return (
    <div className='slider'>
      <div className='slider-container'>
        <div
          className='slide-track'
          style={{
            transform: `translateX(-${transformPercent}%)`,
            width: `${(slides.length * 100) / visibleCount}%`,
          }}
        >
          {slides.map(({ img, heading, price }, id) => (
            <div
              key={id}
              className={`slide ${id === activeIndex ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${img})`,
              }}
            >
              <div className='slide-text'>
                <div className='heading'>{heading}</div>
                <div className='price'>{price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="carousel-dots">
        {Array.from({ length: maxStart + 1 }).map((_, idx) => (
          <span
            key={idx}
            onClick={() => {
              setStartIndex(idx);
              setActiveIndex(idx + Math.floor(visibleCount / 2));
            }}
            className={`dot ${idx === startIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
