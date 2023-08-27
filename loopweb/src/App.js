import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Header, Footer } from './components/common';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage, MoviePage, SignInPage, SignUpPage } from './pages';



function App() {

  useEffect(() => {
    

  }, []);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">

      
      <Router>
        <Header isLoggedIn={isLoggedIn}/> 
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/movies/:movieTitle" element={<MoviePage />} />
          <Route path="/SignIn" element={<SignInPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/SignUp" element={<SignUpPage />} />
        </Routes>
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;
