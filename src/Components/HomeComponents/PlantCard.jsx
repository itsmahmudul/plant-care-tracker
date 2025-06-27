import React, { useContext } from 'react';
import { ShieldCheck, HeartPulse, Info } from 'lucide-react';
import { Link } from 'react-router';
import AuthContext from '../../Context/AuthContext';

const getHealthBadgeColor = (status, darkMode) => {
  const colors = {
    excellent: darkMode
      ? 'bg-green-800 text-green-200 border-green-600'
      : 'bg-green-100 text-green-700 border-green-400',
    good: darkMode
      ? 'bg-yellow-800 text-yellow-200 border-yellow-600'
      : 'bg-yellow-100 text-yellow-700 border-yellow-400',
    medium: darkMode
      ? 'bg-orange-800 text-orange-200 border-orange-600'
      : 'bg-orange-100 text-orange-700 border-orange-400',
    poor: darkMode
      ? 'bg-red-800 text-red-200 border-red-600'
      : 'bg-red-100 text-red-700 border-red-400',
    bad: darkMode
      ? 'bg-red-800 text-red-200 border-red-600'
      : 'bg-red-100 text-red-700 border-red-400',
    default: darkMode
      ? 'bg-gray-700 text-gray-300 border-gray-600'
      : 'bg-gray-100 text-gray-700 border-gray-300',
  };
  return colors[status.toLowerCase()] || colors.default;
};

const PlantCard = ({ plant }) => {
  const { darkMode } = useContext(AuthContext);
  const badgeColor = getHealthBadgeColor(plant.healthStatus, darkMode);

  return (
    <div
      className={`
        h-[480px] max-w-sm w-full p-4 rounded-2xl shadow-lg hover:shadow-xl
        transform hover:-translate-y-1 transition-all duration-300
        flex flex-col justify-between overflow-hidden
        ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}
      `}
    >
      <img
        src={plant.image}
        alt={plant.plantName.trim()}
        className="rounded-xl w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
      />

      <div className="mt-4 flex-grow flex flex-col justify-between space-y-3">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            {plant.plantName.trim()}
          </h2>
          <p className={`text-sm font-medium capitalize flex items-center gap-1 ${darkMode ? 'text-green-400' : 'text-green-500'}`}>
            <Info size={16} /> {plant.category}
          </p>
          <p className={`text-sm mt-1 line-clamp-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {plant.description.trim()}
          </p>
        </div>

        <div className={`text-sm space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-blue-500" />
            <span className="font-medium">Care Level:</span> {plant.careLevel}
          </div>
          <div className="flex items-center gap-2">
            <HeartPulse size={16} className="text-red-500" />
            <span className="font-medium">Health:</span>
            <span className={`text-xs px-2 py-1 rounded-full border ${badgeColor}`}>
              {plant.healthStatus}
            </span>
          </div>
        </div>
      </div>

      <Link to={`/plant-details/${plant._id}`}>
        <button
          className={`
            mt-4 w-full cursor-pointer py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ease-in-out shadow-md hover:shadow-lg
            ${darkMode
              ? 'bg-gradient-to-r from-green-700 to-green-900 hover:from-green-800 hover:to-green-950 text-white'
              : 'bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white'}
          `}
        >
          View Details
        </button>
      </Link>
    </div>
  );
};

export default PlantCard;
