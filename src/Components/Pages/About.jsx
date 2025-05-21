import { motion } from "framer-motion";
import { Leaf, AlarmClock, UserCheck, Droplets } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";

export default function About() {

    const { darkMode } = useContext(AuthContext);

    return (
        <div className="min-h-screen  flex items-center justify-center px-4 py-12">
            <motion.div
                className={`rounded-2xl shadow-2xl max-w-5xl w-full p-8 flex flex-col md:flex-row items-center gap-10 ${darkMode ? "bg-gray-900" : "bg-white"
        }`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Image Section */}
                <motion.img
                    src="https://i.ibb.co/mC9K70px/linh-le-Ebwp2-6-BG8-E-unsplash.jpg"
                    alt="Indoor Plants"
                    className="rounded-xl w-full md:w-1/2 object-cover shadow-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                />

                {/* Text Content */}
                <div className="md:w-1/2">
                    <motion.h1
                        className="text-4xl font-extrabold text-green-700 mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        About PlantCare
                    </motion.h1>

                    <motion.p
                        className="text-gray-700 text-lg leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        PlantCare is your all-in-one solution for managing houseplants.
                        Designed for plant lovers of all levels, our platform helps you
                        ensure your plants thrive with the right care at the right time.
                    </motion.p>

                    <motion.div
                        className="mt-6 space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Feature
                            icon={<Leaf className="text-green-600" />}
                            title="Track Plant Health"
                            description="Monitor your plants' condition and maintain a healthy environment for growth."
                        />
                        <Feature
                            icon={<Droplets className="text-blue-500" />}
                            title="Log Care Activities"
                            description="Easily record watering, fertilizing, and other essential tasks."
                        />
                        <Feature
                            icon={<AlarmClock className="text-yellow-500" />}
                            title="Set Smart Reminders"
                            description="Get notified when it's time to water, feed, or check your plants."
                        />
                        <Feature
                            icon={<UserCheck className="text-purple-500" />}
                            title="Secure & Personalized"
                            description="Each user has their own plant collection, securely managed through authentication."
                        />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

// Reusable Feature component
function Feature({ icon, title, description }) {
    return (
        <div className="flex items-start gap-4">
            <div className="p-2 bg-green-100 rounded-full">{icon}</div>
            <div>
                <h3 className="text-xl font-semibold text-green-800">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
}
