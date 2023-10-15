import React, { useState, useEffect } from "react";
import { Card } from '../common';
import './MovieRow.css';

import { getMovies } from "../../data/repository";

function MovieRow (props) {


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
        return <Card movie={movieCard} buttonActive={!props.comingSoon} > </Card>
    })

    const comingSoon = props.movieData.map( movieCard => {
        return <Card movie={movieCard} buttonActive={!props.comingSoon} > </Card>
    })

    return (
        <>
            <div className="movieRow-container">
                {comingSoon ? listCards : comingSoon}
            </div>
        </>
    )
}


export default MovieRow;