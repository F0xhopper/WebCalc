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

    for (let i = 0; i < ioText.length; i++) {
      // Check if negative number then read until end of negative
      if (ioText[i] === "-" && (i === 0 || !/[0-9.]/.test(ioText[i - 1]))) {
        let j = i + 1;
        while (j < ioText.length && /[0-9.]/.test(ioText[j])) {
          j++;
        }
        stringWithBracketsForNegatives.push(`${ioText.substring(i, j)}`);
        i = j - 1;
      } else {
        // Check if posotive number, then read until end of number
        if (/[0-9.]/.test(ioText[i])) {
          let j = i;
          // Read until the end of the number
          while (j < ioText.length && /[0-9.]/.test(ioText[j])) {
            j++;
          }
          stringWithBracketsForNegatives.push(ioText.substring(i, j));
          i = j - 1;
        } else {
          // Adds the none operands to the array
          stringWithBracketsForNegatives.push(ioText[i]);
        }
      }
    }
    // Seperate all operands and operators into two arrays
    let operatorFromStartArray = [];
    let operandFromStartArray = [];
    stringWithBracketsForNegatives.forEach((item) => {
      if (!isNaN(item)) {
        operandFromStartArray.push(item);
      } else {
        operatorFromStartArray.push(item);
      }
    });
    // Arrays for calculating
    let operands = operandFromStartArray.map(Number);
    let operators = operatorFromStartArray;

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

