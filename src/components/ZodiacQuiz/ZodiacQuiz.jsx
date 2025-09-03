import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { useZodiacQuiz } from './useZodiacQuiz';
import DateQuiz from './DateQuiz';
import NatureQuiz from './NatureQuiz';
import ResultCard from './ResultCard';

export default function ZodiacQuiz() {
  const { theme } = useContext(ThemeContext);

  const {
    mode,
    birthdate,
    setBirthdate,
    dateZodiac,
    quizZodiac,
    step,
    quiz,
    isSpinning,
    handleModeChange,
    handleSubmit,
    handleAnswer,
  } = useZodiacQuiz();

  const containerClasses = `
    w-full max-w-md md:max-w-lg p-6 md:p-8 rounded-2xl border 
    ${
      theme === 'dark'
        ? 'bg-black/60 border-white/40 text-white'
        : 'bg-white/50 border-black/50 text-black backdrop-blur-md'
    }
    backdrop-blur-sm
  `;

  const buttonClasses = (active) =>
    `px-4 py-2 text-lg rounded transition-colors duration-200 ${
      active
        ? theme === 'dark'
          ? 'bg-yellow-600 text-black'
          : 'bg-yellow-500 text-black'
        : theme === 'dark'
          ? 'bg-white/20 hover:bg-white/30 text-white'
          : 'bg-white/50 hover:bg-white/60 text-black'
    }`;

  return (
    <div className={containerClasses}>
      <div className="flex flex-col lg:flex-row justify-center gap-6 mb-6">
        <button
          onClick={() => handleModeChange('date')}
          className={buttonClasses(mode === 'date')}
        >
          By date
        </button>
        <button
          onClick={() => handleModeChange('quiz')}
          className={buttonClasses(mode === 'quiz')}
        >
          By nature
        </button>
      </div>

      {mode === 'date' && !dateZodiac && (
        <DateQuiz
          birthdate={birthdate}
          setBirthdate={setBirthdate}
          handleSubmit={handleSubmit}
          isSpinning={isSpinning}
        />
      )}

      {mode === 'date' && dateZodiac && <ResultCard sign={dateZodiac} />}

      {mode === 'quiz' && !quizZodiac && (
        <NatureQuiz
          step={step}
          quiz={quiz}
          handleAnswer={handleAnswer}
          isSpinning={isSpinning}
        />
      )}

      {mode === 'quiz' && quizZodiac && <ResultCard sign={quizZodiac} />}
    </div>
  );
}
