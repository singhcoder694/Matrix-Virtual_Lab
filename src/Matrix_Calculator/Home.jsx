import React, { useState } from "react"
import {HiLanguage} from "react-icons/hi2"
import Matrix from "./Components/Matrix";
import Footer from "./Components/Final_Note/Footer";
import { BsArrowLeftRight } from "react-icons/bs";
import "./Home.css"
import Navbar from "./Components/Final_Note/navbar";
import Navbar1 from "./Components/Final_Note/navbar1";
function Home(){
    const [isTick,setTick]=useState(true);
    function tick(){
        setTick(!isTick);
    }
    return (
        <div>
            <Navbar1 />
            <div className="matrix_calc">
                <Navbar />
                <div>
                <div className="calculations">
                    <Matrix name="A"/>
                    <div className="middle_part">
                        <button className="swap" title="Swap Matrices"><BsArrowLeftRight/></button>
                        <button className="calc">A x B</button>
                        <button className="calc">A + B</button>
                        <button className="calc">A - B</button>
                    </div>
                    <Matrix name="B"/>
                </div>
                <div className="expression">
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
                </div>
                <div className="display_decimals">
                    <div>
                        <input onClick={tick} type="checkbox" id="display_decimal" value="Display Decimal" />
                        <label for="display_decimal">Display Decimal</label>
                        <div className={isTick?"digit_unshow":"digit_show"}>
                            <select name="digits" id="digits">
                                <option>Number of Significant digits:</option>
                                <option>Number of Fraction digits:</option>
                            </select>
                            <input type="number" min="1" step="1" placeholder="3" id="value_digits"></input>
                        </div>
                    </div>
                    <div>
                        <button>Clean</button>
                        <button>+</button>
                    </div>
                </div>
                <hr></hr>
                <Footer/>
            </div>
            </div>
        </div>
    )
}
export default Home;