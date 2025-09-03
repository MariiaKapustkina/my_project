import Spinner from "./Spinner";

export default function NatureQuiz({ step, quiz, handleAnswer, isSpinning }) {
  if (isSpinning) {
    return <Spinner text="Choosing your sign..." />;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{quiz[step].question}</h2>
      <div className="text-2xl space-y-3">
        {quiz[step].options.map((element, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(element.zodiac)}
            className="block w-full text-left bg-purple-700/30 hover:bg-purple-500 transition px-4 py-2 rounded"
          >
            {element.text}
          </button>
        ))}
      </div>
    </div>
  );
}
