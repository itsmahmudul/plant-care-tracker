import React, { useContext } from 'react';
import Banner from '../HomeComponents/Banner';
import { useLoaderData } from 'react-router';
import PlantCard from '../HomeComponents/PlantCard';
import AuthContext from '../../Context/AuthContext';

const Home = () => {
    const { darkMode } = useContext(AuthContext);
    const plants = useLoaderData();

    return (
        <div className={`${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
            {/* Hero Section */}
            <section className={`text-center ${darkMode ? 'bg-gradient-to-b from-gray-700 to-gray-800' : 'bg-gradient-to-b from-green-50 to-white'}`}>
                <h1 className={`text-3xl md:text-6xl font-extrabold ${darkMode ? 'text-green-300' : 'text-green-700'} mb-6`}>
                    Feel The Nature
                </h1>
                <p className={`max-w-3xl mx-auto text-sm md:text-base font-medium leading-relaxed ${darkMode ? 'text-gray-300' : 'text-green-600'}`}>
                    Plants are vital for life, producing oxygen, purifying air, and supporting ecosystems.
                    They provide food, medicine, and shelter while enhancing the beauty of our environment.
                    Through photosynthesis, plants help regulate the climate and sustain all living beings.
                    From forests to houseplants, their presence nurtures both nature and people, making them
                    essential to our health and the planet’s balance.
                </p>
            </section>

            {/* Banner Section */}
            <section className="px-4 md:px-12">
                <Banner />
            </section>

            {/* Plants Grid */}
            <section className="max-w-7xl mx-auto my-12 rounded-t-3xl">
                <h2 className={`text-xl md:text-3xl font-semibold text-center mb-10 ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
                    Explore Our Plant Collection
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {plants.map((plant) => (
                        <PlantCard key={plant._id} plant={plant} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
