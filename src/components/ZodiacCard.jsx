import { useEffect, useState, forwardRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const ZodiacCard = forwardRef(({ sign, image, emoji }, ref) => {
  const [flipped, setFlipped] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (flipped && !data) {
      setIsLoading(true);
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
          } else {
            console.error(
              'Unable to get a horoscope: Invalid response structure or missing data',
              json
            );
          }
        })
        .catch((err) => console.error('Could not get a horoscope:', err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [flipped, sign, data]);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="w-64 h-96 perspective cursor-pointer rounded-xl bg-black-500/40 shadow-lg shadow-yellow-500/50"
      ref={ref}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${flipped ? 'rotate-y-180' : ''}`}
      >
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden">
          <img src={image} alt={sign} className="w-full h-full object-cover" />
        </div>

        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-black/80 text-white rounded-xl p-4 overflow-y-auto">
          <h2 className="text-xl font-bold text-center capitalize">{sign}{emoji}</h2>
          {data ? (
            <>
              <p className="text-sm text-center mt-2">"{data.horoscope}"</p>
              <p className="text-xs mt-4 text-center text-600">
                {data.date}
              </p>
            </>
          ) : (
            <div  className="flex justify-center items-center h-full">
              <CircularProgress color="inherit" size={40} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ZodiacCard;