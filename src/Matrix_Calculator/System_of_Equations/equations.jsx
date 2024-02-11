// eslint-disable-next-line react-hooks/exhaustive-deps
import { React, useState, useEffect } from "react";
import "./equations.css";
import Navbar from "../Components/Final_Note/navbar";
import Navbar1 from "../Components/Final_Note/navbar1";
import Answer from "./Answer/Answer";
function Equations() {
  const [count, setCount] = useState(3);
  const [clr, setClr] = useState(false);
  const [boxValues, setBoxValues] = useState("");
  const [boxValues2, setBoxValues2] = useState("");
  const [modal, setModal] = useState(false);
  const [answer, setAnswer] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    setBoxValues(Array(count * count).fill(""));
    setBoxValues2(Array(count).fill(""));
  }, [count]);
  useEffect(() => {
    setBoxValues(Array(count * count).fill(""));
    setBoxValues2(Array(count).fill(""));
  }, [clr]);
  const closeModal = () => {
    setModal(false);
  };
  function inc() {
    setCount(count + 1);
  }
  function dec() {
    if (count === 1) {
      alert("Matrix of 0x0 is not valid.");
      return;
    }
    setCount(count - 1);
  }
  function clear() {
    setClr(!clr);
  }
  useEffect(() => {}, [clr]);
  const handleButtonClick = async (e) => {
    let newJoke;
    if (boxValues && boxValues2) {
      newJoke = {
        text1: boxValues.join(" "),
        text2: boxValues2.join(" "),
      };
    }

    const response = await fetch("https://matrix-calculator-backend.onrender.com/sol", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newJoke),
    });
    if (response.status === 200) {
      const answer = await response.json();
      // setAnswer(ans);
      setModal(true);
      // setOperation(e.target.value);
      if (typeof answer === "string") {
        setError(true);
        setAnswer(answer);
      } else {
        setError(false);
        setAnswer(answer[0]);
      }
    }
  };
  const handleBoxChange = (index, value) => {
    const newBoxValues = [...boxValues];
    if (value[value.length - 1] === " ") {
      return;
    }
    newBoxValues[index] = value;
    if ((index + 1) % count === 0 && index + 1 !== count * count) {
      newBoxValues[index] += "\n";
    }
    setBoxValues([...newBoxValues]);
  };
  const handleBoxChange2 = (index, value) => {
    const newBoxValues = [...boxValues2];
    if (value[value.length - 1] === " ") {
      return;
    }
    newBoxValues[index] = value;
    if ((index + 1) % count !== 0) {
      newBoxValues[index] += "\n";
    }
    setBoxValues2([...newBoxValues]);
  };
  const renderBoxes = () => {
    let ind = 0;
    return Array.from({ length: count * count }, (_, index) => (
      <div className="part_eqn">
        <input
          className="box"
          key={index + "1"}
          value={boxValues[index]}
          onChange={(e) => handleBoxChange(index, e.target.value)}
        />
        <label>x{ind === count ? (ind = 1) : ++ind}</label>
        {ind !== count ? <label className="plus_sign">+</label> : null}
        {ind === count ? <label className="equal_sign">=</label> : null}
        {ind === count ? (
          <input
            className="box"
            key={index + "2"}
            value={boxValues2[(index + 1) / count - 1]}
            onChange={(e) =>
              handleBoxChange2((index + 1) / count - 1, e.target.value)
            }
          ></input>
        ) : null}
      </div>
    ));
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${count}, 0.2fr)`, // Adjust the box width as needed
    placeItems: "center center",
    placeContent: "center",
    padding: "5px 15px",
  };
  return (
    <div>
      <Navbar1 />
      {modal ? (
        <Answer
          closeModal={closeModal}
          answer={answer}
          inputValue={boxValues}
          inputValue2={boxValues2}
          error={error}
        />
      ) : null}
      <div className="system_of_eqns">
        <Navbar />
        <div className="eqn_jsx">
          <h1> System of Equations</h1>
          <p>
            Enter coefficients of your system into the input fields. Leave cells
            empty for variables, which do not participate in your equations.
          </p>
          <h2>System of Equations:</h2>
          <div className="eqnBoxes" style={gridStyle}>
            {/* Render the grid of boxes */}
            {renderBoxes()}
          </div>
          <div className="eqn_buttons">
            <button onClick={clear}>Clear</button>
            <button style={{ fontSize: "20px" }} onClick={inc}>
              +
            </button>
            <button style={{ fontSize: "20px" }} onClick={dec}>
              -
            </button>
            <button onClick={handleButtonClick}>Solve</button>
          </div>
          <hr></hr>
        </div>
      </div>
    </div>
  );
}
export default Equations;
