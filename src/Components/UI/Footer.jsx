import { useContext, useEffect, useRef, useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot, FaEnvelope, FaClock } from "react-icons/fa6";
import { Link } from "react-router";
import AuthContext from "../../Context/AuthContext";

export default function Footer() {
  const { darkMode } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      {
        threshold: 0.1, // 10% of footer visible triggers it
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`text-white px-6 py-10 transition-colors duration-700 ${darkMode ? "bg-gray-900" : "bg-green-900"
        } ${visible ? "opacity-100" : "opacity-0"} ease-in duration-1000`}
      style={{ willChange: "opacity" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Description */}
        <div
          className={`transform transition-transform duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            } delay-100`}
          style={{ willChange: "transform, opacity" }}
        >
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-1">
            <span className="text-3xl">🌱</span> Plant Care Tracker
          </h2>
          <p className="text-sm mb-4">
            Transform your outdoor space with our expert garden services! From design to maintenance, we create beautiful,
            thriving gardens tailored to your vision. Let us bring your dream garden to life—professional, reliable, and passionate about nature.
          </p>
          <div className="flex space-x-4 text-xl">
            {[FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp].map((Icon, i) => (
              <Link
                key={i}
                className="transition-transform duration-300 hover:scale-110 hover:text-green-400"
              >
                <Icon size={20} />
              </Link>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div
          className={`transform transition-transform duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            } delay-200`}
          style={{ willChange: "transform, opacity" }}
        >
          <h3 className="font-semibold text-lg mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "Our Services", "Projects", "About Us", "Blog", "Contact"].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-green-400 transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Services Links */}
        <div
          className={`transform transition-transform duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            } delay-300`}
          style={{ willChange: "transform, opacity" }}
        >
          <h3 className="font-semibold text-lg mb-3">Our Services</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Garden Design",
              "Garden Maintenance",
              "Planting Services",
              "Tree Care",
              "Irrigation Services",
              "Specialty Services",
            ].map((service, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-green-400 transition-colors duration-300"
                >
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div
          className={`transform transition-transform duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            } delay-400`}
          style={{ willChange: "transform, opacity" }}
        >
          <h3 className="font-semibold text-lg mb-3">We're Open</h3>
          <p className="text-sm flex items-center gap-2">
            <FaClock /> Monday - Friday 08.00 - 18.00
          </p>

          <h4 className="mt-4 font-semibold">Office Location</h4>
          <p className="text-sm flex items-center gap-2">
            <FaLocationDot /> 100 S Main St, New York, NY
          </p>

          <h4 className="mt-4 font-semibold">Send a Message</h4>
          <p className="text-sm flex items-center gap-2">
            <FaEnvelope /> contact@gmail.com
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-800 mt-10 pt-4 text-sm flex flex-col md:flex-row justify-between items-center">
        <p>Copyright 2024 - Gardyn by Designesia</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link>
            <p className="hover:text-green-400 transition-colors duration-300 cursor-pointer">
              Terms & Conditions
            </p>
          </Link>
          <Link>
            <p className="hover:text-green-400 transition-colors duration-300 cursor-pointer">
              Privacy Policy
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
