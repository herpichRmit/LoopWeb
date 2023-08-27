import React from "react";
import { MovieContent, ScreeningTimes, Reviews } from "../../components/moviePage";
import './MoviePage.css';

import {useParams} from 'react-router-dom';

import Movies from '../../data/movies.json';

function MoviePage () {

    // determine which movie to show based on what the routing link is
    const { movieTitle } = useParams();
    let selectedMovie = null;
    
    // iterate through all movies to find selected movie
    for (let i=0; i<Movies.length; i++){
        if (Movies[i].title == movieTitle) {
            selectedMovie = Movies[i]
        }
    }

    // make array like object (JSON file) behave like an array
    const arrReviews = Array.from(selectedMovie.reviews)

    
    // pass data to three seperate sections
    return (
        <>
            <MovieContent movie={selectedMovie} />
            <ScreeningTimes times={selectedMovie.times} />
            <Reviews reviews={arrReviews} />
        </>
    )
}

export default MoviePage;