import React from "react";
import './TitleStrip.css';


function TitleStrip (props) {
    return (
        <>
            <div className="bar" >
                <h1>{props.text}</h1>
            </div>
        </>
    )
}

export default TitleStrip;