import { useEffect, useState, forwardRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const ZodiacCard = forwardRef(({ sign, image, emoji }, ref) => {
  const [flipped, setFlipped] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!flipped || data || error) return;

    const cacheKey = `horoscope-${sign}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      setData(JSON.parse(cached));
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(`https://api.api-ninjas.com/v1/horoscope?zodiac=${sign}`, {
      headers: {
        'X-Api-Key': import.meta.env.VITE_API_KEY,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        if (json && json.horoscope && json.sign && json.date) {
          setData(json);
          localStorage.setItem(cacheKey, JSON.stringify(json)); // 👈 КЕШ
        } else {
          throw new Error('Invalid response structure');
        }
      })
      .catch((err) => {
        console.error('Could not get a horoscope:', err);
        setError('Failed to load horoscope. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [flipped, sign, data, error]);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="w-64 h-96 perspective cursor-pointer rounded-xl bg-black-500/40 shadow-lg shadow-yellow-500/50"
      ref={ref}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden">
          <img src={image} alt={sign} className="w-full h-full object-cover" />
        </div>

        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-black/80 text-white rounded-xl p-4 overflow-y-auto">
          <h2 className="text-xl font-bold text-center capitalize">
            {sign}
            {emoji}
          </h2>

          {isLoading && (
            <div className="flex justify-center items-center h-full">
              <CircularProgress color="inherit" size={40} />
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center h-full text-red-400 text-sm">
              <p>{error}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setError(null);
                  setData(null);
                  setFlipped(false);
                }}
                className="mt-2 px-3 py-1 bg-red-500/30 rounded hover:bg-red-500/50 transition"
              >
                Try again
              </button>
            </div>
          )}

          {!isLoading && !error && data && (
            <>
              <p className="text-sm text-center mt-2">"{data.horoscope}"</p>
              <p className="text-xs mt-4 text-center text-600">{data.date}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default ZodiacCard;
