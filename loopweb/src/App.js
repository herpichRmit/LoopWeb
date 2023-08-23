import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage, MoviePage } from './pages';

// may need to add path="/notes/:noteId"

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/movie" element={<MoviePage />}/>
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
