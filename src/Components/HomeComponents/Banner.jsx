import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const events = [
    {
        image: "https://i.ibb.co/GvW0C1qR/Cactus-inflorit.jpg",
        title: "A cactus is a member of the plant family Cactaceae a family of the order Caryophyllales comprising about 127 genera with some 1,750 known species."
    },
    {
        image: "https://i.ibb.co/hFpGrKVT/The-Beauty-of-Natural.png",
    },
    {
        image: "https://i.ibb.co/W44ybv1M/Conserve-Plants-EUFORGEN-newsletter.jpg",
    },
];

const Banner = () => {
    return (
        <div className="relative w-full max-w-5xl mx-auto mt-10 rounded-2xl overflow-hidden border border-gray-100">



            <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={3000}
                transitionTime={1000}
                swipeable
                emulateTouch
                showArrows={true}
                className="rounded-2xl"
            >
                {events.map((event, index) => (
                    <div key={index} className="relative w-full h-[400px] sm:h-[500px] overflow-hidden">
                        <img
                            src={event.image}
                            srcSet={`
                             ${event.image}?w=400 400w,
                             ${event.image}?w=768 768w,
                             ${event.image}?w=1280 1280w
                              `}
                            sizes="(max-width: 640px) 400px, (max-width: 1024px) 768px, 1280px"
                            alt={`Event ${index + 1}`}
                            className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-1000"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="text-2xl sm:text-3xl font-bold drop-shadow-md">{event.title}</h3>
                        </div>
                    </div>

                ))}
            </Carousel>
        </div>
    );
};

export default Banner;