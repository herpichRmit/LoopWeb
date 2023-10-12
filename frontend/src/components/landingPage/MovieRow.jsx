import React, { useState, useEffect } from "react";
import { Card } from '../common';
import './MovieRow.css';

import { getMovies } from "../../data/repository";

//import Movies from '../../data/movies.json'

function MovieRow (props) {
    /*
    const arrMovies = Array.from(props.movieData)
    const listCards = arrMovies.map(item => {
        return <Card movie={item}> </Card>
    })
    */

    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);


    // Load movies.
    useEffect(() => {
        async function loadMovies() {
            const movies = await getMovies(); // get all movies

            setMovies(movies)
            setIsLoading(false);
            }

        loadMovies();
    }, []);


    const listCards = movies.map( movieCard => {
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