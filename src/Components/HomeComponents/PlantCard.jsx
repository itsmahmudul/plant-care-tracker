import React from 'react';
import {
    Droplet,
    ShieldCheck,
    CalendarCheck,
    CalendarClock,
    HeartPulse,
    User2,
    Info
} from 'lucide-react';
import { Link } from 'react-router';

const getHealthBadgeColor = (status) => {
    switch (status.toLowerCase()) {
        case 'excellent':
            return 'bg-green-100 text-green-700 border-green-400';
        case 'good':
            return 'bg-yellow-100 text-yellow-700 border-yellow-400';
        case 'medium':
            return 'bg-orange-100 text-orange-700 border-orange-400';
        case 'poor':
        case 'bad':
            return 'bg-red-100 text-red-700 border-red-400';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-300';
    }
};

const PlantCard = ({ plant }) => {
    const badgeColor = getHealthBadgeColor(plant.healthStatus);

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-4 w-full max-w-sm flex flex-col justify-between">
            <img
                src={plant.image}
                alt={plant.plantName.trim()}
                className="rounded-xl w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="mt-4 flex-grow space-y-3">
                <h2 className="text-2xl font-bold text-gray-800">{plant.plantName.trim()}</h2>
                <p className="text-sm text-green-500 font-medium capitalize flex items-center gap-1">
                    <Info size={16} /> {plant.category}
                </p>
                <p className="text-sm text-gray-600">{plant.description.trim()}</p>

                <div className="text-sm text-gray-700 space-y-2">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-blue-500" />
                        <span className="font-medium">Care Level:</span> {plant.careLevel}
                    </div>
                    <div className="flex items-center gap-2">
                        <Droplet size={16} className="text-sky-500" />
                        <span className="font-medium">Watering:</span> {plant.wateringFrequency}
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarCheck size={16} className="text-green-600" />
                        <span className="font-medium">Last Watered:</span> {plant.lastWateredDate}
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarClock size={16} className="text-yellow-600" />
                        <span className="font-medium">Next Watering:</span> {plant.nextWateringDate}
                    </div>
                    <div className="flex items-center gap-2">
                        <HeartPulse size={16} className="text-red-500" />
                        <span className="font-medium">Health:</span>
                        <span className={`text-xs px-2 py-1 rounded-full border ${badgeColor}`}>
                            {plant.healthStatus}
                        </span>
                    </div>
                </div>

                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <User2 size={14} /> Added by: <span className="italic">{plant.userName}</span> ({plant.userEmail})
                </p>
            </div>

            <Link to={`/plant-details/${plant._id}`}>
                <button
                    className="mt-6 w-full cursor-pointer bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                >
                    View Details
                </button>
            </Link>
        </div>
    );
};

export default PlantCard;
