import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import AuthContext from '../../Context/AuthContext';

const AllPlants = () => {
    const { darkMode } = useContext(AuthContext);
    const allPlants = useLoaderData();
    const navigate = useNavigate();
    const [sortOption, setSortOption] = useState('');

    // Sorting logic
    const sortedPlants = [...allPlants];

    if (sortOption === 'nextWatering') {
        sortedPlants.sort((a, b) => new Date(a.nextWateringDate) - new Date(b.nextWateringDate));
    } else if (sortOption === 'careLevel') {
        const careOrder = { Low: 1, Medium: 2, High: 3 };
        sortedPlants.sort((a, b) => careOrder[a.careLevel] - careOrder[b.careLevel]);
    }

    return (
        <div className={`p-8 min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className='text-center'>
                <h2 className={`text-3xl font-extrabold mb-6 ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                    All Plants
                </h2>
                <p
                    className={`mb-8 text-lg max-w-4xl leading-relaxed mx-auto ${darkMode ? 'text-green-300' : 'text-green-900'}`}
                >
                    Welcome to your personal plant collection! Below you’ll find a comprehensive list of all the
                    plants you’ve added, each with key details like its category and how often it needs watering.
                    Whether you’re a seasoned gardener or just starting out, this page helps you keep track of your
                    green friends and their care needs. Use the “View Details” button to dive deeper into each plant’s
                    profile — learn about its ideal environment, care tips, and growth habits. Keeping your plants
                    healthy and thriving has never been easier!
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

            {/* table section */}
            <div className={`overflow-x-auto rounded-lg shadow-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}>
                <table className="min-w-full table-auto border-collapse">
                    <thead className={`${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
                        <tr>
                            {['Picture', 'Plant Name', 'Category', 'Watering Frequency', 'Actions'].map((header) => (
                                <th
                                    key={header}
                                    className={`px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide ${darkMode ? 'text-green-300' : 'text-green-800'}`}
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
                                    <td className="px-6 py-4">
                                        <img
                                            src={plant.image || 'https://via.placeholder.com/80?text=No+Image'}
                                            alt={plant.plantName}
                                            className="w-20 h-20 object-cover rounded-md shadow-sm"
                                            data-tooltip-id="tooltip"
                                            data-tooltip-content={`Plant: ${plant.plantName}`}
                                        />
                                    </td>
                                    <td className={`${darkMode ? 'text-green-300' : 'text-green-900'} px-6 py-4 text-lg font-medium`}>
                                        {plant.plantName}
                                    </td>
                                    <td className={`${darkMode ? 'text-green-400' : 'text-green-800'} px-6 py-4`}>
                                        {plant.category}
                                    </td>
                                    <td
                                        className={`${darkMode ? 'text-green-400' : 'text-green-800'} px-6 py-4`}
                                        data-tooltip-id="tooltip"
                                        data-tooltip-content={`Water this plant ${plant.wateringFrequency}.`}
                                    >
                                        {plant.wateringFrequency}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => navigate(`/plant-details/${plant._id}`)}
                                            className={`text-sm font-semibold cursor-pointer px-4 py-2 rounded-lg shadow-md transition duration-300 transform hover:scale-105 ${darkMode
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
                                <td colSpan="5" className={`text-center py-8 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    No plants found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Tooltip Component */}
            <ReactTooltip id="tooltip" place="top" effect="solid" className="z-50" />
        </div>
    );
};

export default AllPlants;
