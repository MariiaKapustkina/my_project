import { useState } from "react";
import { getZodiacSign } from "../../utils/getZodiacSign";
import { quiz } from "../../utils/quizData";

export function useZodiacQuiz() {
  const [mode, setMode] = useState("date");
  const [birthdate, setBirthdate] = useState("");
  const [dateZodiac, setDateZodiac] = useState(null);
  const [quizZodiac, setQuizZodiac] = useState(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsSpinning(false);
    setStep(0);
    setAnswers([]);
    if (newMode === "date") setDateZodiac(null);
    if (newMode === "quiz") setQuizZodiac(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSpinning(true);

    const [year, month, day] = birthdate.split("-").map(Number);
    const sign = getZodiacSign(day, month);

    setTimeout(() => {
      setDateZodiac(sign);
      localStorage.setItem("dateZodiac", sign);
      setIsSpinning(false);
    }, 2000);
  };

  const handleAnswer = (zodiacSign) => {
    const updatedAnswers = [...answers, zodiacSign];
    setAnswers(updatedAnswers);

    if (step + 1 < quiz.length) {
      setStep(step + 1);
    } else {
      setIsSpinning(true);
      setTimeout(() => {
        const counts = {};
        updatedAnswers.forEach((sign) => {
          counts[sign] = (counts[sign] || 0) + 1;
        });
        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        const finalSign = sorted[0][0];

        setQuizZodiac(finalSign);
        localStorage.setItem("quizZodiac", finalSign);
        setIsSpinning(false);
      }, 2000);
    }
  };

  return {
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
  };
}
