import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AlertCircle } from 'lucide-react';
import AuthContext from '../../Context/AuthContext';

const Dashboard = () => {
    const [plants, setPlants] = useState([]);
    const { darkMode } = useContext(AuthContext);

    useEffect(() => {
        axios.get('https://plant-care-tracker-omega.vercel.app/plants')
            .then(res => setPlants(res.data))
            .catch(err => console.error(err));
    }, []);

    const today = new Date().toISOString().split('T')[0];
    const wateringDue = plants.filter(plant => plant.nextWateringDate === today);
    const recentlyWatered = plants.filter(plant => plant.lastWateredDate === today);

    const categoryCount = plants.reduce((acc, plant) => {
        acc[plant.category] = (acc[plant.category] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className={`p-6 min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
            <h2 className="text-3xl font-bold mb-4">Care Dashboard</h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className={`rounded-xl p-4 shadow ${darkMode ? 'bg-green-900 text-green-100' : 'bg-green-100'}`}>
                    <h3 className="text-lg font-semibold">Total Plants</h3>
                    <p className="text-2xl">{plants.length}</p>
                </div>
                <div className={`rounded-xl p-4 shadow ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100'}`}>
                    <h3 className="text-lg font-semibold">Watering Due Today</h3>
                    <p className="text-2xl">{wateringDue.length}</p>
                </div>
                <div className={`rounded-xl p-4 shadow ${darkMode ? 'bg-yellow-900 text-yellow-100' : 'bg-yellow-100'}`}>
                    <h3 className="text-lg font-semibold">Recently Watered</h3>
                    <p className="text-2xl">{recentlyWatered.length}</p>
                </div>
            </div>

            {/* Category Breakdown */}
            <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">🌱 Category Summary</h3>
                <div className="flex gap-4 flex-wrap">
                    {Object.entries(categoryCount).map(([category, count]) => (
                        <div
                            key={category}
                            className={`px-4 py-2 rounded-full text-sm font-medium shadow 
                            ${darkMode ? 'bg-purple-800 text-purple-100' : 'bg-purple-100'}`}
                        >
                            {category}: {count}
                        </div>
                    ))}
                </div>
            </div>

            {/* Responsive Plant Table */}
            <div className={`rounded-lg overflow-hidden shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full table-auto text-sm">
                        <thead className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-left'}`}>
                            <tr>
                                <th className="px-4 py-2">Plant</th>
                                <th className="px-4 py-2">Category</th>
                                <th className="px-4 py-2">Watering</th>
                                <th className="px-4 py-2">Last Watered</th>
                                <th className="px-4 py-2">Next Watering</th>
                                <th className="px-4 py-2">Health</th>
                                <th className="px-4 py-2">User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plants.map(plant => (
                                <tr
                                    key={plant._id}
                                    className={`border-b transition ${darkMode ? 'hover:bg-gray-700 border-gray-700' : 'hover:bg-gray-50'}`}
                                >
                                    <td className="px-4 py-2 font-medium">{plant.plantName}</td>
                                    <td className="px-4 py-2">{plant.category || 'N/A'}</td>
                                    <td className="px-4 py-2">{plant.wateringFrequency}</td>
                                    <td className="px-4 py-2">{plant.lastWateredDate || 'N/A'}</td>
                                    <td className="px-4 py-2">
                                        {plant.nextWateringDate === today ? (
                                            <span className="text-red-500 font-bold flex items-center gap-1">
                                                <AlertCircle size={16} /> Today
                                            </span>
                                        ) : (
                                            plant.nextWateringDate || 'N/A'
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className={`font-semibold ${plant.healthStatus === 'Healthy' ? 'text-green-400' : 'text-orange-300'}`}>
                                            {plant.healthStatus || 'Unknown'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="block">{plant.userName || 'N/A'}</span>
                                        <span className="text-gray-400 text-xs">{plant.userEmail}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4 p-4">
                    {plants.map(plant => (
                        <div
                            key={plant._id}
                            className={`border rounded-lg p-4 shadow-sm 
                            ${darkMode ? 'border-gray-700 bg-gray-800' : 'bg-white'}`}
                        >
                            <h4 className="text-lg font-semibold mb-2">{plant.plantName}</h4>
                            <p><strong>Category:</strong> {plant.category || 'N/A'}</p>
                            <p><strong>Watering:</strong> {plant.wateringFrequency}</p>
                            <p><strong>Last Watered:</strong> {plant.lastWateredDate || 'N/A'}</p>
                            <p>
                                <strong>Next Watering:</strong>{' '}
                                {plant.nextWateringDate === today ? (
                                    <span className="text-red-500 font-bold inline-flex items-center gap-1">
                                        <AlertCircle size={16} /> Today
                                    </span>
                                ) : (
                                    plant.nextWateringDate || 'N/A'
                                )}
                            </p>
                            <p>
                                <strong>Health:</strong>{' '}
                                <span className={`font-semibold ${plant.healthStatus === 'Healthy' ? 'text-green-400' : 'text-orange-300'}`}>
                                    {plant.healthStatus || 'Unknown'}
                                </span>
                            </p>
                            <p>
                                <strong>User:</strong> {plant.userName || 'N/A'}
                                <br />
                                <span className="text-gray-400 text-xs">{plant.userEmail}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
