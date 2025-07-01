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
    const [activeIndex, setActiveIndex] = useState(window.innerWidth < 992 ? 0 : 1);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

    useEffect(() => {
        const update = () => setIsMobile(window.innerWidth < 992);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const visibleCount = isMobile ? 1 : 3;
    const maxStart = slides.length - visibleCount;
    const transformPercent = isMobile
        ? startIndex * 64 / visibleCount
        : (startIndex * 100) / visibleCount;

    return (
        <section className='carousel'>
            <div className='row'>
                <div className='col-12 col-lg-6'>
                    <span className='subheading'>// Spring Summer 25</span>
                    <h2>Shake up your summer look</h2>
                </div>
                
                <div className='col-12 col-lg-6 justify-right-desktop'>
                    <a href="#grid" className='btn'>Shop the collection</a>
                </div>
            </div>

            <div className='slider'>
                <div className='slider-container'>
                    <div
                        className='slide-track'
                        style={{
                            transform: `translateX(-${transformPercent}%)`,
                            width: `${(slides.length * 100) / 3}%`,
                        }}
                    >
                        {slides.map(({ img, heading, price }, id) => (
                            <div
                                key={id}
                                className={`slide ${id === activeIndex ? 'active' : ''}`}
                                style={{
                                    backgroundImage: `url(${img})`,
                                    flex: `0 0 flexWidth`,
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
        </section>
    );
}
