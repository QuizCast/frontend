"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { removeParticipant, cleanQuestions } from "@/store/Slices/participantSlice";
import { removeRoom } from "@/store/Slices/roomSlice";
import API_CONFIG from "../../API";

const Qdisplay = ({ setRightComponent, setLeftComponent }) => {
  const dispatch = useDispatch();
  const { questions, participant } = useSelector((state) => ({
    questions: state.participant.Questions,
    participant: state.participant.Participant,
  }));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (questions.length === 0 || quizCompleted) return;

    const currentQuestion = questions[0][currentQuestionIndex];
    setTimeLeft(currentQuestion.time);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitAnswer(true); // Auto-submit when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, questions, quizCompleted]);

  const handleSubmitAnswer = async (isTimeOut = false) => {
    if (!isTimeOut && !selectedAnswer) return;

    const currentQuestion = questions[0][currentQuestionIndex];
    const isCorrect = !isTimeOut && selectedAnswer === currentQuestion.correct_answer;

    const pointsEarned = isCorrect ? 10 : 0;
    setScore((prev) => prev + pointsEarned);

    const payload = {
      id: participant.id,
      room_key: participant.room_key,
      name: participant.name,
      score: score + pointsEarned,
    };

    try {
      await submitScore(payload);
      setAnswerSubmitted(true);

      setTimeout(() => {
        if (currentQuestionIndex < questions[0].length - 1) {
          goToNextQuestion();
        } else {
          setQuizCompleted(true);
        }
      }, 1000);
    } catch (err) {
      setError("Failed to submit score. Please try again.");
    }
  };

  const submitScore = async (payload) => {
    const END_POINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_CONFIG.updateScore}`;

    const response = await fetch(END_POINT, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Score submission failed: ${response.statusText}`);
    }

    dispatch({ type: "participant/updateScore", payload });
  };

  const goToNextQuestion = () => {
    setAnswerSubmitted(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const resetParticipant = () => {
    dispatch(removeParticipant());
    dispatch(cleanQuestions());
    dispatch(removeRoom());
    setRightComponent("Join");
    setLeftComponent("Welcome");
  };

  if (quizCompleted) {
    return (
      <div className="text-center p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-xl">Your Total Score: {score}</p>
        <button
          onClick={() => resetParticipant()}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Return
        </button>
      </div>
    );
  }

  const currentQuestion = questions[0][currentQuestionIndex];

  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="mr-2 font-medium">Time Left:</span>
          <div
            className={`px-3 py-1 rounded-full ${
              timeLeft <= 5 ? "bg-red-500 text-white" : "bg-blue-100"
            }`}
          >
            {timeLeft} sec
          </div>
        </div>
        <p className="font-medium">Score: {score}</p>
      </div>

      {/* Question */}
      <div className="rounded-lg border p-4">
        <h5 className="text-xl font-medium text-gray-900 mb-4">
          Question {currentQuestionIndex + 1}/{questions[0].length}
        </h5>
        <p className="mb-6 text-gray-700">{currentQuestion.question}</p>

        <ul className="space-y-3">
          {currentQuestion.answers.map((answer, idx) => (
            <li key={idx}>
              <button
                onClick={() => setSelectedAnswer(answer)}
                disabled={answerSubmitted}
                className={`w-full py-3 rounded-lg text-sm transition ${
                  answerSubmitted
                    ? answer === currentQuestion.correct_answer
                      ? "bg-green-500"
                      : selectedAnswer === answer
                      ? "bg-red-500"
                      : "bg-gray-500"
                    : selectedAnswer === answer
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-blue-200"
                }`}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => handleSubmitAnswer()}
          disabled={!selectedAnswer || answerSubmitted}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg disabled:opacity-50"
        >
          Submit Answer
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Qdisplay;
