import loader from "../assets/images/loading.png";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <img
        src={loader}
        alt="Loading..."
        className="w-[120px] h-[120px] animate-spin-slow"
      />
    </div>
  );
}