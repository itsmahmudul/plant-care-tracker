import React, { useContext, useState } from 'react';
import Banner from '../HomeComponents/Banner';
import { useLoaderData } from 'react-router';
import PlantCard from '../HomeComponents/PlantCard';
import AuthContext from '../../Context/AuthContext';
import Lottie from "lottie-react";
import blogAnimation from "../../assets/Blog.json";

import { motion } from 'framer-motion';
import {
    Leaf, BookOpen, Globe, Droplet,
    Sun, Flower2,
    Sprout
} from 'lucide-react';
import { Tooltip as ReactTooltip } from 'react-tooltip';


const tips = [
    {
        icon: Droplet,
        colorLight: "bg-green-200 text-green-700",
        colorDark: "bg-green-700 text-green-200",
        text: "Water only when the soil feels dry about an inch below the surface."
    },
    {
        icon: Sun,
        colorLight: "bg-yellow-200 text-yellow-700",
        colorDark: "bg-yellow-700 text-yellow-200",
        text: "Place your plant in an area with appropriate light—some prefer bright indirect light, others low light."
    },
    {
        icon: Leaf,
        colorLight: "bg-green-200 text-green-700",
        colorDark: "bg-green-700 text-green-200",
        text: "Wipe leaves occasionally to remove dust and improve photosynthesis."
    },
    {
        icon: Flower2,
        colorLight: "bg-pink-200 text-pink-700",
        colorDark: "bg-pink-700 text-pink-200",
        text: "Repot once a year to refresh the soil and accommodate root growth."
    },
    {
        icon: Sprout,
        colorLight: "bg-lime-200 text-lime-700",
        colorDark: "bg-lime-700 text-lime-200",
        text: "Use fertilizer during the growing season to keep your plant healthy and lush."
    }
];

