import loader from "../../assets/images/loading.png";

export default function Spinner({ text }) {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="w-28 h-28 rounded-full animate-spin-slow flex items-center justify-center">
        <img src={loader} alt="zodiac wheel" />
      </div>
      <p className="text-white font-semibold">{text}</p>
    </div>
  );
}
