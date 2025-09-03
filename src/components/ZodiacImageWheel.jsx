import zodiacImage from '../assets/images/zodiac-wheel-Photoroom.png';

export default function ZodiacImageWheel() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <img
        src={zodiacImage}
        alt="Zodiac Wheel"
        className="w-[300px] h-[300px] object-contain select-none animate-spin-slow"
        draggable={false}
      />
    </div>
  );
}
