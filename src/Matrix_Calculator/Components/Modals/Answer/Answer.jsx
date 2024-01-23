import React, { useEffect, useState } from "react";
import "./modals.css";
function perSquare(num) {
  // Check if the square root is an integer
  const squareRoot = Math.sqrt(num);
  return squareRoot === Math.floor(squareRoot);
}
function Answer_Matrix(array, size) {
  var boxes = [];
  if (size === 1) {
    boxes.push(
      <input className="box answer_box" key={1} value={array}></input>
    );
    return boxes;
  } else if (perSquare(array.length)) {
    for (let i = 0; i < size * size; i++) {
      boxes.push(
        <input className="box answer_box" key={i} value={array[i]}></input>
      );
    }
  } else {
    for (let i = 0; i < size; i++) {
      boxes.push(
        <input className="box answer_box" key={i} value={array[i]}></input>
      );
    }
  }
  return boxes;
}
function evt_matrix(array, size) {
  var boxes = [];
  for (let i = 0; i < size; i++) {
    boxes.push(
      <input
        className="box answer_box"
        key={i}
        value={array[i][0] + " + (" + array[i][1] + ")j"}
      ></input>
    );
  }
  return boxes;
}
function lu_matrix(array, size) {
  var boxes = [];
  for (let i = 0; i < size; i++) {
    boxes.push(
      <input className="box answer_box" key={i} value={array[i]}></input>
    );
  }
  return boxes;
}
function evl_matrix(array, size) {
  var boxes = [];
  for (let i = 0; i < size; i++) {
    let ans = array[i];
    if (i % 2 !== 0) {
      ans = array[i] + " j";
    }
    boxes.push(<input className="box answer_box" key={i} value={ans}></input>);
  }
  return boxes;
}
function valid_array(array) {
  if (Number.isInteger(array)) {
    return true;
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i].length === 0) {
      return false;
    }
  }
  return true;
}
function Answer(props) {
  const { closeModal, input, answer } = props;
  const LUD = ["D", "L", "U"];
  const [array, setArray] = useState([]);
  useEffect(() => {
    const resultArray = input.trim().split(/\s+/).map(Number);
    setArray([...resultArray]);
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
  const gridStyle2 = {
    display: "grid",
    gridTemplateColumns: `repeat(${
      perSquare(answer[0] ? answer[0].length : 1) ? size : 1
    }, fit-content(1000px))`, // Adjust the box width as needed
    gridGap: "2px", // Adjust the gap between boxes as needed
    placeItems: "center center",
    margin: "auto auto",
    padding: "5px 5px",
    border: "1px solid white",
    borderRadius: "0px",
    borderTop: "none",
    borderBottom: "none",
  };
  const evtStyle = {
    display: "flex",
    flexDirection: "column", // Adjust the box width as needed
    placeItems: "center center",
    margin: "20px 10px",
    borderRadius: "0px",
    borderTop: "none",
    borderBottom: "none",
  };
  const evtStyle2 = {
    display: "grid",
    gridTemplateColumns: `repeat(${
      answer[0] ? answer[0].length + 1 : null
    }, auto)`, // Adjust the box width as needed
    gridGap: "30px", // Adjust the gap between boxes as needed
    placeItems: "center center",
    margin: "auto auto",
    padding: "5px 5px",
    borderRadius: "0px",
    borderTop: "none",
    borderBottom: "none",
  };
  return (
    <>
      {!props.error &&
        !props.evl &&
        !props.lu &&
        !props.chp &&
        !props.svd &&
        !props.evt &&
        valid_array(array) && (
          <div className="modal_background" onClick={closeModal}>
            <div className="modal">
              <p className="head">{props.operation}</p>
              <div className="answer">
                <div className="ques_matrix" style={gridStyle}>
                  {Answer_Matrix(array, size)}
                </div>
                <div className="equal_sign">=</div>
                <div
                  className="ques_matrix"
                  style={answer[0] ? gridStyle2 : gridStyle}
                >
                  {Answer_Matrix(
                    answer[0] ? answer[0] : answer,
                    answer[0] ? size : 1
                  )}
                </div>
              </div>
              <button onClick={closeModal}>OK</button>
            </div>
          </div>
        )}
      {!props.error &&
        props.evl &&
        !props.lu &&
        !props.svd &&
        !props.chp &&
        !props.evt &&
        valid_array(array) && (
          <div className="modal_background" onClick={closeModal}>
            <div className="modal evt_modal">
              <p className="head">{props.operation}</p>
              <div className="evt_answer">
                <div className="ques_matrix" style={gridStyle}>
                  {Answer_Matrix(array, size)}
                </div>
                <div style={evtStyle2}>
                  {answer.map((answer, index) => (
                    <div className="ques_matrix" style={evtStyle} key={index}>
                      <p
                        style={{
                          color: "white",
                          fontSize: "1.5rem",
                          margin: "20px",
                        }}
                      >
                        Value{index + 1}
                      </p>
                      {evl_matrix(answer, answer.length)}
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={closeModal}>OK</button>
            </div>
          </div>
        )}
      {!props.error &&
        !props.evl &&
        props.lu &&
        !props.svd &&
        !props.chp &&
        !props.evt &&
        valid_array(array) && (
          <div className="modal_background" onClick={closeModal}>
            <div className="modal">
              <p className="head">{props.operation}</p>
              <div className="answer">
                <div className="ques_matrix" style={gridStyle}>
                  {Answer_Matrix(array, size)}
                </div>
                <div className="equal_sign">=</div>
                {answer.map((answer, index) => (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: "1.5rem",
                      }}
                    >
                      {LUD[index]}
                    </p>
                    <div className="ques_matrix" style={gridStyle}>
                      {lu_matrix(answer, answer.length)}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={closeModal}>OK</button>
            </div>
          </div>
        )}
      {!props.error &&
        !props.evl &&
        !props.lu &&
        props.svd &&
        !props.chp &&
        !props.evt &&
        valid_array(array) && (
          <div className="modal_background" onClick={closeModal}>
            <div className="modal">
              <p className="head">{props.operation}</p>
              <div className="answer">
                <div className="ques_matrix" style={gridStyle}>
                  {Answer_Matrix(array, size)}
                </div>
                <div className="equal_sign">=</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: "1.5rem",
                    }}
                  >
                    U
                  </p>
                  <div className="ques_matrix" style={gridStyle}>
                    {Answer_Matrix(answer[0], Math.sqrt(answer[0].length))}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: "1.5rem",
                    }}
                  >
                    S
                  </p>
                  <div className="ques_matrix" style={gridStyle}>
                    {Answer_Matrix(answer[1], Math.sqrt(answer[0].length))}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: "1.5rem",
                    }}
                  >
                    V
                  </p>
                  <div className="ques_matrix" style={gridStyle}>
                    {Answer_Matrix(answer[2], Math.sqrt(answer[2].length))}
                  </div>
                </div>
              </div>
              <button onClick={closeModal}>OK</button>
            </div>
          </div>
        )}
      {!props.error &&
        !props.evl &&
        !props.lu &&
        !props.svd &&
        props.chp &&
        !props.evt && (
          <div className="modal_background" onClick={closeModal}>
            <div className="modal">
              <p className="head">{props.operation}</p>
              <div className="answer">
                <div className="ques_matrix" style={gridStyle}>
                  {Answer_Matrix(array, size)}
                </div>
                <div className="equal_sign">=</div>
                <div
                  className="ques_matrix"
                  style={answer[0] ? gridStyle2 : gridStyle}
                >
                  <p
                    style={{
                      color: "white",
                      fontSize: "1.5rem",
                      textAlign: "center",
                      lineHeight: "3rem",
                    }}
                  >
                    {answer}
                  </p>
                </div>
              </div>
              <button onClick={closeModal}>OK</button>
            </div>
          </div>
        )}
      {!props.error &&
        !props.evl &&
        !props.lu &&
        !props.svd &&
        !props.chp &&
        props.evt &&
        valid_array(array) && (
          <div className="modal_background" onClick={closeModal}>
            <div className="modal evt_modal">
              <p className="head">{props.operation}</p>
              <div className="evt_answer">
                <div className="ques_matrix" style={gridStyle}>
                  {Answer_Matrix(array, size)}
                </div>
                <div style={evtStyle2}>
                  {answer.map((answer, index) => (
                    <div className="ques_matrix" style={evtStyle} key={index}>
                      <p
                        style={{
                          color: "white",
                          fontSize: "1.5rem",
                          margin: "20px",
                        }}
                      >
                        Vector{index + 1}
                      </p>
                      {evt_matrix(answer, answer.length)}
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={closeModal}>OK</button>
            </div>
          </div>
        )}
      {props.error && (
        <div className="modal_background" onClick={closeModal}>
          <div className="modal">
            <p className="head" style={{ color: "red" }}>
              ERROR
            </p>
            <div className="error">
              <strong>{answer}</strong>.
            </div>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Answer;
