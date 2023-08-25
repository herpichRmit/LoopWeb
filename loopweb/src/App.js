import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Header, Footer } from './components/common';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage, MoviePage } from './pages';

// may need to add path="/notes/:noteId"

function App() {
  return (
    <div className="App">

      
      <Router>
        <Header /> 
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/movies/:movieTitle" element={<MoviePage />} />
        </Routes>
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;
