import React, { useEffect, useState } from "react";
import "./inputBoxes.css";
import Answer from "../Modals/Answer/Answer";

function InputBox(props) {
  const {closeModal} = props;
  const {onInputChange}= props;
    const [input,setInput]=useState("");
    const [boxValues, setBoxValues] = useState(Array(props.cnt * props.cnt).fill(""));
    useEffect(()=>{
        setBoxValues(Array(props.cnt * props.cnt).fill(""));
    },[props.cnt])
    useEffect(()=>{
      setBoxValues(Array(props.cnt * props.cnt).fill(""));
    },[props.reset])
    useEffect(()=>{
      let str="";
        let cnt=0;
        for (let i=0;i<(boxValues.length);i++){
          str+=boxValues[i];
          cnt+=1;
          if (cnt%(props.cnt)==0 && (cnt)!=(props.cnt*props.cnt)){
            str+= "\n";
          }
          if (i==(props.cnt*props.cnt - 1)){
            setInput(str);
            onInputChange(str);
            break;
          }
          if(cnt%(props.cnt)!=0){
            str+=" ";
          }
        }
    },[boxValues])
    const handleBoxChange = (index, value) => {
        const newBoxValues = [...boxValues];
        if (value[value.length - 1]==" "){
            return ;
        }
        newBoxValues[index] = value;
        setBoxValues([...newBoxValues]);
    };
    const renderBoxes = () => {
    return Array.from({ length: props.cnt * props.cnt }, (_, index) => (
        <input
        className="box"
        key={index}
        value={boxValues[index]}
        onChange={(e) => handleBoxChange(index, e.target.value)}
        />
    ));
  };
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${props.cnt}, 65px)`, // Adjust the box width as needed
    gridGap: "2px", // Adjust the gap between boxes as needed
    placeItems: "center center",
    margin: "auto auto",
    padding: "5px 15px",
  };
  return (
    <div className="inputBoxes" style={gridStyle}>
      {/* Render the grid of boxes */}
      {renderBoxes()}
      {props.modal?<Answer operation={props.operation} closeModal={closeModal} answer={props.answer} input={input}/>:null}
    </div>
  );
}
export default InputBox;