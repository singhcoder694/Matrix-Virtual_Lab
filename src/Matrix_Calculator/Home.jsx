import React, { useState } from "react";
import Matrix from "./Components/Matrix";
import Footer from "./Components/Final_Note/Footer";
import "./Home.css";
import Navbar from "./Components/Final_Note/navbar";
import Navbar1 from "./Components/Final_Note/navbar1";
import Answer from "./Components/Modals/Answer/TwoMatrix/Answer";
function Home() {
  const reference = [
    ["Determinant", "images/determinant.jpeg"],
    ["Adjoint", "images/adjoint.jpeg"],
    ["Addition", "images/addition.jpeg"],
    ["Division", "images/division.png"],
    ["Multiplication", "images/Multiplication.jpeg"],
    ["Subtraction", "images/subtraction.png"],
    ["Inverse", "images/inverse.jpeg"],
    ["Row Reduced Echelon Form", "images/rre.jpeg"],
  ];
  const [modal, setModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [operation, setOperation] = useState("");
  const [answer, setAnswer] = useState([]);
  const [error, setError] = useState(false);
  const [dim1, setDim1] = useState(0);
  const [dim2, setDim2] = useState(0);
  const handelInputChange = (value) => {
    setInputValue(value);
  };
  const handelInputChange2 = (value) => {
    setInputValue2(value);
  };
  const closeModal = () => {
    setModal(false);
  };
  const handleButtonClick = async (e) => {
    setOperation(e.target.value.slice(0, -3));
    let row = 0;
    let col = 0;
    const newJoke = {
      text1: inputValue,
      text2: inputValue2,
    };
    for (let i = 0; i < Array.from(inputValue).length; i += 1) {
      if (inputValue[i] === "\n") {
        row += 1;
      } else if (inputValue[i] === " ") {
        continue;
      } else if (row === 0) {
        col += 1;
      }
    }
    row += 1;
    const response = await fetch(
      `http://localhost:8000/${e.target.value.slice(-3)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newJoke),
      }
    );
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
        setAnswer(answer);
        setDim1(row);
        setDim2(col);
      }
    }
  };
  return (
    <div>
      <Navbar1 />
      {modal ? (
        <Answer
          closeModal={closeModal}
          row={dim1}
          col={dim2}
          answer={answer}
          inputValue={inputValue}
          inputValue2={inputValue2}
          error={error}
          operation={operation}
        />
      ) : null}
      <div className="matrix_calc">
        <Navbar />
        <div>
          <div className="calculations">
            <Matrix name="A" onInputChange={handelInputChange} />
            <div className="middle_part">
              <button
                className="calc"
                onClick={handleButtonClick}
                value="Division div"
              >
                A / B
              </button>
              <button
                className="calc"
                onClick={handleButtonClick}
                value="Multiplication mul"
              >
                A x B
              </button>
              <button
                className="calc"
                onClick={handleButtonClick}
                value="Addition add"
              >
                A + B
              </button>
              <button
                className="calc"
                onClick={handleButtonClick}
                value="Subtraction sub"
              >
                A - B
              </button>
            </div>
            <Matrix name="B" onInputChange={handelInputChange2} />
          </div>
          {/* <div className="expression">
                    <label for="expressions"></label>
                    <input type="text" list="expressions" name="expressions" id="input_expressions" placeholder="2A+3B"></input>
                    <datalist id="expressions">
                        <option value="A*X=B"></option>
                        <option value="A^-1"></option>
                        <option value="&#123;&#123;1,2,3&#125;,&#123;4,5,6&#125;,&#123;7,2,9&#125;&#125;^(-1)">inverse of input values</option>
                        <option value="A*X=B, Y+A=B">multiplication and addition</option>
                        <option value="determinant(A)">Determinant</option>
                        <option value="inverse(A)">inverse of A</option>
                        <option value="transpose(A)">transpose of A</option>
                        <option value="rank(A)">rank of A</option>
                        <option value="adjugate(A)">adjugate of A</option>
                        <option value="pseudoinverse(A)">pseudoinverse of A</option>
                        <option value="eigenvalues(A)">eigenvalues of A</option>
                        <option value="eigenvectors(A)">eigenvectors of A</option>
                        <option value="LU decomposition of A">LU Decomposition</option>
                        <option value="Cholesky-Decomposition of A">Cholesky Decomposition</option>
                        <option value="Singular Value Decomposition of A">SVD of A</option>
                        <option value="QR Decomposition of A">QR Decomposition</option>
                        <option value="Jordan Decomposition of A">Jordan Decomposition</option>
                        <option value="A^(1/2)">sqrt of A</option>
                        <option value="log(A)">log of A</option>
                        <option value="exp(A)">exponential of A</option>
                        <option value="sin(A)">sin of A</option>
                        <option value="cos(A)">cos of A</option>
                        <option value="tan(A)">tan of A</option>
                        <option value="arcsin(A)">sin inverse of A</option>
                        <option value="arccos(A)">cos inverse of A</option>
                        <option value="arctan(A)">tan inverse of A</option>
                    </datalist>
                    <button>=</button>
                </div> */}
          <hr></hr>
          <Footer reference={reference} />
        </div>
      </div>
    </div>
  );
}
export default Home;
