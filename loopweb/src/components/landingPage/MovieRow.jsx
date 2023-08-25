import React from "react";
import { Card } from '../../components/common';
import './MovieRow.css';

//import Movies from '../../data/movies.json'

function MovieRow (props) {
    /*
    const arrMovies = Array.from(props.movieData)
    const listCards = arrMovies.map(item => {
        return <Card movie={item}> </Card>
    })
    */

    const listCards = props.movieData.map( movieCard => {
        return <Card movie={movieCard} buttonActive={props.buttonActive} > </Card>
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