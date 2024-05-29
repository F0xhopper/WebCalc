import { useState } from "react";

function App() {
  const [ioText, setIoText] = useState();
  const buttons = [
    "1",
    "2",
    "3",
    "←",
    "4",
    "5",
    "6",
    "x",
    "7",
    "8",
    "9",
    "+",
    "0",
    ".",
    "÷",
    "-",
    "c",
    "=",
  ];
  const calculate = () => {
    const stringWithBracketsForNegatives = [];

    // Add brackets around negative numbers to preserve them
    for (let i = 0; i < ioText.length; i++) {
      if (ioText[i] === "-" && (i === 0 || !/[0-9.]/.test(ioText[i - 1]))) {
        let j = i + 1;
        // Enables the reading of numbers longer than 1 digit after recoginised as negative number
        while (j < ioText.length && /[0-9.]/.test(ioText[j])) {
          j++;
        }
        stringWithBracketsForNegatives.push("(" + ioText.substring(i, j) + ")");
        i = j - 1;
      } else {
        stringWithBracketsForNegatives.push(ioText[i]);
      }
    }

    const processedText = stringWithBracketsForNegatives.join("");

    // Extract operands and operators using regex
    const operandRegex = /-?\d+(\.\d+)?/g;
    const operatorRegex = /[^\d.()-]+/g;

    let operands = processedText.match(operandRegex).map(Number);
    let operators = processedText.match(operatorRegex) || [];
    console.log(processedText, operands, operators);

    // Perform multiplication and division first
    let i = 0;
    while (i < operators.length) {
      if (operators[i] === "x" || operators[i] === "÷") {
        const result =
          operators[i] === "x"
            ? operands[i] * operands[i + 1]
            : operands[i] / operands[i + 1];
        operands.splice(i, 2, result);
        operators.splice(i, 1);
      } else {
        i++;
      }
    }

    // Perform addition and subtraction
    i = 0;
    while (i < operators.length) {
      const result =
        operators[i] === "+"
          ? operands[i] + operands[i + 1]
          : operands[i] - operands[i + 1];
      operands.splice(i, 2, result);
      operators.splice(i, 1);
    }

    console.log(operands, operators);

    // Set the result or handle infinity
    if (String(operands[0]) === "Infinity") {
      setIoText("Not possible!");
      setTimeout(() => {
        setIoText("");
      }, 2000);
    } else {
      setIoText(String(operands[0]));
    }
  };
  return (
    <div className="App">
      <div className="mainCalculatorContainer">
        <div className="screenContainer">
          <h1 className="screenText">{ioText}</h1>
        </div>
        <div className="mainButtonsContainer">
          {buttons.map((button) => (
            <div
              className={
                button == "c" || button == "="
                  ? "buttonContainerLast"
                  : "buttonContainer"
              }
              onClick={() => {
                if (button == "←" && ioText != undefined) {
                  setIoText(ioText.slice(0, -1));
                } else if (button == "c") {
                  setIoText();
                } else if (button == "=") {
                  calculate();
                } else if (ioText) {
                  setIoText(ioText + button);
                } else {
                  setIoText(button);
                }
              }}
            >
              <h1 className="buttonTextContainer">{button}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
