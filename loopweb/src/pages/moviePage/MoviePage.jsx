import React from "react";
import { MovieContent, ScreeningTimes, Reviews } from "../../components/moviePage";
import './MoviePage.css';

import {useParams} from 'react-router-dom';

import Movies from '../../data/movies.json';

function MoviePage () {

    const { movieTitle } = useParams();
    let selectedMovie = null;
    

    for (let i=0; i<Movies.length; i++){
        if (Movies[i].title == movieTitle) {
            selectedMovie = Movies[i]
        }
    }

    // check all records for movie tag gotten from titles

    return (
        <>
            <MovieContent movie={selectedMovie} />
            <ScreeningTimes />
            <Reviews />
        </>
    )
}

export default MoviePage;