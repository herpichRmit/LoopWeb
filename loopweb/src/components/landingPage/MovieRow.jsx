import React from "react";
import { Card } from '../../components/common';
import './MovieRow.css';


function MovieRow (props) {
    const arrMovies = Array.from(props.movieData)
    const listCards = arrMovies.map(item => {
        return <Card movie={item}> </Card>
    })

    return (
        <>
            <div className="movieRow-container">
                {listCards}
            </div>
        </>
    )
}

export default MovieRow;