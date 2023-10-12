import React, { useState } from "react";
import ReactModal from 'react-modal';
import moment from 'moment';
import { TextField } from '@mui/material';

import { updateSession, createTicket } from "../../data/repository";

export default function SessionTimeButton({session, children}) {
    const [isSelected, setIsSelected] = useState(false);
    const [tickets, setTicket] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const [capacity, setCapacity] = useState(session.session_capacity);

    function handleTicket(e) {
        setTicket(e.target.value)
    }

    const openModal = () => {
        setIsSelected(true)
    }

    const closeModal = () => {
        setTicket(0)
        setErrorMessage("")
        setIsSelected(false)
    }

    // todo: gets current user from local host 
    const username = "test@gmail.com"

    const submit = async () => {
        if (tickets > session.session_capacity) {
            setErrorMessage("There are not enough tickets available, please try again.");
        } else if (tickets <= 0) {
            setErrorMessage("Please select an appropriate amount.");
        } else {
            setErrorMessage("")
            // reduce capacity
            // create new tickets under user name
            setCapacity(session.session_capacity - tickets)
            const newSession = { cinema_name: session.cinema_name, session_time: session.session_time, session_capacity: capacity, movie_id: session.movieId };
            await updateSession( session.session_id, newSession );
            const newTicket = { session_id: session.session_id, user_email: username }
            for (const x in tickets){
                await createTicket(newTicket);
            }
            closeModal()
        }
    }

    return (
        <>
            <button style={ { all : "unset" } } onClick={openModal} >
                <p className="stc-text" >{children}</p>
            </button>
            <ReactModal
                className="stc-modal"
                isOpen={isSelected} 
                contentLabel="Example Modal"
                onRequestClose={closeModal}
            >
                <h2>Reserve Tickets</h2>
                <p>{session.cinema_name}</p>
                <p>{moment(session.session_time).format('MMMM Do, h:mma')}</p>
                <p>Number of seats available: {capacity}</p>
                <p>How many tickets would you like to reserve?</p>
                {capacity === 0 ? 
                <div className="stc-row">
                    <TextField
                        disabled
                        className="reviews-editor-textf"
                        type="number"
                        value={tickets}
                        onChange={handleTicket}
                    />
                    <button style={{ backgroundColor:"grey", borderColor:"grey", cursor:"default" }}>Submit</button>
                </div>
                : 
                (<><div className="stc-row">
                    <TextField
                        className="reviews-editor-textf"
                        type="number"
                        value={tickets}
                        onChange={handleTicket}
                    />
                    <button onClick={submit}>Submit</button>
                </div>
                {errorMessage !== null &&
                <div>
                    <span className="text-danger">{errorMessage}</span> 
                </div>
                }</>)}
            </ReactModal>

        </>
    )
}





