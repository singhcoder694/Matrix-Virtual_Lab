import {React,useState} from "react"
import Navbar1 from "../Components/Final_Note/navbar1";
import Navbar from "../Components/Final_Note/navbar";
import Footer from "../Components/Final_Note/Footer";
import "../Components/style.css"
import "./eigenvalue.css"
import TextArea from "../Components/InputFormat/TextArea";
import InputBox from "../Components/InputFormat/inputBoxes";

function Eigenvalues(){
    const reference=[
        ["Eigen Values", "images/eigen_value.jpeg"],
        ["Eigen Vector", "images/eigen_vector.jpeg"],
        ["Dominant Eigen Vector", "images/dominant_eigenvector.jpeg"],
        ["Characteristic Polynomial", "images/characteristic_polynomial.jpeg"],
        ["LU Decomposition", "images/LU_decomposition.jpeg"],
    ]
    const [modal,setModal]=useState(false);
    const [clr,setClr]=useState(false);
    const [count,setCount]=useState(3);
    const [input,setInput]=useState(true);
    const [inputValue, setInputValue] = useState('');
    const [operation, setOperation]=useState('');
    const [answer, setAnswer]=useState([]);
    const [lu, setLU]=useState(false);
    const [svd, setSVD]=useState(false);
    const [evt, setEvt]=useState(false);
    const [chp, setChp]=useState(false);
    const [evl, setEvl]=useState(false);
    const handleInputChange = (value) => {
        setInputValue(value);
    };
    const handleButtonClick = async (e) => {
        setOperation(e.target.value.slice(0,-3));
        if (e.target.value.slice(-3)==="evt"){
            setEvt(true);
            setLU(false);
            setSVD(false);
            setChp(false);
            setEvl(false);
        }
        if (e.target.value.slice(-3)==="evl"){
            setEvt(false);
            setLU(false);
            setSVD(false);
            setChp(false);
            setEvl(true);
        }
        if (e.target.value.slice(-3)==="lud"){
            setEvt(false);
            setLU(true);
            setSVD(false);
            setChp(false);
            setEvl(false);
        }
        if (e.target.value.slice(-3)==="svd"){
            setEvt(false);
            setLU(false);
            setSVD(true);
            setChp(false);
            setEvl(false);
        }
        if (e.target.value.slice(-3)==="chp"){
            setEvt(false);
            setLU(false);
            setSVD(false);
            setChp(true);
            setEvl(false);
        }
        const newJoke = {
            text:inputValue,
        };
        console.log(newJoke);
        const response= await fetch(`http://localhost:8000/${e.target.value.slice(-3)}`, {
            method:"POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept":"application/json",
            },
            body: JSON.stringify(newJoke)
        })
        if (response.status === 200) {
            const ans = await response.json();
            setAnswer(ans);
            setModal(true);
        } else {
            console.error("Failed to add joke");
        }
    };
    function Opt(){
        setInput(!input);
    }
    function inc(){
        setCount(count+1);
    }
    function dec(){
        if (count==1){
            alert("Matrix of 0x0 is not valid.");
            return;
        }
        setCount(count-1);
    }
    function clear(){
        setClr(!clr);
    }
    const closeModal= ()=>{
        setModal(false);
    } 
    return (
        <div>
            <Navbar1 />
            <div class="eigenvalue_calculator">
                <Navbar />
                <div className="eigen_calc">
                    <p className="eigen_heading">Finding of eigenvalues and eigenvectors</p>
                    <p className="eigen_details">This calculator allows to find <a href="https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors" target="_blank">eigenvalues and eigenvectors</a> using the <a href="https://en.wikipedia.org/wiki/Characteristic_polynomial" target="_blank">Characteristic polynomial</a>.</p>
                    <div className="matrix">
                        {input?<p style={{textAlign:"center", fontSize:"20px", fontWeight:"bold", color:"white"}}>Matrix A</p>:<p style={{textAlign:"center", fontSize:"20px", fontWeight:"bold", color:"white"}}>Matrix A:{count}x{count}</p>}
                        {input?<TextArea evl={evl} lu={lu} chp={chp} svd={svd} evt={evt} cnt={count} reset={clr} modal={modal} closeModal={closeModal} operation={operation} answer={answer} onInputChange={handleInputChange} className="input_area"/>:<InputBox evl={evl} lu={lu} chp={chp} svd={svd} evt={evt} cnt={count} reset={clr} modal={modal} closeModal={closeModal} operation={operation} answer={answer} onInputChange={handleInputChange}/>}
                        <div className="Buttons" style={{justifyContent:"center", marginTop:"10px"}}>
                            <button onClick={Opt}>{input?"Cell":"Box"}</button>
                            <button onClick={clear}>Clear</button>
                            {input?<button style={{fontSize:"20px", color:"black", background:"grey", cursor:"none" }} onClick={inc} disabled>+</button>:<button style={{fontSize:"20px"}} onClick={inc}>+</button>}
                            {input?<button style={{fontSize:"20px", color:"black", background:"grey", cursor:"none"}} onClick={dec} disabled>-</button>:<button style={{fontSize:"20px"}} onClick={dec}>-</button>}
                        </div>
                    </div>
                    <fieldset>
                        <legend style={{color:"white"}}>More:</legend>
                        <div className="more_options_eigen">
                            <button onClick={handleButtonClick} value="Eigen Value evl">Eigen Value</button>
                            <button onClick={handleButtonClick} value="Eigen Vector evt">Eigen Vectors</button>
                            <button onClick={handleButtonClick} value="Characterstic Polynomial chp">Characterstic Polynomial</button>
                            <button onClick={handleButtonClick} value="LU Decomposition lud">LU Decomposition</button>
                            <button onClick={handleButtonClick} value="Singular Value Decomposition svd">Singular Value Decomposition</button>
                        </div>
                    </fieldset>
                    {/* <div className="display_decimals">
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
                    </div> */}
                    <hr></hr>
                    <Footer reference={reference}/>
                </div>
            </div>
        </div>
    )
}
export default Eigenvalues;
// [[[-0.3756403450849266, -0.5377052066737049, -0.754829412424069, -0.5611720930621766, -0.5162182007692336, 0.6469966392206304, -0.7375501427785723, 0.6666272421005333, -0.10783277320343831]], [9.331345372310293, 2.4343363659657435, 4.1406292727526214e-16], [[-0.5557328593248969, -0.5770869393013833, -0.5984410192778699, 0.7242198025460967, 0.017435533289658557, -0.6893487359667801, -0.408248290463863, 0.816496580927726, -0.4082482904638628]]]
