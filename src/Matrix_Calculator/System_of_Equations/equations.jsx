import {React,useState} from "react"
import "./equations.css"
import Navbar from "../Components/Final_Note/navbar";
import Navbar1 from "../Components/Final_Note/navbar1";
import Footer from "../Components/Final_Note/Footer";
function Equations(){
    const [isTick,setTick]=useState(true);
    function tick(){
        setTick(!isTick);
    }
    return (
        <div>
            <Navbar1 />
            <div className="system_of_eqns">
                <Navbar />
                <div className="eqn_jsx">
                    <h1> System of Equations</h1>
                    <p>Enter coefficients of your system into the input fields. Leave cells empty for variables, which do not participate in your equations. To input fractions use &nbsp; <strong style={{color:"black", backgroundColor:"white", borderRadius:"2px", padding:"3px"}}>/&nbsp;:&nbsp; 1/3.</strong></p>
                    <h2>System of Equations:</h2>
                    <div className="solve_deter">
                        <select>
                            <option>Solve By Linear Least Squares Method</option>
                            <option>Solve By Gaussian Elimination</option>
                            <option>Solve By Gauss-Jordan Elimination</option>
                            <option>Solve By Cramer's Rule</option>
                            <option>Solve Using the Inverse Matrix</option>
                            <option>Montante's Method (Bareiss Algorithm)</option>
                            <option>Test for Compatibility</option>
                        </select>
                        <button>Solve</button>
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
                    <Footer />
                </div>
            </div>
        </div>
    )
}
export default Equations;