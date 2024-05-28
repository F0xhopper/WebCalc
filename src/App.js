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
    "/",
    "-",
    "c",
    "=",
  ];
  const calculate = () => {
    const stringWithBracketsAroundNegativeNumbers = [];

    for (let i = 0; i < ioText.length; i++) {
      if (ioText[i] == "-" && !/[0123456789]/.test(ioText[i - 1])) {
        stringWithBracketsAroundNegativeNumbers.push(ioText[i] + ioText[i + 1]);
        i++;
      } else {
        stringWithBracketsAroundNegativeNumbers.push(ioText[i]);
      }
    }
    console.log(stringWithBracketsAroundNegativeNumbers);
    const operands2 = [];
    const operations2 = [];
    stringWithBracketsAroundNegativeNumbers.forEach((element) => {
      // Check if the element is an operand (a number)
      if (!isNaN(parseFloat(element))) {
        operands2.push(element);
      } else {
        // If it's not a number, assume it's an operation
        operations2.push(element);
      }
    });
    console.log(operands2, operations2);

    let operands = operands2.map(Number).map((num) => parseFloat(num));
    let operators = operations2.filter((item) => item !== "");

    let i = 0;
    while (i < operators.length) {
      if (operators[i] === "x" || operators[i] === "/") {
        console.log(operators[i], operands[i], operands[i + 1]);
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
    if (String(operands[0]) == "Infinity") {
      setIoText("Not possible!");
      setTimeout(() => {
        setIoText();
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
