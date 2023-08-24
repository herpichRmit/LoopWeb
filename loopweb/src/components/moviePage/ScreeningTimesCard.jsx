import React from "react";
import './ScreeningTimesCard.css';


function ScreeningTimesCard (props) {

    const arrTimes = Array.from(props.time)
    const cards = arrTimes.map(time => {
        return <div className="screeningTimesCard-container_box-row_time-text"><p>{time}</p></div>
    })

    return (
        <>
            <div className="screeningTimesCard-container">
                <div className="screeningTimesCard-container_box">
                    <div className="screeningTimesCard-container_box-title">
                        <h3>{props.location}</h3>
                    </div>
                    <div className="screeningTimesCard-container_box-row">
                        <div className="screeningTimesCard-container_box-row_time">
                            {cards}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScreeningTimesCard;