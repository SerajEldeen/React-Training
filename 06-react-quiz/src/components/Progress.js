import { useQuiz } from "../contexts/QuizProvider";

export default function Progress() {
  const { index, numQuestion, points, totalPoints } = useQuiz();
  return (
    <header className="progress">
      <progress value={index} max={numQuestion}></progress>
      <p>
        Question <strong>{index + 1}</strong>/{numQuestion}
      </p>
      <p>
        {points}/{totalPoints}
      </p>
    </header>
  );
}
