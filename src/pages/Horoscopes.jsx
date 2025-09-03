import background from '../assets/images/signs-bg.jpg';
import aquarius from '../assets/zodiac/aquarius.png';
import aries from '../assets/zodiac/aries.png';
import cancer from '../assets/zodiac/cancer.png';
import capricorn from '../assets/zodiac/capricorn.png';
import gemini from '../assets/zodiac/gemini.png';
import leo from '../assets/zodiac/leo.png';
import libra from '../assets/zodiac/libra2.png';
import pisces from '../assets/zodiac/pisces.png';
import sagittarius from '../assets/zodiac/sagittarius.png';
import scorpio from '../assets/zodiac/scorpio.png';
import taurus from '../assets/zodiac/taurus2.png';
import virgo from '../assets/zodiac/virgo.png';
import ZodiacCard from '../components/ZodiacCard';

import React, { useState, useEffect, useRef, useContext } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ThemeContext } from '../context/ThemeContext';

const zodiacList = [
  { sign: 'aquarius', emoji: '♒', image: aquarius },
  { sign: 'aries', emoji: '♈', image: aries },
  { sign: 'cancer', emoji: '♋', image: cancer },
  { sign: 'capricorn', emoji: '♑', image: capricorn },
  { sign: 'gemini', emoji: '♊', image: gemini },
  { sign: 'leo', emoji: '♌', image: leo },
  { sign: 'libra', emoji: '♎', image: libra },
  { sign: 'pisces', emoji: '♓', image: pisces },
  { sign: 'sagittarius', emoji: '♐', image: sagittarius },
  { sign: 'scorpio', emoji: '♏', image: scorpio },
  { sign: 'taurus', emoji: '♉', image: taurus },
  { sign: 'virgo', emoji: '♍', image: virgo },
];

export default function Horoscopes() {
  const { theme } = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 768 ? 4 : 6);

  const totalPages = Math.ceil(zodiacList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentZodiacs = zodiacList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => setCurrentPage(value);

  const containerRef = useRef(null);
  const zodiacCardRefs = useRef([]);
  zodiacCardRefs.current = [];
  const addToRefs = (el) => { if (el && !zodiacCardRefs.current.includes(el)) zodiacCardRefs.current.push(el); };

  useEffect(() => {
    const handleResize = () => setItemsPerPage(window.innerWidth < 768 ? 4 : 6);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (containerRef.current && zodiacCardRefs.current.length > 0) {
      zodiacCardRefs.current.forEach((item, index) => {
        if (!item) return;
        if (isMobile) {
          item.animate(
            [{ opacity: 0, transform: 'scale(0.8)' }, { opacity: 1, transform: 'scale(1)' }],
            { duration: 600, delay: index * 100, fill: 'forwards', easing: 'ease-out' }
          );
        } else {
          const { x, y, height, width } = containerRef.current.getBoundingClientRect();
          const targetX = x + width / 2;
          const targetY = y + height / 2;
          const { x: childX, y: childY, height: childHeight, width: childWidth } = item.getBoundingClientRect();
          const distanceX = childX + childWidth / 2;
          const distanceY = childY + childHeight / 2;

          item.animate(
            {
              transform: [
                'translate(0px)',
                `translate(${targetX - distanceX}px,${targetY - distanceY}px)`,
                `translate(${targetX - distanceX}px,${targetY - distanceY}px)`,
                'translate(0px)',
              ],
              easing: ['cubic-bezier(0.68,-.55,.265,1.55)'],
              offset: [0, 0.3, 0.7, 1],
            },
            { delay: (index * 1500) / currentZodiacs.length, duration: 3400 }
          );
        }
      });
    }
  }, []);

  const bgOverlay = theme === 'dark' ? 'bg-black/60' : 'bg-white/30 backdrop-blur-sm';
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';

  return (
    <section className={`relative bg-cover bg-center flex flex-col ${textColor}`} style={{ backgroundImage: `url(${background})` }}>
      <div className={`absolute inset-0 ${bgOverlay} z-0`} />
      <div className="relative z-10">
        <h2 className="text-2xl font-bold flex text-center justify-center pt-5 drop-shadow-lg">
          Choose your sign
        </h2>
      </div>

      <div className="p-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center flex-grow" ref={containerRef}>
        {currentZodiacs.map(({ sign, image, emoji }) => (
          <ZodiacCard key={sign} sign={sign} image={image} emoji={emoji} ref={addToRefs} />
        ))}
      </div>

      <div className="relative z-10 flex justify-center py-4">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="warning"
            sx={{
              '& .MuiPaginationItem-root': {
                color: theme === 'dark' ? 'white' : 'black',
                backgroundColor: theme === 'dark' ? 'rgba(55, 65, 81, 0.7)' : 'rgba(229, 231, 235, 0.7)',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
              },
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: '#f5b505',
                color: 'black',
                fontWeight: 'bold',
              },
              '& .MuiPaginationItem-root:hover': {
                backgroundColor: '#f5b505',
                color: 'black',
              },
            }}
          />
        </Stack>
      </div>
    </section>
  );
}
