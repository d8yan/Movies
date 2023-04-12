import MainNav from './components/MainNav'
import Footer from './components/Footer'
import Home from './pages/HomePage'
import Movies from './pages/MoviesPage'
import Error from './pages/ErrorPage';
import Documentation from './pages/DocumentationPage'
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SingleMoviePage from './pages/SingleMoviePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import AdminReviewPage from './pages/AdminReviewPage';
import WatchList from './pages/WatchList'
import AdminMoviesPage from './pages/AdminMoviesPage';

import React from 'react';
import "./App.css";
import { useState } from 'react';


function App() {

  const [use, setUse] = useState('')

  return (

    <>

      <MainNav use={use} setUse={setUse} />

      <BrowserRouter basename='/client'>
        <Routes>

          <Route path='/' element={
            <Home use={use} setUse={setUse} />
          } />

          <Route path='/movies' element={
            <Movies use={use} setUse={setUse} />

          } />

          <Route path='/movies/:_id' element={<SingleMoviePage use={use} setUse={setUse} />} />
          <Route path='/documentation' element={<Documentation use={use} setUse={setUse} />} />
          <Route path='/watchlist' element={<WatchList use={use} setUse={setUse} />} />
          <Route path='/adminReviews' element={<AdminReviewPage use={use} setUse={setUse} />} />
          <Route path='/adminMovies' element={<AdminMoviesPage use={use} setUse={setUse} />} />

          <Route path='/login' element={<Login use={use} setUse={setUse} />} />

          <Route path='/register' element={<Register />} />

          <Route path='/error' element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>



    </>
  )
}

export default App;

