import React, { useState, useEffect } from "react";

const renderboxes = (boxValues, boxValues2, count) => {
  let ind = 0;
  return Array.from({ length: count * count }, (_, index) => (
    <div className="part_eqn">
      <input
        className="box"
        style={{ textAlign: "center" }}
        key={index + "index"}
        value={boxValues[index]}
      />
      <label>x{ind === count ? (ind = 1) : ++ind}</label>
      {ind !== count ? <label className="plus_sign">+</label> : null}
      {ind === count ? <label className="equal_sign">=</label> : null}
      {ind === count ? (
        <input
          className="box"
          style={{ textAlign: "center" }}
          key={index + "indeX"}
          value={boxValues2[(index + 1) / count - 1]}
          readOnly
        ></input>
      ) : null}
    </div>
  ));
};
const renderAnswer = (answer) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        textAlign: "center",
      }}
    >
      {answer.map((ans, index) => (
        <div
          style={{ display: "flex", flexDirection: "column" }}
          key={index + "Index"}
        >
          <p style={{ fontSize: "1.5rem", color: "white", fontWeight: "900" }}>
            x{index + 1}
          </p>
          <input
            className="box"
            value={ans}
            style={{ textAlign: "center" }}
            readOnly
          ></input>
        </div>
      ))}
    </div>
  );
};
function Answer(props) {
  const { closeModal, inputValue, inputValue2, answer } = props;
  const { error } = props;
  const [array, setArray] = useState([]);
  const [array2, setArray2] = useState([]);
  useEffect(() => {
    setArray([...inputValue]);
    setArray2([...answer]);
  }, []);
  const size = Math.sqrt(array.length);
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  });
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${size}, fit-content(1000px))`, // Adjust the box width as needed
    gridGap: "2px", // Adjust the gap between boxes as needed
    placeItems: "center center",
    margin: "auto auto",
    padding: "5px 5px",
    border: "1px solid white",
    borderRadius: "0px",
    borderTop: "none",
    borderBottom: "none",
  };
  return (
    <div>
      <>
        {!error && (
          <div className="modal_background" onClick={closeModal}>
            <div className="modal">
              <p className="head">System of Equations</p>
              <div className="answer">
                <div className="ques_matrix" style={gridStyle}>
                  {renderboxes(inputValue, inputValue2, inputValue2.length)}
                </div>
              </div>
              <div className="answer_values">{renderAnswer(array2)}</div>
              <button onClick={closeModal}>OK</button>
            </div>
          </div>
        )}
        {error && (
          <div className="modal_background" onClick={closeModal}>
            <div className="modal">
              <p className="head" style={{ color: "red" }}>
                ERROR
              </p>
              <div className="error">
                <strong>{answer}</strong>
              </div>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default Answer;
