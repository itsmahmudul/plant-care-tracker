import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const events = [
    {
        image: "https://i.ibb.co/GvW0C1qR/Cactus-inflorit.jpg",
        title:"A cactus is a member of the plant family Cactaceae a family of the order Caryophyllales comprising about 127 genera with some 1,750 known species."
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

            <div className="absolute z-10 top-1/2 left-4 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full cursor-pointer swiper-button-prev">
                <ChevronLeft />
            </div>
            <div className="absolute z-10 top-1/2 right-4 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full cursor-pointer swiper-button-next">
                <ChevronRight />
            </div>

            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                pagination={{ clickable: true }}
                effect="fade"
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
                className="rounded-2xl"
            >
                {events.map((event, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-[400px] sm:h-[500px] w-full overflow-hidden">
                            <img
                                src={event.image}
                                alt={`Event ${index + 1}`}
                                className="w-full h-[500px] object-cover scale-100 hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-2xl sm:text-3xl font-bold drop-shadow-md">{event.title}</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;