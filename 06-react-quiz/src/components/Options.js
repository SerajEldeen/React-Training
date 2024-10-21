import { useQuiz } from "../contexts/QuizProvider";

export default function Options() {
  const { questions, index, dispatch, answer } = useQuiz();
  const question = questions[index];
  const hasAnswered = answer !== null;

  return (
    <>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""}
            ${
              hasAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={index}
            value={option}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
}
