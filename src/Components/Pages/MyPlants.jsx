import React, { useContext, useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router';
import AuthContext from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const MyPlants = () => {


    const { user } = useContext(AuthContext);
    const loadedPlants = useLoaderData();
    const [plants, setPlants] = useState([]);

    // Initialize local plants state from loader data
    useEffect(() => {
        setPlants(loadedPlants);
    }, [loadedPlants]);

    // Filter plants by current user's email
    const filteredPlants = plants.filter(plant => plant.userEmail === user?.email);

    // Delete handler with confirmation and API call
    const handleDeleteClick = (plant) => {
        Swal.fire({
            title: `Delete "${plant.plantName}"?`,
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`https://plant-care-tracker-omega.vercel.app/plants/${plant._id}`, {
                        method: 'DELETE',
                    });
                    const data = await response.json();

                    if (data.deletedCount > 0) {
                        Swal.fire('Deleted!', `"${plant.plantName}" has been deleted.`, 'success');
                        // Remove plant from local state to update UI
                        setPlants(prevPlants => prevPlants.filter(p => p._id !== plant._id));
                    } else {
                        Swal.fire('Oops!', 'Failed to delete the plant.', 'error');
                    }
                } catch (error) {
                    Swal.fire('Error!', 'Something went wrong.', error);
                }
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-green-700">My Plants</h2>

            {filteredPlants.length === 0 ? (
                <p className="text-gray-500">You haven't added any plants yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredPlants.map(plant => (
                        <div
                            key={plant._id}
                            className="bg-white border border-green-200 rounded-xl shadow-md p-5 hover:shadow-lg transition"
                        >
                            <img
                                src={plant.image}
                                alt={plant.plantName}
                                className="h-40 w-full object-cover rounded-lg mb-3"
                            />
                            <h3 className="text-xl font-semibold text-green-800">{plant.plantName}</h3>
                            <p className="text-sm text-gray-600 italic mb-2">{plant.category}</p>
                            <p className="text-sm text-gray-700 mb-1">{plant.description.slice(0, 80)}...</p>
                            <p className="text-xs text-gray-500">Water every: {plant.wateringFrequency}</p>
                            <p className="text-xs text-gray-500">Health: {plant.healthStatus}</p>

                            {/* update and delete button */}
                            <div className="flex gap-2 mt-4">
                                <Link
                                    to={`/update-plant/${plant._id}`}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 cursor-pointer py-2 rounded-md text-sm"
                                >
                                    Update
                                </Link>
                                <button
                                    onClick={() => handleDeleteClick(plant)}
                                    className="bg-red-500 hover:bg-red-600 text-white cursor-pointer px-4 py-2 rounded-md text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyPlants;
