import React, { use, useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import AuthContext from "../../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
    const [showPass, setShowPass] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMes, setErrorMes] = useState('');
    const { cerateUser } = use(AuthContext);
    const navigate = useNavigate();
    const { darkMode } = useContext(AuthContext);

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        console.log(name, photo, email, password, terms);

        setErrorMes('');
        setSuccess(false);

        if (!terms) {
            setErrorMes('Please accept our terms and conditions.');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrorMes('Password must have one lowercase, one uppercase, one digit, and be at least 8 characters long.');
            return;
        }

        cerateUser(email, password)
            .then(res => {
                console.log("New user created:", res.user); // Logging the created user
                setSuccess(true);
                toast.success("User has registered successfully!");
                setTimeout(() => navigate('/'), 1000);
            })
            .catch(error => {
                toast.error(`Error: ${error.message}`);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className={`shadow-lg rounded-3xl max-w-md w-full p-8 border border-green-200 relative ${darkMode ? "bg-gray-900" : "bg-green-50"
        }`}>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-100 p-3 rounded-full shadow-md">
                    🌿
                </div>

                <h2 className="text-3xl font-bold text-center text-green-600 mb-6 mt-4">Create Your Plant Journal</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50"
                    />
                    <input
                        type="text"
                        name="photo"
                        placeholder="Photo URL"
                        className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50"
                    />
                    <div className="relative">
                        <input
                            type={showPass ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute top-3 right-3 text-green-600 cursor-pointer "
                        >
                            {showPass ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <label className="flex items-center space-x-2 text-green-700 text-sm">
                        <input type="checkbox" name="terms" className="accent-green-500 cursor-pointer" />
                        <span>I accept the terms and conditions</span>
                    </label>

                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Register
                    </button>
                </form>

                {errorMes && <p className="text-red-500 mt-2 text-sm text-center">{errorMes}</p>}
                {success && <p className="text-green-600 mt-2 text-sm text-center">User created successfully!</p>}

                <div className="my-4 text-center text-sm text-green-700">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-600 font-medium hover:underline">
                        Login here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
