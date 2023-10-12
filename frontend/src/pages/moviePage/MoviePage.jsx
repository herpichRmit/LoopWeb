import React, { useState, useEffect } from "react";
import { MovieContent, ScreeningTimes, Reviews } from "../../components/moviePage";
import './MoviePage.css';

import { useParams } from 'react-router-dom';
import { getMovie } from "../../data/repository";

import Movies from '../../data/old/movies.json';

function MoviePage () {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const { movieId } = useParams();


    // use useParams to get a movie
    useEffect(() => {
        async function loadMovie() {

            
            const movie = await getMovie(movieId); // get all movies
            console.log(movie)

            setMovie(movie)
            setIsLoading(false);
            }

        loadMovie();
    }, []);

    // make array like object (JSON file) behave like an array
    //const arrReviews = Array.from(selectedMovie.reviews)

    
    console.log("up here")
    console.log(movie)

    // pass data to three seperate sections
    return (
        <>
            <MovieContent movie={movie} />
            <ScreeningTimes times={movie.sessions} />
            <Reviews movieId={movie.movieId} />
        </>
    )
}

export default MoviePage;