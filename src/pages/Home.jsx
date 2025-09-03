import background from '../assets/images/banner2.jpg';
import { Link } from 'react-router-dom';
import ZodiacQuiz from '../components/ZodiacQuiz/ZodiacQuiz';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.3 } },
};
const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.5 } },
};

export default function Home() {
  const { theme } = useContext(ThemeContext);

  const bgOverlay =
    theme === 'dark' ? 'bg-black/60' : 'bg-white/30 backdrop-blur-sm';
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center mx-auto px-6 transition-colors duration-500 ${textColor}`}
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className={`absolute inset-0 z-0 transition-colors duration-500 ${bgOverlay}`}
      />

      <motion.div
        className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl w-full my-10 md:my-0"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="text-center md:text-left max-w-md space-y-6"
          variants={fadeInLeft}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl font-bold font-sans"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            WELCOME TO THE STARS ✨
          </motion.h1>

          <motion.p
            className="text-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Discover your zodiac sign and explore the secrets of the universe.
            Start your astrological journey with us.
          </motion.p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              to="/horoscopes"
              className={`inline-block px-6 py-3 text-xl font-semibold rounded-full transition ${
                theme === 'dark'
                  ? 'bg-yellow-600 text-black hover:bg-yellow-400'
                  : 'bg-yellow-500 text-white hover:bg-yellow-400'
              }`}
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeInRight} initial="hidden" animate="visible">
          <ZodiacQuiz />
        </motion.div>
      </motion.div>
    </section>
  );
}
