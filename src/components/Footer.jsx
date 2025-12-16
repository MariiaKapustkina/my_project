import { NavLink } from "react-router-dom";
import logo from "../assets/icon/logo.png";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaGithub, FaInstagram, FaTelegram } from "react-icons/fa";

export default function Footer() {
  const { theme } = useContext(ThemeContext);

  const getLinkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-500"
      : `hover:text-yellow-500 transition-colors duration-200 ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`;

  return (
    <footer
      className={`border-t py-6 transition-colors duration-300 ${
        theme === "dark"
          ? 'bg-black border-white text-white shadow-lg'
          : 'bg-white/90 border-gray-300 text-black shadow-md backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
        <div className="flex gap-4 text-xl">
          <a
            href="https://github.com/MariiaKapustkina"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-500 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://t.me/AVEmri"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-500 transition"
          >
            <FaTelegram />
          </a>
          <a
            href="https://www.instagram.com/maashhaak?igsh=MTludGtkNmhjOXlmbA%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-500 transition"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
      <div
        className={`mt-4 text-center text-lg ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}
      >
        © {new Date().getFullYear()} Horoscope. All rights reserved.
      </div>
    </footer>
  );
}
