import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Book from './pages/Book/Book';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/book' element={<Book />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>

      <ToastContainer
        position='bottom-right'
        autoClose={4000}
        theme={'dark'}
      />
    </>
  )
}