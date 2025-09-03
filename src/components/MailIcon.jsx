import Lottie from 'lottie-react';
import mailAnimation from '../assets/mail.json';
import { useRef } from 'react';

const MailIcon = () => {
  const lottieRef = useRef();

  const handleMouseEnter = () => {
    lottieRef.current?.stop();
    lottieRef.current?.play();
  };

  const handleMouseLeave = () => {
    lottieRef.current?.stop();
  };
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='w-10 h-10 md:w-16 md:h-16 cursor-pointer'>
      <Lottie
        animationData={mailAnimation}
        loop={false}
        lottieRef={lottieRef}
        autoplay={false}
      ></Lottie>
    </div>
  );
};

export default MailIcon;
