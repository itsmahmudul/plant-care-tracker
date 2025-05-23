import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import AuthContext from '../../Context/AuthContext';
import { parseISO, format, addDays, isValid } from 'date-fns';

const AddPlant = () => {
    const { user, darkMode } = useContext(AuthContext);

    const initialFormData = {
        image: '',
        plantName: '',
        category: '',
        description: '',
        careLevel: '',
        wateringFrequency: '',
        lastWateredDate: '',
        nextWateringDate: '',
        healthStatus: '',
        userEmail: user.email || '',
        userName: user.displayName || ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const calculateNextWateringDate = (lastDate, frequency) => {
        const match = frequency.match(/\d+/);
        const days = match ? parseInt(match[0]) : 0;

        const parsedDate = parseISO(lastDate);
        if (isValid(parsedDate) && days > 0) {
            return format(addDays(parsedDate, days), 'yyyy-MM-dd');
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedData = { ...formData, [name]: value };

        // Auto-calculate nextWateringDate
        if (name === 'lastWateredDate' || name === 'wateringFrequency') {
            const nextDate = calculateNextWateringDate(
                name === 'lastWateredDate' ? value : formData.lastWateredDate,
                name === 'wateringFrequency' ? value : formData.wateringFrequency
            );
            updatedData.nextWateringDate = nextDate;
        }

        setFormData(updatedData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedData = {
            ...formData,
            lastWateredDate: format(parseISO(formData.lastWateredDate), 'yyyy-MM-dd'),
            nextWateringDate: formData.nextWateringDate
        };

        fetch('https://plant-care-tracker-omega.vercel.app/plants', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formattedData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Plant has been Added Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setFormData(initialFormData);
                }
            });
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4 ${darkMode
                ? 'bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-tr from-green-200 via-lime-100 to-green-300'
                }`}
        >
            <div
                className={`max-w-3xl my-16 w-full p-8 rounded-2xl shadow-xl backdrop-blur-md ${darkMode
                    ? 'bg-gray-900 bg-opacity-70 text-gray-200 shadow-black'
                    : 'bg-white bg-opacity-85 text-green-700'
                    }`}
            >
                <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                    Add New Plant
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" autoComplete="off">
                    {/* Image URL */}
                    <div className="col-span-full">
                        <label className={`block font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${darkMode
                                ? 'bg-gray-800 border-gray-700 focus:ring-green-400 text-gray-200 placeholder-gray-400'
                                : 'bg-white border-gray-300 focus:ring-green-300 text-gray-700'
                                }`}
                            required
                        />
                    </div>

                    {/* Plant Name */}
                    <div>
                        <label className={`block font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Plant Name</label>
                        <input
                            type="text"
                            name="plantName"
                            value={formData.plantName}
                            onChange={handleChange}
                            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${darkMode
                                ? 'bg-gray-800 border-gray-700 focus:ring-green-400 text-gray-200 placeholder-gray-400'
                                : 'bg-white border-gray-300 focus:ring-green-300 text-gray-700'
                                }`}
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className={`block font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${darkMode
                                ? 'bg-gray-800 border-gray-700 focus:ring-green-400 text-gray-200'
                                : 'bg-white border-gray-300 focus:ring-green-300 text-gray-700'
                                }`}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="succulent">Succulent</option>
                            <option value="herb">Herb</option>
                            <option value="fern">Fern</option>
                            <option value="flowering">Flowering</option>
                            <option value="tree">Tree</option>
                            <option value="shrub">Shrub</option>
                        </select>
                    </div>

                    {/* Care Level */}
                    <div>
                        <label className={`block font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Care Level</label>
                        <select
                            name="careLevel"
                            value={formData.careLevel}
                            onChange={handleChange}
                            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${darkMode
                                ? 'bg-gray-800 border-gray-700 focus:ring-green-400 text-gray-200'
                                : 'bg-white border-gray-300 focus:ring-green-300 text-gray-700'
                                }`}
                            required
                        >
                            <option value="">Select Care Level</option>
                            <option value="easy">Easy</option>
                            <option value="moderate">Moderate</option>
                            <option value="difficult">Difficult</option>
                        </select>
                    </div>

                    {/* Watering Frequency */}
                    <div>
                        <label className={`block font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Watering Frequency</label>
                        <input
                            type="text"
                            name="wateringFrequency"
                            value={formData.wateringFrequency}
                            onChange={handleChange}
                            placeholder="e.g., every 3 days"
                            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${darkMode
                                ? 'bg-gray-800 border-gray-700 focus:ring-green-400 text-gray-200 placeholder-gray-400'
                                : 'bg-white border-gray-300 focus:ring-green-300 text-gray-700'
                                }`}
                            required
                        />
                    </div>

                    {/* Last Watered Date */}
                    <div>
                        <label className={`block font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last Watered Date</label>
                        <input
                            type="date"
                            name="lastWateredDate"
                            value={formData.lastWateredDate}
                            onChange={handleChange}
                            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${darkMode
                                ? 'bg-gray-800 border-gray-700 focus:ring-green-400 text-gray-200'
                                : 'bg-white border-gray-300 focus:ring-green-300 text-gray-700'
                                }`}
                            required
                        />
                    </div>

                    {/* Next Watering Date (auto-calculated) */}
                    <div>
                        <label className={`block font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Next Watering Date</label>
                        <input
                            type="date"
                            name="nextWateringDate"
                            value={formData.nextWateringDate}
                            readOnly
                            className={`w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed ${darkMode
                                ? 'bg-gray-700 border-gray-600 text-gray-300'
                                : 'bg-gray-200 border-gray-300 text-gray-600'
                                }`}
                        />
                    </div>

                    {/* Health Status */}
                    <div>
                        <label className={`block font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Health Status</label>
                        <input
                            type="text"
                            name="healthStatus"
                            value={formData.healthStatus}
                            onChange={handleChange}
                            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${darkMode
                                ? 'bg-gray-800 border-gray-700 focus:ring-green-400 text-gray-200 placeholder-gray-400'
                                : 'bg-white border-gray-300 focus:ring-green-300 text-gray-700'
                                }`}
                            required
                        />
                    </div>

                    {/* User Email */}
                    <div>
                        <label className={`block font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>User Email</label>
                        <input
                            type="email"
                            name="userEmail"
                            defaultValue={formData.userEmail}
                            onChange={handleChange}
                            className={`w-full border rounded-lg px-4 py-2 bg-gray-100 ${darkMode ? 'bg-gray-700 text-gray-300' : ''
                                }`}
                            required
                        />
                    </div>

                    {/* User Name */}
                    <div>
                        <label className={`block font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>User Name</label>
                        <input
                            type="text"
                            name="userName"
                            defaultValue={formData.userName}
                            onChange={handleChange}
                            className={`w-full border rounded-lg px-4 py-2 bg-gray-100 ${darkMode ? 'bg-gray-700 text-gray-300' : ''
                                }`}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="col-span-full">
                        <label className={`block font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${darkMode
                                ? 'bg-gray-800 border-gray-700 focus:ring-green-400 text-gray-200 placeholder-gray-400'
                                : 'bg-white border-gray-300 focus:ring-green-300 text-gray-700'
                                }`}
                            rows="3"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-full pt-4">
                        <button
                            type="submit"
                            className={`w-full cursor-pointer font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 ${darkMode
                                ? 'bg-green-700 hover:bg-green-600 text-white shadow-black'
                                : 'bg-green-600 hover:bg-green-700 text-white'
                                }`}
                        >
                            Add Plant
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPlant;
