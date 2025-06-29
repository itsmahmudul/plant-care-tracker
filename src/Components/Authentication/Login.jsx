import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import AuthContext from "../../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const { signInUser, googleSignIn, darkMode } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        toast.dismiss();
        signInUser(email, password)
            .then(() => {
                toast.success("User has logged in successfully!");
                setTimeout(() => navigate("/"), 1000);
            })
            .catch((error) => {
                toast.error(`Error: ${error.message}`);
            });
    };

    const handleGoogleLogIn = () => {
        googleSignIn()
            .then(() => {
                toast.success("User has logged in successfully!");
                setTimeout(() => navigate("/"), 1000);
            })
            .catch((error) => {
                toast.error(`Error: ${error.message}`);
            });
    };

    const handleForgetPassword = () => {
        navigate("/forget-password", { state: { email: emailInput } });
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? "bg-gray-800" : "bg-gray-50"
                }`}
        >
            <div
                className={`flex w-full max-w-5xl shadow-lg border rounded-xl overflow-hidden ${darkMode
                        ? "border-green-700 bg-gray-900 text-gray-200"
                        : "border-green-600 bg-white text-gray-800"
                    }`}
            >
                {/* Left side (Image + Logo) */}
                <div
                    className="w-1/2 hidden md:flex items-center justify-center p-8"
                    style={{
                        backgroundImage: `url('lukasz-rawa-4axNezh03UA-unsplash.jpg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: darkMode ? "brightness(0.6)" : "none",
                    }}
                >
                    <div className="text-center">
                        <h1 className="text-4xl text-green-400 font-bold tracking-wide flex items-center justify-center gap-2">
                            PLANT
                            <span className="text-green-200">🌿</span>
                            CARE
                        </h1>
                        <h1 className="text-green-400 text-xl font-bold">TRACKER</h1>
                        <p className="mt-4 text-lg text-green-400">
                            Healthy roots grow strong, vibrant green leaves.
                        </p>
                    </div>
                </div>

                {/* Right side (Form) */}
                <div className="w-full md:w-1/2 p-10">
                    <h2
                        className={`text-2xl font-semibold text-center mb-1 ${darkMode ? "text-gray-100" : "text-gray-800"
                            }`}
                    >
                        Welcome
                    </h2>
                    <p
                        className={`text-center mb-6 ${darkMode ? "text-gray-300" : "text-gray-500"
                            }`}
                    >
                        Log in to your account
                    </p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${darkMode
                                    ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-green-400 placeholder-gray-400"
                                    : "bg-white border-gray-300 text-gray-800 focus:ring-green-600 placeholder-gray-500"
                                }`}
                            required
                        />
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${darkMode
                                        ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-green-400 placeholder-gray-400"
                                        : "bg-white border-gray-300 text-gray-800 focus:ring-green-600 placeholder-gray-500"
                                    }`}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className={`absolute top-4 right-4 cursor-pointer ${darkMode ? "text-gray-400" : "text-gray-500"
                                    }`}
                                aria-label={showPass ? "Hide password" : "Show password"}
                            >
                                {showPass ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <div className="text-right">
                            <button
                                type="button"
                                onClick={handleForgetPassword}
                                className={`text-sm cursor-pointer hover:underline ${darkMode ? "text-green-400" : "text-green-700"
                                    }`}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-green-800 hover:bg-green-900 text-white py-2 rounded-md font-semibold transition"
                        >
                            Login
                        </button>

                        <div className="my-4 flex items-center justify-center">
                            <span
                                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-400"
                                    }`}
                            >
                                or
                            </span>
                        </div>

                        <button
                            onClick={handleGoogleLogIn}
                            type="button"
                            className={`w-full cursor-pointer flex items-center justify-center gap-2 border py-2 rounded-md text-sm transition ${darkMode
                                    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 533.5 544.3"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="#4285F4"
                                    d="M533.5 278.4c0-17.4-1.4-34-4-50.2H272v95h146.9c-6.3 33.6-25.5 61.8-54.5 81l88 68c51.5-47.5 80.1-117.6 80.1-193.8z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M272 544.3c72.9 0 134-24.1 178.6-65.1l-88-68c-24.4 16.4-55.5 26.2-90.6 26.2-69.7 0-128.8-47.1-150.1-110.2H31.8v69.2C76.1 486.4 168.8 544.3 272 544.3z"
                                />
                                <path
                                    fill="#FBBC04"
                                    d="M121.9 326.2c-11-32.6-11-67.9 0-100.5V156.5H31.8c-38.1 75.7-38.1 165.5 0 241.2l90.1-71.5z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M272 107.6c39.6-.6 77.6 14 106.7 40.6l79.8-79.8C417.3 25.1 345.2-2.2 272 0 168.8 0 76.1 57.9 31.8 156.5l90.1 69.2C143.2 154.7 202.3 107.6 272 107.6z"
                                />
                            </svg>
                            Login with Google
                        </button>
                    </form>

                    <div
                        className={`text-center mt-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                    >
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-green-600 font-medium hover:underline"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
        </div>
    );
};

export default Login;
