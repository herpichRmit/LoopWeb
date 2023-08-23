import React from "react";
import { Footer, Header } from '../../components/common';
import { MovieContent, ScreeningTimes, Reviews } from "../../components/moviePage"
import './MoviePage.css';



function MoviePage () {
    return (
        <>
            <Header /> 

            <MovieContent />
            <ScreeningTimes />
            <Reviews />

            <Footer />
        </>
    )
}

export default MoviePage;