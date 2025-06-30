import { useState } from 'react';

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
    }
];

export default function Carousel() {
    const [startIndex] = useState(0);
    const visibleCount = 3;

    return (
        <div className='slider' style={{ width: '90%', margin: 'auto', position: 'relative' }}>
            <div
                style={{
                    display: 'flex',
                    overflow: 'hidden',
                }}
            >
                <div className='slide-track'
                    style={{
                        display: 'flex',
                        transform: `translateX(-${(startIndex * 100) / visibleCount}%)`,
                        width: `${(slides.length * 100) / visibleCount}%`,
                    }}
                >
                    {slides.map(({ img, heading, price }, id) => (
                        <div className='slide' id={id + 1}
                            key={id}
                            style={{
                                flex: `0 0 ${100 / slides.length}%`,
                                position: 'relative',
                                height: '600px',
                                backgroundImage: `url(${img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                color: '#000',
                                padding: '10px',
                            }}
                        >
                            <div className='heading'>{heading}</div>
                            <div className='price'>{price}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
