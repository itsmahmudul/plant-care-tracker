import React from 'react';
import Banner from '../HomeComponents/Banner';

const Home = () => {
    return (
        <div>
            <div>
                <h1 className='text-2xl md:text-6xl font-bold text-center mt-10 text-green-700'>Feel The Nature</h1>
            <p className='text-green-600 text-sm font-semibold text-center'>
                Plants are vital for life, producing oxygen, purifying air, and supporting ecosystems. They provide food, medicine, and shelter while enhancing the beauty of our environment. Through photosynthesis, plants help regulate the climate and sustain all living beings. From forests to houseplants, their presence nurtures both nature and people, making them essential to our health and the planet’s balance.
            </p>
            </div>
            <div>
                <Banner />
            </div>
        </div>
    );
};

export default Home;