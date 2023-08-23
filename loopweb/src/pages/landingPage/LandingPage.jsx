import React from "react";
import { Header, Footer } from '../../components/common';
import './LandingPage.css';
import { MovieRow, TitleStrip } from '../../components/landingPage';

//<img src='./seats_unsplash.jpg' alt="" /> 

function LandingPage () {
    
    const testMovieData = ['Jurassic Park','Pulp Fiction','Sideways']
    const testComingSoonData = ['Ex Machina','10 Cloverfield Lane','The Meyerowitz Stories']

    return (
        <>
            <Header /> 
            <img src={process.env.PUBLIC_URL + "/landing_banner_unsplash.jpg"} alt="" width="2912" height="4368"></img>
            <TitleStrip text="Now Showing" />
            <MovieRow movieData={testMovieData} />
            <TitleStrip text="Coming Soon" /> 
            <MovieRow movieData={testComingSoonData} />
            <Footer></Footer>
        </>
    )
}

export default LandingPage;

