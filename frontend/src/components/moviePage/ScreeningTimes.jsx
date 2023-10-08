import React from "react";
import './ScreeningTimes.css';
import { ScreeningTimesCard } from '../moviePage' ;


function ScreeningTimes (props) {

    // map screening times to screeningTimesCards
    // example screening times data: { "Mount Gambier" : ["4:30pm","5:45pm","7:00","7:15",] }

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