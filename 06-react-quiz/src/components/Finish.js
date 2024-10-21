import { useQuiz } from "../contexts/QuizProvider";

export default function Finish() {
  const { points, totalPoints, highscore, dispatch } = useQuiz();
  const percentage = (points / totalPoints) * 100;

  return (
    <>
      <p className="result">
        You Scored <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">
        (Highscore: <span>{highscore} </span>points)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}
