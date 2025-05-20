import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router';

const Error = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-green-900 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <Leaf className="w-16 h-16 text-green-500 mb-4" />
      </motion.div>

      <motion.h1
        className="text-6xl font-bold mb-2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-xl mb-4"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        This plant doesn’t grow here.
      </motion.p>

      <motion.p
        className="mb-6 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        The page you're looking for doesn't exist or has been moved. Let's get you back to the garden.
      </motion.p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
        >
          🌿 Back to Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Error;
