import React from "react";
import './LandingPage.css';
import { MovieRow, TitleStrip } from '../../components/landingPage';

import Movies from '../../data/old/movies.json'
import UpcomingMovies from '../../data/old/upcomingMovies.json'

function LandingPage () {

    return (
        <>
            <img src={process.env.PUBLIC_URL + "/landing_banner_unsplash.jpg"} alt="" width="2912" height="4368"></img>
            <TitleStrip text="Now Showing" />
            <MovieRow movieData={Movies} buttonActive={true} />
            <TitleStrip text="Coming Soon" /> 
            <MovieRow movieData={UpcomingMovies} />
        </>
    )
}

export default LandingPage;

