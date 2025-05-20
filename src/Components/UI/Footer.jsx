import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot, FaEnvelope, FaClock } from "react-icons/fa6";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-1">
            <span className="text-3xl">🌱</span> Plant Care Tracker
          </h2>
          <p className="text-sm mb-4">
            Transform your outdoor space with our expert garden services! From design to maintenance, we create beautiful,
            thriving gardens tailored to your vision. Let us bring your dream garden to life—professional, reliable, and passionate about nature.
          </p>
          <div className="flex space-x-4 text-xl">
            <Link><FaFacebookF size={20} /></Link>
            <Link><FaInstagram size={20} /></Link>
            <Link><FaYoutube size={20} /></Link>
            <Link><FaWhatsapp size={20} /></Link>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Home</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Our Services Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Garden Design</a></li>
            <li><a href="#">Garden Maintenance</a></li>
            <li><a href="#">Planting Services</a></li>
            <li><a href="#">Tree Care</a></li>
            <li><a href="#">Irrigation Services</a></li>
            <li><a href="#">Specialty Services</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-3">We're Open</h3>
          <p className="text-sm flex items-center gap-2"><FaClock /> Monday - Friday 08.00 - 18.00</p>

          <h4 className="mt-4 font-semibold">Office Location</h4>
          <p className="text-sm flex items-center gap-2"><FaLocationDot /> 100 S Main St, New York, NY</p>

          <h4 className="mt-4 font-semibold">Send a Message</h4>
          <p className="text-sm flex items-center gap-2"><FaEnvelope /> contact@gmail.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-800 mt-10 pt-4 text-sm flex flex-col md:flex-row justify-between items-center">
        <p>Copyright 2024 - Gardyn by Designesia</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link><p>Terms & Conditions</p></Link>
          <Link><p>Privacy Policy</p></Link>
        </div>
      </div>
    </footer>
  );
}
