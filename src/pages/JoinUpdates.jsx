import background from '../assets/images/signs-bg.jpg';
import { useEffect, useState, useContext } from 'react';
import { saveSubscriber } from '../utils/firebase';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import emailjs from '@emailjs/browser';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import donate from '../assets/donate.json';
import { ThemeContext } from '../context/ThemeContext';
import CircularProgress from '@mui/material/CircularProgress';

export default function JoinUpdates() {
  const { theme } = useContext(ThemeContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('subscribed') === 'true') setSuccess(true);
  }, []);

  const sendEmail = async (email, firstName) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { email, firstName },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
    } catch (err) {
      console.error('EmailJS error:', err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('https://example.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, lastName }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setSuccess(true);
      localStorage.setItem('subscribed', 'true');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isGoogleLoading) return;
    setIsGoogleLoading(true);
    setError('');

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await saveSubscriber({ firstName: user.displayName, email: user.email });
      await sendEmail(user.email, user.displayName || 'User');
      setSuccess(true);
      localStorage.setItem('subscribed', 'true');
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('Sign-in failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const bgOverlay = theme === 'dark' ? 'bg-black/60' : 'bg-white/30 backdrop-blur-sm';
  const formBg = theme === 'dark' ? 'bg-white/20' : 'bg-yellow-50/70';
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const buttonBg =
    theme === 'dark'
      ? 'bg-yellow-400 text-black hover:bg-yellow-500'
      : 'bg-black text-white hover:bg-yellow-700';

  return (
    <section
      className="relative bg-cover min-h-screen bg-center flex items-center justify-center px-4 md:px-8"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={`absolute inset-0 ${bgOverlay} z-0`} />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={`order-2 md:order-1 flex flex-col items-center text-center mb-6 rounded-2xl p-6 w-full max-w-sm shadow-xl backdrop-blur-sm ${formBg}`}
        >
          <p className={`text-lg md:text-xl lg:text-2xl font-semibold mb-6 ${textColor}`}>
            Support my project 💛 <br /> Every coffee makes a difference!
          </p>

          <motion.a
            href="https://send.monobank.ua/jar/6PtsiqYajo"
            target="_blank"
            rel="noopener noreferrer"
            title="Buy me a coffee"
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-3 px-5 rounded-xl font-bold transition shadow-md ${buttonBg} text-2xl`}
          >
            <Lottie animationData={donate} loop className="w-[100px] h-[100px]" />
            Buy me a coffee
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className={`order-1 md:order-2 w-full max-w-md mt-6 rounded-2xl shadow-2xl border border-white/40 p-8 backdrop-blur-lg ${
            theme === 'dark' ? 'bg-white/20' : 'bg-yellow-50/50'
          }`}
        >
          <h1 className={`text-3xl font-bold text-center mb-2 ${textColor}`}>
            Subscribe for Updates 🚀
          </h1>
          <p className={`text-xl font-semibold text-center mb-6 ${textColor}`}>
            Subscribe to stay updated with our latest news, exclusive offers, and inspiring content.
          </p>

          {!success ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              <div className="relative w-full">
                <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                  disabled={isSubmitting || isGoogleLoading}
                />
              </div>

              <div className="relative w-full">
                <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                  disabled={isSubmitting || isGoogleLoading}
                />
              </div>

              <div className="relative w-full">
                <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                  disabled={isSubmitting || isGoogleLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isGoogleLoading}
                className={`w-full py-3 font-semibold rounded-lg transition duration-200 ${buttonBg} ${
                  isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                } flex justify-center items-center gap-2`}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress size={20} color="inherit" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe Now'
                )}
              </button>

              <p className={`font-semibold text-center ${textColor}`}>Or continue with</p>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading || isSubmitting}
                className={`w-full py-3 bg-white border border-gray-300 flex items-center justify-center gap-2 font-semibold rounded-lg hover:bg-gray-100 transition mt-2 ${
                  isGoogleLoading ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                <FcGoogle size={24} />
                {isGoogleLoading ? (
                  <>
                    <CircularProgress size={20} />
                    Processing...
                  </>
                ) : (
                  'Subscribe with Google'
                )}
              </button>

              {error && (
                <p className="text-center text-red-500 font-medium mt-2">{error}</p>
              )}
            </form>
          ) : (
            <div className="text-center mt-6 p-6 rounded-xl shadow-xl bg-white/90">
              <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
              <p className="text-gray-700">
                You have successfully subscribed! 🎉 <br />
                Please check your inbox for confirmation.
              </p>
            </div>
          )}

          <p className={`font-semibold text-center mt-6 ${textColor}`}>
            We respect your privacy. No spam ever ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
}
