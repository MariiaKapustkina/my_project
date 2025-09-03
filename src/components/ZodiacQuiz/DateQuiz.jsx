import Spinner from "./Spinner";

export default function DateQuiz({ birthdate, setBirthdate, handleSubmit, isSpinning }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold pb-6">Find your zodiac sign:</h2>

      {isSpinning ? (
        <Spinner text="Calculating..." />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white text-black"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-yellow-600 text-xl text-black font-semibold rounded hover:bg-yellow-400 transition"
          >
            Discover
          </button>
        </form>
      )}
    </div>
  );
}
