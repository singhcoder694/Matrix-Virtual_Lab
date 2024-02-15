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
        ["Singular Value Decomposition", "images/Singular_Value_Decomposition.jpeg"]
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
    const [error, setError]=useState(false);
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
            setError(false);
        }
        if (e.target.value.slice(-3)==="evl"){
            setEvt(false);
            setLU(false);
            setSVD(false);
            setChp(false);
            setEvl(true);
            setError(false);
        }
        if (e.target.value.slice(-3)==="lud"){
            setEvt(false);
            setLU(true);
            setSVD(false);
            setChp(false);
            setEvl(false);
            setError(false);
        }
        if (e.target.value.slice(-3)==="svd"){
            setEvt(false);
            setLU(false);
            setSVD(true);
            setChp(false);
            setEvl(false);
            setError(false);
        }
        if (e.target.value.slice(-3)==="chp"){
            setEvt(false);
            setLU(false);
            setSVD(false);
            setChp(true);
            setEvl(false);
            setError(false);
        }
        const newJoke = {
            text:inputValue,
        };
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
            if (ans[0]==="M"){
                setError(true);
            }
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
        if (count===1){
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
                    <p className="eigen_details">This calculator allows to find <strong>eigenvalues and eigenvectors</strong> using the <strong>Characteristic polynomial</strong>.</p>
                    <div className="matrix">
                        {input?<p style={{textAlign:"center", fontSize:"20px", fontWeight:"bold", color:"white"}}>Matrix A</p>:<p style={{textAlign:"center", fontSize:"20px", fontWeight:"bold", color:"white"}}>Matrix A:{count}x{count}</p>}
                        {input?<TextArea error={error} evl={evl} lu={lu} chp={chp} svd={svd} evt={evt} cnt={count} reset={clr} modal={modal} closeModal={closeModal} operation={operation} answer={answer} onInputChange={handleInputChange} className="input_area"/>:<InputBox error={error} evl={evl} lu={lu} chp={chp} svd={svd} evt={evt} cnt={count} reset={clr} modal={modal} closeModal={closeModal} operation={operation} answer={answer} onInputChange={handleInputChange}/>}
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
                    <hr></hr>
                    <Footer reference={reference}/>
                </div>
            </div>
        </div>
    )
}
export default Eigenvalues;
