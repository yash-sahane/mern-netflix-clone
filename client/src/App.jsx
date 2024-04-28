import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Header from './components/Header';
import toast, { Toaster } from 'react-hot-toast';
import Player from './Pages/Player';
import Movies from './Pages/Movies';
import TVShows from './Pages/TVShows';
import LikedMovies from './Pages/LikedMovies';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/movies' element={<Movies />}></Route>
        <Route path='/shows' element={<TVShows />}></Route>
        <Route path='/likedMovies' element={<LikedMovies />}></Route>
        <Route path='/player' element={<Player />}></Route>
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App