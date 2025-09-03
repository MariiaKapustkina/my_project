import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/icon/logo2.png';
import { ThemeContext } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const getLinkClass = ({ isActive }) =>
    isActive
      ? 'text-yellow-500 border-b-2 border-yellow-500'
      : `hover:text-yellow-500 transition-colors duration-200 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`;

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 px-4 border-b transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-black border-white text-white shadow-lg'
          : 'bg-white/90 border-gray-300 text-black shadow-md backdrop-blur-sm'
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full py-2">
        <NavLink to="/home" className="w-20">
          <img src={logo} alt="Logo" className="w-[90px] h-auto max-h-[90px]" />
        </NavLink>

        <nav className="hidden md:flex text-xl gap-6 items-center">
          {['home', 'horoscopes', 'help', 'sign'].map((link) => (
            <NavLink key={link} to={`/${link}`} className={getLinkClass}>
              {link.toUpperCase()}
            </NavLink>
          ))}

          <button
            onClick={toggleTheme}
            className="ml-6 px-3 py-2 rounded-full hover:bg-yellow-400 transition"
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition ${
              theme === 'dark'
                ? 'bg-yellow-200 text-black'
                : 'bg-gray-200 text-black'
            }`}
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button
            className="focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-10 h-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`absolute inset-0 w-10 h-10 transform transition-all duration-300 ${
                  isOpen
                    ? 'opacity-0 scale-90 rotate-45'
                    : 'opacity-100 scale-100 rotate-0'
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`absolute inset-0 w-10 h-10 transform transition-all duration-300 ${
                  isOpen
                    ? 'opacity-100 scale-100 rotate-0'
                    : 'opacity-0 scale-90 -rotate-45'
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {isOpen && (
        <nav
          className={`absolute top-full left-0 w-full h-screen p-6 flex flex-col items-center gap-8 z-50 transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-black text-white'
              : 'bg-white/95 text-black backdrop-blur-sm'
          }`}
        >
          {['home', 'horoscopes', 'help', 'sign'].map((link) => (
            <NavLink
              key={link}
              to={`/${link}`}
              className="font-semibold text-2xl hover:text-yellow-500 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link.toUpperCase()}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
