import React from "react"
import "./inputBoxes.css"
function renderBoxes(count,reset) {
    var boxes = [];
    if (reset){
        boxes=[];
        for (let i = 1; i <= count*count; i++) {
            boxes.push(<input className="box" key={i} value=""></input>);
        }
        return boxes;
    }
    else{
        for (let i = 1; i <= count*count; i++) {
            boxes.push(<input className="box" key={i}></input>);
        }
        return boxes;
    }
}
function InputBox(props){
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${props.cnt}, 65px)`, // Adjust the box width as needed
        gridGap: '2px', // Adjust the gap between boxes as needed
        placeItems: 'center center',
        margin: 'auto auto',
        padding:"5px 15px",
    };

    return (
    <div className="inputBoxes" style={gridStyle}>
        {/* Render the grid of boxes */}
        {renderBoxes(props.cnt,props.reset)}
    </div>
    );
}
export default InputBox;