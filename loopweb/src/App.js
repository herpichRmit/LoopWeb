import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Header, Footer } from './components/common';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage, MoviePage, SignInPage, SignUpPage } from './pages';



function App() {
  return (
    <div className="App">

      
      <Router>
        <Header /> 
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/movies/:movieTitle" element={<MoviePage />} />
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
        </Routes>
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;
