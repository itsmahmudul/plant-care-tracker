import React, { useContext } from 'react';
import Banner from '../HomeComponents/Banner';
import { useLoaderData } from 'react-router';
import PlantCard from '../HomeComponents/PlantCard';
import AuthContext from '../../Context/AuthContext';
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
    const { darkMode } = useContext(AuthContext);
    const plants = useLoaderData();

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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {plants.map((plant) => (
                        <div key={plant._id} data-tooltip-id={`tooltip-${plant._id}`} data-tooltip-content={plant.plantName || 'No scientific name available'}>
                            <PlantCard plant={plant} />
                            <ReactTooltip id={`tooltip-${plant._id}`} place="top" type={darkMode ? 'light' : 'dark'} effect="solid" delayShow={200} />
                        </div>
                    ))}
                </div>
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
                <div className="md:w-1/2 w-full flex justify-center">
                    <img
                        src="https://i.ibb.co/PGjWQFLh/shutterstock-1948724596-min.jpg"
                        alt="Plant care"
                        className="rounded-3xl shadow-lg max-w-full h-auto object-cover"
                    />
                </div>
            </motion.section>

        </div>
    );
};

export default Home;