const Home = () => {

    const [showAll, setShowAll] = useState(false);

    const { darkMode } = useContext(AuthContext);
    const plants = useLoaderData();
    const displayPlants = showAll ? plants : plants.slice(0, 8)

    return (
        <div className={`${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
            {/* Hero Section */}
            <section className={`text-center ${darkMode ? 'bg-gradient-to-b from-gray-700 to-gray-800' : 'bg-gradient-to-b from-green-50 to-white'}`}>
                <h1 className={`text-3xl md:text-6xl font-extrabold ${darkMode ? 'text-green-300' : 'text-green-700'} pt-5 mb-6`}>
                    Feel The Nature
                </h1>
                <p className={`max-w-3xl mx-auto text-sm md:text-base font-medium leading-relaxed ${darkMode ? 'text-gray-300' : 'text-green-600'}`}>
                    Plants are vital for life, producing oxygen, purifying air, and supporting ecosystems...
                </p>
            </section>

            {/* Banner Section */}
            <section className="px-4 md:px-12">
                <Banner />
            </section>


            {/* Our Mission Section */}
            <section className="max-w-6xl mx-auto my-16 px-4 md:px-0">
                <h2 className={`text-2xl md:text-4xl font-bold text-center mb-12 ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
                    Our Mission
                </h2>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {/* Mission Card */}
                    {[
                        {
                            id: 'mission-1',
                            title: 'Inspire Greener Living',
                            desc: 'Helping individuals cultivate a sustainable lifestyle through the joy of plant care.',
                            icon: <Leaf size={40} />,
                            tooltip: 'Encouraging a deeper bond with the natural world',
                            delay: 0,
                        },
                        {
                            id: 'mission-2',
                            title: 'Promote Education',
                            desc: 'Empowering our community with tips and tutorials to keep their plants thriving.',
                            icon: <BookOpen size={40} />,
                            tooltip: 'Knowledge is the root of successful plant care',
                            delay: 0.2,
                        },
                        {
                            id: 'mission-3',
                            title: 'Support Sustainability',
                            desc: 'Encouraging eco-conscious choices that benefit both homes and the Earth.',
                            icon: <Globe size={40} />,
                            tooltip: 'Plant care contributes to a healthier planet',
                            delay: 0.4,
                        },
                    ].map(({ id, title, desc, icon, tooltip, delay }) => (
                        <motion.div
                            key={id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay }}
                            viewport={{ once: true }}
                            data-tooltip-id={id}
                            data-tooltip-content={tooltip}
                            className={`relative p-6 rounded-2xl border shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl
    ${darkMode
                                    ? 'bg-white/10 backdrop-blur-lg border-gray-600'
                                    : 'bg-white/60 backdrop-blur-xl border-green-100'
                                }`}
                        >
                            {/* Centered Icon */}
                            <motion.div
                                whileHover={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 0.6 }}
                                className="flex justify-center items-center mb-4 text-green-600 dark:text-green-300"
                            >
                                {icon}
                            </motion.div>

                            <h3 className="text-xl font-semibold mb-2">{title}</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{desc}</p>
                        </motion.div>

                    ))}
                </div>

                {/* Tooltips */}
                <ReactTooltip id="mission-1" place="top" effect="solid" />
                <ReactTooltip id="mission-2" place="top" effect="solid" />
                <ReactTooltip id="mission-3" place="top" effect="solid" />
            </section>


            {/* Plants Grid */}
            <section className="max-w-6xl mx-auto my-12 rounded-t-3xl">
                <h2 className={`text-xl md:text-3xl font-semibold text-center mb-10 ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
                    Explore Our Plant Collection
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayPlants.map((plant) => (
                        <div
                            key={plant._id}
                            data-tooltip-id={`tooltip-${plant._id}`}
                            data-tooltip-content={plant.plantName || 'No scientific name available'}
                        >
                            <PlantCard plant={plant} />
                            <ReactTooltip
                                id={`tooltip-${plant._id}`}
                                place="top"
                                type={darkMode ? 'light' : 'dark'}
                                effect="solid"
                                delayShow={200}
                            />
                        </div>
                    ))}
                </div>

                {/* Show More / Show Less Button */}
                {plants.length > 8 && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className={`mt-10 cursor-pointer px-8 py-4 rounded-full text-lg font-semibold transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-1
    ${darkMode
                                    ? 'bg-gradient-to-r from-green-700 to-green-900 hover:from-green-800 hover:to-green-950 text-white'
                                    : 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white'}
  `}
                        >
                            {showAll ? '🌿 Show Less' : '🌱 Show More'}
                        </button>
                    </div>
                )}
            </section>

            {/* Plant Care Tips Section */}
            <motion.section
                className={`max-w-6xl mx-auto my-24 px-8 py-12 rounded-3xl shadow-xl transition-colors duration-500 flex flex-col md:flex-row items-center md:items-start gap-12 ${darkMode ? "bg-gray-900" : "bg-white"
                    }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                {/* Left side: tips */}
                <div className="md:w-1/2 w-full">
                    <motion.h2
                        className={`text-4xl font-extrabold mb-12 tracking-wide ${darkMode ? "text-green-300" : "text-green-800"
                            }`}
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Simple Tips for Plant Care
                    </motion.h2>

                    <motion.ul
                        className="flex flex-col gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.2 }}
                        variants={{ hidden: {}, visible: {} }}
                    >
                        {tips.map(({ icon: Icon, colorLight, colorDark, text }, idx) => (
                            <motion.li
                                key={idx}
                                className={`flex items-center gap-6 p-5 rounded-2xl cursor-default transition-all duration-300 hover:shadow-lg ${darkMode ? "hover:bg-gray-800" : "hover:bg-green-50"
                                    }`}
                                variants={{
                                    hidden: { opacity: 0, x: -30 },
                                    visible: { opacity: 1, x: 0 },
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <div
                                    className={`flex items-center justify-center w-14 h-14 rounded-full ${darkMode ? colorDark : colorLight
                                        }`}
                                >
                                    <Icon className="w-7 h-7" />
                                </div>
                                <p
                                    className={`text-lg leading-relaxed font-medium ${darkMode ? "text-gray-300" : "text-gray-800"
                                        }`}
                                >
                                    {text}
                                </p>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>

                {/* Right side: photo */}
                <div className="md:w-1/2 my-auto w-full flex justify-center items-center">
                    <img
                        src="https://i.ibb.co/PGjWQFLh/shutterstock-1948724596-min.jpg"
                        alt="Plant care"
                        className="rounded-3xl shadow-lg max-w-full h-auto object-cover"
                    />
                </div>

            </motion.section>


            {/* Blog Section */}

            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`max-w-6xl mx-auto my-24 px-6 py-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-12 transition-colors duration-500
        ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'}`}
            >
                {/* Left: Lottie Animation */}
                <div className="md:w-1/2 w-full flex justify-center items-center">
                    <Lottie animationData={blogAnimation} loop={true} className="w-full max-w-md" />
                </div>

                {/* Right: Blog Info */}
                <div className="md:w-1/2 w-full">
                    {/* Intro Badge */}
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className={`inline-block px-4 py-1 mb-4 rounded-full text-sm font-medium tracking-wide
                ${darkMode ? 'bg-orange-700 text-orange-100' : 'bg-orange-100 text-orange-700'}`}
                    >
                        🌱 Our Blog
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        From Our Plant Blog
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-lg mb-6 leading-relaxed"
                    >
                        Discover seasonal plant care tips, indoor gardening inspiration, and expert advice to help your greenery thrive.
                    </motion.p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        {['Indoor Plants', 'Watering', 'Lighting', 'Soil Tips', 'Fertilizing'].map((tag, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                                className={`px-3 py-1 rounded-full text-sm font-medium cursor-default
                        ${darkMode ? 'bg-orange-800 text-orange-200 hover:bg-orange-700' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
                            >
                                #{tag}
                            </motion.span>
                        ))}
                    </div>

                    {/* Featured Blog Previews */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        {[1, 2, 3].map((_, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(249, 115, 22, 0.3)" }} // orange shadow
                                transition={{ type: "spring", stiffness: 300 }}
                                className={`p-5 rounded-xl border cursor-pointer select-none
                        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-orange-200'}`}
                            >
                                <h3 className="font-semibold text-lg mb-2 text-orange-600 dark:text-orange-300">
                                    🌼 5 Tips for Thriving Indoor Plants
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-700 dark:text-orange-200">
                                    Learn how to position, water, and care for your indoor greens like a pro.
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                        whileHover="hover"
                        className={`group px-6 py-3 rounded-full text-lg font-semibold shadow-md flex items-center gap-2
                ${darkMode ? 'bg-orange-700 text-orange-100 hover:bg-orange-600' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                    >
                        Read Our Blog
                        <motion.span
                            variants={{
                                hover: { x: 6 },
                                rest: { x: 0 },
                            }}
                            initial="rest"
                            animate="rest"
                            className="inline-block transition-transform duration-300"
                        >
                            →
                        </motion.span>
                    </motion.button>
                </div>
            </motion.section>





        </div>
    );
};

export default Home;
