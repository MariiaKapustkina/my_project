export default function ResultCard({ sign }) {
  return (
    <div className="text-2xl font-semibold mt-6 text-center bg-purple-700/40 py-6 px-4 rounded-xl">
      Your zodiac sign: 🌙 <span className="font-bold">{sign}</span>
    </div>
  );
}
