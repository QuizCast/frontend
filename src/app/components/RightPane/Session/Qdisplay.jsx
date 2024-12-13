"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import API_CONFIG from "../../API";

const Qdisplay = () => {
  const dispatch = useDispatch();
  const { questions, participant } = useSelector((state) => ({
    questions: state.participant.Questions,
    participant: state.participant.Participant
  }));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  // Countdown timer effect
  useEffect(() => {
    // Exit if no questions or quiz completed
    if (!questions.length || quizCompleted) return;

    const currentQuestion = questions[0][currentQuestionIndex];
    // Initialize time left for the current question
    setTimeLeft(currentQuestion.time);

    // Create interval for countdown
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        // If time runs out, auto-submit
        if (prevTime <= 0) {
          clearInterval(timer);
          handleSubmitAnswer(true); // Pass true to indicate time-out
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup interval
    return () => clearInterval(timer);
  }, [currentQuestionIndex, questions, quizCompleted]);

  // Handle answer submission
  const handleSubmitAnswer = async (isTimeOut = false) => {
    // If not timed out, require an answer selection
    if (!isTimeOut && !selectedAnswer) return;
    
    const currentQuestion = questions[0][currentQuestionIndex];
    
    // Determine if answer is correct
    const isCorrect = !isTimeOut && selectedAnswer === currentQuestion.correct_answer;
    
    // Calculate time taken
    const timeTaken = Math.floor((Date.now() - (startTime || 0)) / 1000);
    
    // Calculate score based on correctness and time
    const pointsEarned = isCorrect 
      ? Math.max(10 - Math.min(timeTaken, 10), 0)  // Faster answers get more points
      : 0;
    
    const updatedScore = score + pointsEarned;
    setScore(updatedScore);

    // Prepare score submission payload
    const scoreSubmission = {
      id: participant.id,
      room_key: participant.room_key,
      name: participant.name,
      score: updatedScore
    };

    // Construct API endpoint
    const END_POINT = process.env.NEXT_PUBLIC_BACKEND_URL + API_CONFIG.updateScore;

    try {
      const response = await fetch(END_POINT, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scoreSubmission),
      });

      // Log the submission for debugging
      console.log("Score Submission:", scoreSubmission);

      if (!response.ok) {
        throw new Error(`Failed to submit score: ${response.statusText}`);
      }

      // Update Redux store
      dispatch({
        type: 'participant/updateScore', 
        payload: scoreSubmission
      });
    } catch (error) {
      console.error("Failed to submit score:", error);
      // Optionally, add user-facing error handling
    }

    // Prepare for next question or end quiz
    setAnswerSubmitted(true);
    setTimeout(() => {
      if (currentQuestionIndex < questions[0].length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setAnswerSubmitted(false);
        setSelectedAnswer(null);
        setStartTime(Date.now());
      } else {
        setQuizCompleted(true);
      }
    }, 1000);
  };

  // Initialize start time when questions load
  useEffect(() => {
    if (questions.length && !startTime) {
      setStartTime(Date.now());
    }
  }, [questions, startTime]);

  // Loading state
  if (!questions.length) {
    return <p>Loading questions...</p>;
  }

  // Quiz completed state
  if (quizCompleted) {
    return (
      <div className="text-center p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-xl">Your Total Score: {score}</p>
        <button 
          onClick={() => {
            // Optional: Add functionality to restart or go back
            window.location.reload();
          }}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  // Current question
  const currentQuestion = questions[0][currentQuestionIndex];

  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
      {/* Header with timer and score */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="mr-2 font-medium">Time Left:</span>
          <div className={`px-3 py-1 rounded-full ${
            timeLeft <= 5 ? 'bg-red-500 text-white' : 'bg-blue-100'
          }`}>
            {timeLeft} sec
          </div>
        </div>
        <p className="font-medium">Score: {score}</p>
      </div>

      {/* Question container */}
      <div className="relative rounded-lg border-2">
        <div className="p-4 border-b-2">
          {/* Question header */}
          <label className="text-sm font-medium text-gray-500">
            Question {currentQuestionIndex + 1}/{questions[0].length}
          </label>
          
          {/* Question text */}
          <h5 className="text-xl font-medium text-gray-900 dark:text-white mt-2">
            {currentQuestion.question}
          </h5>

          {/* Answer options */}
          <ul className="mt-4 space-y-2">
            {currentQuestion.answers.map((answer, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => setSelectedAnswer(answer)}
                  className={`w-full text-white ${
                    answerSubmitted 
                      ? (answer === currentQuestion.correct_answer 
                          ? "bg-green-500" 
                          : (answer === selectedAnswer ? "bg-red-500" : "bg-gray-500"))
                      : (selectedAnswer === answer 
                          ? "bg-blue-600" 
                          : "bg-slate-950 hover:bg-blue-700")
                  } py-2.5 rounded-lg text-sm transition-colors`}
                  disabled={answerSubmitted}
                >
                  {answer}
                </button>
              </li>
            ))}
          </ul>

          {/* Submit button */}
          <button
            type="button"
            onClick={() => handleSubmitAnswer()}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
            disabled={!selectedAnswer || answerSubmitted}
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Qdisplay;