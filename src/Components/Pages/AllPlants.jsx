import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import AuthContext from '../../Context/AuthContext';

const AllPlants = () => {
    const { darkMode } = useContext(AuthContext);
    const allPlants = useLoaderData();
    const navigate = useNavigate();
    const [sortOption, setSortOption] = useState('');

    const sortedPlants = [...allPlants];
    if (sortOption === 'nextWatering') {
        sortedPlants.sort((a, b) => new Date(a.nextWateringDate) - new Date(b.nextWateringDate));
    } else if (sortOption === 'careLevel') {
        const careOrder = { Low: 1, Medium: 2, High: 3 };
        sortedPlants.sort((a, b) => careOrder[a.careLevel] - careOrder[b.careLevel]);
    }

    return (
        <div className={`p-4 md:p-8 min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className='text-center'>
                <h2 className={`text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                    All Plants
                </h2>
                <p className={`mb-6 md:mb-8 text-base md:text-lg max-w-4xl leading-relaxed mx-auto ${darkMode ? 'text-green-300' : 'text-green-900'}`}>
                    Welcome to your personal plant collection! Use the “View Details” button to dive deeper into each plant’s profile — learn about its ideal environment, care tips, and growth habits.
                </p>
            </div>

            {/* Sort Dropdown */}
            <div className="mb-6 flex justify-end">
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className={`px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 text-green-200 border-gray-600' : 'bg-white text-green-900 border-gray-300'}`}
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Sort your plants by upcoming watering or care level"
                >
                    <option value="">Sort By</option>
                    <option value="nextWatering">Next Watering Date</option>
                    <option value="careLevel">Care Level</option>
                </select>
            </div>

            {/* 🖥️ Desktop Table (hidden on mobile) */}
            <div className={`hidden sm:block w-full overflow-x-auto rounded-lg shadow-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}>
                <table className="w-full min-w-[640px] table-auto border-collapse text-sm md:text-base">
                    <thead className={`${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
                        <tr>
                            {['Picture', 'Plant Name', 'Category', 'Watering Frequency', 'Actions'].map((header) => (
                                <th
                                    key={header}
                                    className={`px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold uppercase tracking-wide ${darkMode ? 'text-green-300' : 'text-green-800'}`}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPlants && sortedPlants.length > 0 ? (
                            sortedPlants.map((plant) => (
                                <tr
                                    key={plant._id}
                                    className={`transition-colors duration-300 ${darkMode ? 'hover:bg-green-700' : 'hover:bg-green-50'}`}
                                >
                                    <td className="px-4 md:px-6 py-4">
                                        <img
                                            src={plant.image || 'https://via.placeholder.com/80?text=No+Image'}
                                            alt={plant.plantName}
                                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md shadow-sm"
                                            data-tooltip-id="tooltip"
                                            data-tooltip-content={`Plant: ${plant.plantName}`}
                                        />
                                    </td>
                                    <td className={`px-4 md:px-6 py-4 font-medium ${darkMode ? 'text-green-300' : 'text-green-900'}`}>
                                        {plant.plantName}
                                    </td>
                                    <td className={`px-4 md:px-6 py-4 ${darkMode ? 'text-green-400' : 'text-green-800'}`}>
                                        {plant.category}
                                    </td>
                                    <td
                                        className={`px-4 md:px-6 py-4 ${darkMode ? 'text-green-400' : 'text-green-800'}`}
                                        data-tooltip-id="tooltip"
                                        data-tooltip-content={`Water this plant ${plant.wateringFrequency}.`}
                                    >
                                        {plant.wateringFrequency}
                                    </td>
                                    <td className="px-4 md:px-6 py-4">
                                        <button
                                            onClick={() => navigate(`/plant-details/${plant._id}`)}
                                            className={`text-xs md:text-sm font-semibold cursor-pointer px-3 md:px-4 py-2 rounded-lg shadow-md transition duration-300 transform hover:scale-105 ${darkMode
                                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                                : 'bg-green-600 hover:bg-green-700 text-white'
                                                }`}
                                            data-tooltip-id="tooltip"
                                            data-tooltip-content="View detailed plant info"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className={`text-center py-8 text-sm md:text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    No plants found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 📱 Mobile Card View (only visible on mobile) */}
            <div className="block sm:hidden space-y-6 mt-6">
                {sortedPlants && sortedPlants.length > 0 ? (
                    sortedPlants.map((plant) => (
                        <div
                            key={plant._id}
                            className={`p-4 rounded-lg shadow-md border transition hover:shadow-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={plant.image || 'https://via.placeholder.com/80?text=No+Image'}
                                    alt={plant.plantName}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                                        {plant.plantName}
                                    </h3>
                                    <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-gray-600'}`}>
                                        {plant.category}
                                    </p>
                                    <p className={`text-sm mt-1 ${darkMode ? 'text-green-400' : 'text-gray-700'}`}>
                                        Watering: {plant.wateringFrequency}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 text-right">
                                <button
                                    onClick={() => navigate(`/plant-details/${plant._id}`)}
                                    className={`px-4 py-2 text-sm rounded-md shadow-md transition font-medium ${darkMode ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={`text-center text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        No plants found.
                    </p>
                )}
            </div>

            {/* Tooltip Component */}
            <ReactTooltip id="tooltip" place="top" effect="solid" className="z-50" />
        </div>
    );
};

export default AllPlants;
