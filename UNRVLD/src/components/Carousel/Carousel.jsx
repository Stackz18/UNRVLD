import { useState } from 'react';
import "./Carousel.scss"

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
    const visibleCount = 3;
    const maxStart = slides.length - visibleCount;
    const [activeIndex, setActiveIndex] = useState(1);

    return (
        <div className='slider'>
            <div className='slider-container'>
                <div className='slide-track'
                    style={{
                        transform: `translateX(-${(startIndex * 100) / visibleCount}%)`,
                        width: `${(slides.length * 100) / visibleCount}%`,
                    }}
                >
                    {slides.map(({ img, heading, price }, id) => (
                        <div id={id + 1}
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
                            setActiveIndex(idx + 1);
                        }}
                        className={`dot ${idx === startIndex ? 'active' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}
