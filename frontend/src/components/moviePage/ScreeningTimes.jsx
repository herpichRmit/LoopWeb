import React, { useState, useEffect } from "react";
import './ScreeningTimes.css';
import { SessionTimeButton } from '.' ;
import moment from 'moment';

import { getMovie } from "../../data/repository";
import ReactModal from "react-modal";

function ScreeningTimes(props) {

    // iterate though sessions, group all sessions that have the same cinema_name
    const groupedSessions = groupSessionsByCinemaName(props.times || []);
    

    // create each row of session times
    function getCards() {
        const components = []

        for (const cinema in groupedSessions) {
            components.push( 
                <div className="st-container_box-flexGrid-entry" key={cinema}>
                    <p className="st-container_box-flexGrid-entry-title">{cinema}</p>
                    {groupedSessions[cinema].map(session => (
                        <SessionTimeButton className="st-session-time-buttons" key={session.session_id} session={session} >{moment(session.session_time).format('MMMM Do, h:mma')}</SessionTimeButton>
                    ))}
                </div>
            );
        }
        return components
    }
    
    // return react component
    return (
        <>
            <div className="st-container">
                <div className="st-container_box">
                    <div className="st-container_box-title">
                        <h2>Screening Times</h2>
                    </div>
                    <div className="st-container_box-flexGrid">
                        {getCards()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScreeningTimes;



function groupSessionsByCinemaName(sessions) {
    const groupedSessions = {};
  
    if (Array.isArray(sessions)) { // Check if sessions is an array
      sessions.forEach((session) => {
        const cinemaName = session.cinema_name;
  
        if (!groupedSessions[cinemaName]) {
          groupedSessions[cinemaName] = [];
        }
  
        groupedSessions[cinemaName].push(session);
      });
    }
  
    return groupedSessions;
  }



