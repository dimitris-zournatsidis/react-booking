import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();

  return (
    <>
      {/* eslint-disable-next-line no-restricted-globals */}
      {location.pathname.includes('book') ? (
        <div className='main_header_container'>
        <IoIosArrowBack
          className='back_icon'
          onClick={() => navigate('/')}
        />
          <h1>Add Reservation</h1>
        </div>
      ) : (
        <div className='main_header_container'>
          <h1>Reservations</h1>
          <AiOutlinePlusCircle
            className='plus_icon'
            onClick={() => navigate('./book')}
          />
        </div>
      )}
    </>
  );
}
