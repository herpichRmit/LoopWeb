import React from "react";
import './LandingPage.css';
import { MovieRow, TitleStrip } from '../../components/landingPage';

import Movies from '../../data/old/movies.json'
import UpcomingMovies from '../../data/old/upcomingMovies.json'

function LandingPage () {

    return (
        <>
            <div className="lp-zstack">
                <img src={process.env.PUBLIC_URL + "/landing_banner_unsplash.jpg"} alt="" width="2912" height="4368"></img>
                <p className="header-container_content-logo lp-hero-text">Loop web</p>
                <p className="header-container_content-logo lp-hero-subtitle"> The show begins when you walk in.</p>
            </div>
            <TitleStrip text="Now Showing" />
            <MovieRow movieData={Movies} buttonActive={true} />
            <TitleStrip text="Coming Soon" /> 
            <MovieRow movieData={UpcomingMovies} />
        </>
    )
}

export default LandingPage;

