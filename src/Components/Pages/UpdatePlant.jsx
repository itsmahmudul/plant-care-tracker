import React, { useContext, useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { parseISO, format, addDays, isValid } from 'date-fns';
import AuthContext from '../../Context/AuthContext';

const UpdatePlant = () => {
    const loadedPlant = useLoaderData();
    console.log(loadedPlant);
    const navigate = useNavigate();
    const { darkMode, user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        image: loadedPlant.image || '',
        plantName: '',
        wateringFrequency: '',
        lastWateredDate: '',
        nextWateringDate: '',
        healthStatus: '',
        userEmail: user.email || '',
        userName: user.displayName || '',
        category: '',
        careLevel: '',
        description: ''
    });

    useEffect(() => {
        if (loadedPlant) {
            setFormData({
                ...loadedPlant,
                lastWateredDate: loadedPlant.lastWateredDate ? format(new Date(loadedPlant.lastWateredDate), 'yyyy-MM-dd') : '',
                nextWateringDate: loadedPlant.nextWateringDate ? format(new Date(loadedPlant.nextWateringDate), 'yyyy-MM-dd') : ''
            });
        }
    }, [loadedPlant]);

    const calculateNextWateringDate = (lastDate, frequency) => {
        const match = frequency.match(/\d+/);
        const days = match ? parseInt(match[0]) : 0;
        const parsedDate = parseISO(lastDate);
        return isValid(parsedDate) && days > 0 ? format(addDays(parsedDate, days), 'yyyy-MM-dd') : '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };

        if (name === 'lastWateredDate' || name === 'wateringFrequency') {
            updatedData.nextWateringDate = calculateNextWateringDate(
                name === 'lastWateredDate' ? value : formData.lastWateredDate,
                name === 'wateringFrequency' ? value : formData.wateringFrequency
            );
        }

        setFormData(updatedData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedData = {
            ...formData,
            lastWateredDate: format(parseISO(formData.lastWateredDate), 'yyyy-MM-dd'),
            nextWateringDate: formData.nextWateringDate
        };

        fetch(`http://localhost:3000/plants/${formData._id || formData.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire('Updated!', 'Plant details updated successfully.', 'success');
                    navigate('/my-plants');
                } else {
                    Swal.fire('Oops!', 'Update failed.', 'error');
                }
            });
    };

    return (
        <div className={`min-h-screen py-10 px-4 flex items-center justify-center ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-green-50 text-gray-800'}`}>
            <div className={`w-full max-w-3xl p-8 rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <h2 className="text-4xl font-extrabold mb-8 text-center tracking-tight">Update Your Plant</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { label: "Image URL", name: "image", type: "url" },
                        { label: "Plant Name", name: "plantName", type: "text" },
                        { label: "Watering Frequency", name: "wateringFrequency", type: "text" },
                        { label: "Last Watered Date", name: "lastWateredDate", type: "date" },
                        { label: "Next Watering Date", name: "nextWateringDate", type: "date", readOnly: true },
                        { label: "Health Status", name: "healthStatus", type: "text" },
                        { label: "User Email", name: "userEmail", type: "email" },
                        { label: "User Name", name: "userName", type: "text" },
                    ].map(({ label, name, type, readOnly }) => (
                        <div key={name} className="flex flex-col">
                            <label className="mb-2 text-sm font-semibold">{label}</label>
                            <input
                                type={type}
                                name={name}
                                defaultValue={formData[name] || ''}
                                onChange={handleChange}
                                readOnly={readOnly}
                                className={`rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 transition-all duration-150 
                                    ${darkMode ? 'bg-gray-800 border-gray-700 focus:ring-green-500 text-white' : 'bg-gray-100 border-gray-300 focus:ring-green-600 text-gray-800'}`}
                                required={!readOnly}
                            />
                        </div>
                    ))}

                    <div>
                        <label className="mb-2 text-sm font-semibold block">Category</label>
                        <select
                            name="category"
                            defaultValue={formData.category}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-2 text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
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

                    <div>
                        <label className="mb-2 text-sm font-semibold block">Care Level</label>
                        <select
                            name="careLevel"
                            defaultValue={formData.careLevel}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-2 text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
                        >
                            <option value="">Select Care Level</option>
                            <option value="easy">Easy</option>
                            <option value="moderate">Moderate</option>
                            <option value="difficult">Difficult</option>
                        </select>
                    </div>

                    <div className="col-span-full">
                        <label className="mb-2 text-sm font-semibold block">Description</label>
                        <textarea
                            name="description"
                            defaultValue={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className={`w-full rounded-lg border px-4 py-2 text-sm resize-none ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
                        />
                    </div>

                    <div className="col-span-full pt-4">
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 shadow-md transition-all duration-150"
                        >
                            ✅ Update Plant
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePlant;
