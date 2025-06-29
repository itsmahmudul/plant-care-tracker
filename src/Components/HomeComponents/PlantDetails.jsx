import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router';
import AuthContext from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const MAX_RECENT = 6;

const PlantDetails = () => {
    const { loading, darkMode } = useContext(AuthContext);
    const { plantId } = useParams();
    const plants = useLoaderData();
    const navigate = useNavigate();

    const plant = plants.find(p => p._id === plantId);
    const [recentPlants, setRecentPlants] = useState([]);

    useEffect(() => {
        if (plant) {
            let stored = JSON.parse(localStorage.getItem("recentPlants")) || [];
            stored = stored.filter(p => p._id !== plant._id);
            stored.unshift(plant);
            if (stored.length > MAX_RECENT) stored = stored.slice(0, MAX_RECENT);
            localStorage.setItem("recentPlants", JSON.stringify(stored));
            setRecentPlants(stored.filter(p => p._id !== plant._id)); // exclude current
        }
    }, [plant]);

    const handleRemove = (id) => {
        const updated = recentPlants.filter(p => p._id !== id);
        setRecentPlants(updated);
        localStorage.setItem("recentPlants", JSON.stringify([plant, ...updated].slice(0, MAX_RECENT)));
    };

    if (loading) {
        return (
            <div className={clsx("flex justify-center items-center h-screen", darkMode && "bg-gray-900 text-white")}>
                <p className="text-lg">
                    Loading plant details...
                    <span className="loading loading-spinner text-success ml-2"></span>
                </p>
            </div>
        );
    }

    if (!plant) {
        return (
            <div className={clsx("flex justify-center items-center h-screen text-xl", darkMode ? "text-red-400 bg-gray-900" : "text-red-500")}>
                Plant not found.
            </div>
        );
    }

    return (
        <div className={clsx("min-h-screen py-10 px-4", darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-tr from-green-50 to-white")}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={clsx("max-w-6xl mx-auto p-8 rounded-3xl shadow-2xl", darkMode ? "bg-gray-800" : "bg-white")}
            >
                {/* Plant Details */}
                <div className="flex flex-col lg:flex-row gap-10 items-center">
                    <motion.img
                        src={plant.image}
                        alt={plant.plantName}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="w-full lg:w-1/2 h-[400px] object-cover rounded-2xl shadow-lg"
                    />
                    <div className="flex-1 space-y-6">
                        <h2 className={clsx("text-4xl font-bold mb-2", darkMode ? "text-green-300" : "text-green-800")}>
                            {plant.plantName.trim()}
                        </h2>
                        <span className={clsx("inline-block text-xs font-semibold px-3 py-1 rounded-full",
                            darkMode ? "bg-green-900 text-green-200" : "bg-green-200 text-green-800"
                        )}>
                            {plant.category}
                        </span>

                        <p className={clsx("text-lg leading-relaxed", darkMode ? "text-gray-300" : "text-gray-700")}>
                            {plant.description.trim()}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-base">
                            <Detail label="Care Level" value={plant.careLevel} darkMode={darkMode} />
                            <Detail label="Watering Frequency" value={plant.wateringFrequency} darkMode={darkMode} />
                            <Detail label="Last Watered" value={plant.lastWateredDate} darkMode={darkMode} />
                            <Detail label="Next Watering" value={plant.nextWateringDate} darkMode={darkMode} />
                            <Detail label="Health Status" value={plant.healthStatus} darkMode={darkMode} />
                        </div>

                        <div className="pt-4 text-sm">
                            <p>
                                <span className="font-semibold">Added by:</span> {plant.userName} ({plant.userEmail})
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Explore More Button */}
            <div className="text-center mt-8">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/')}
                    className={clsx(
                        "px-6 cursor-pointer py-3 rounded-full font-semibold shadow-md transition-all duration-300",
                        darkMode ? "bg-green-700 text-white hover:bg-green-600" : "bg-green-500 text-white hover:bg-green-600"
                    )}
                >
                    🌿 Explore More Plants
                </motion.button>
            </div>

            {/* Recently Viewed - Grid */}
            {recentPlants.length > 0 && (
                <div className="mt-16 max-w-6xl mx-auto">
                    <h3 className={clsx("text-2xl font-bold mb-6", darkMode ? "text-green-300" : "text-green-800")}>
                        Recently Viewed Plants
                    </h3>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {recentPlants.map(p => (
                            <div
                                key={p._id}
                                className={clsx(
                                    "relative p-4 rounded-xl shadow-md transition-all hover:shadow-xl cursor-pointer group",
                                    darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                                )}
                            >
                                <img
                                    src={p.image}
                                    alt={p.plantName}
                                    onClick={() => navigate(`/plant-details/${p._id}`)}
                                    className="h-48 w-full object-cover rounded-lg mb-3"
                                />
                                <h4 className="text-lg font-semibold">{p.plantName}</h4>
                                <p className="text-sm opacity-80">{p.category}</p>

                                <button
                                    onClick={() => handleRemove(p._id)}
                                    className={clsx(
                                        "absolute top-2 right-2 text-xs px-2 py-1 rounded-md font-medium",
                                        darkMode
                                            ? "bg-red-600 text-white hover:bg-red-500"
                                            : "bg-red-100 text-red-600 hover:bg-red-200"
                                    )}
                                >
                                    ✕ Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const Detail = ({ label, value, darkMode }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className={clsx(
            "p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow",
            darkMode ? "bg-gray-700 text-gray-200" : "bg-green-100 text-gray-800"
        )}
    >
        <div className={clsx("text-sm font-semibold", darkMode ? "text-green-300" : "text-green-700")}>
            {label}
        </div>
        <div>{value}</div>
    </motion.div>
);

export default PlantDetails;
