import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your  income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isopen, setIsOpen] = useState(true);
  function handlePrevious() {
    if (step > 1) setStep((currStep) => currStep - 1);
  }
  function handleNext() {
    if (step < 3) setStep((currStep) => currStep + 1);
  }
  return (
    <>
      <button
        className="close"
        onClick={() => {
          setIsOpen((isopen) => !isopen);
        }}
      >
        &#10006;
      </button>
      {isopen && (
        <div className="steps">
          <div className="numbers">
            {messages.map((_, index) => (
              <div
                key={index + 1}
                className={`${step >= index + 1 ? "active" : ""}`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              <span> 👈</span> Previous
            </Button>
            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
// for child props
function StepMessage({ step, children }) {
  return (
    <>
      <p className="message">
        <h3>Step {step}</h3>
        {children}
      </p>
    </>
  );
}
function Button({ textColor, bgColor, onClick, children }) {
  return (
    <>
      <button
        style={{ backgroundColor: bgColor, color: textColor }}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
