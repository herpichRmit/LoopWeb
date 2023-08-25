import React from "react";
import './ScreeningTimes.css';
import { ScreeningTimesCard } from '../moviePage' ;


function ScreeningTimes (props) {

    const data = {
        "Melbourne Central" : ["4:30pm","5:45pm","6:00pm","7:00pm","8:00pm",],
        "Highpoint" : ["4:30pm","5:45pm","6:00pm","7:00pm"],
        "Eastland" : ["5:45pm","6:00pm","6:30pm","7:15pm","8:00pm"],
        "Mount Gambier" : ["4:30pm","5:45pm","7:00","7:15",],
    }

    const cards = Object.entries(props.times).map( ([key,value]) => {
        return <ScreeningTimesCard location={key} time={value} ></ScreeningTimesCard>
    })

    return (
        <>
            <div className="screeningTimes-container">
                <div className="screeningTimes-container_box">
                    <div className="screeningTimes-container_box-title">
                        <h2>Screening Times</h2>
                    </div>
                    <div className="screeningTimes-container_box-flexGrid">
                        {cards}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScreeningTimes;