import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './Book.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import axios from 'axios';

const API_BOOKING_URL = 'http://localhost:5000/api/bookings';

export default function Book() {
  const id = uuidv4();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [value, onChange] = useState<any>([]);

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  function isEmailValid(val: string) {
    let regEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (!regEmail.test(val)) {
      return false;
    } else {
      return true;
    }
  }

  useEffect(() => {
    // console.log('date!!!', dayjs(value).format('DD-MM-YYYY'));
    // console.log('dateValue', value.length);
  });

  function handleAdd() {
    // Validate users' inputs
    if (!name) {
      toast.warn('Please enter your name');
    } else if (!email) {
      toast.warn('Please enter an email');
    } else if (!isEmailValid(email)) {
      toast.error('Enter a valid email');
    }
    // else if (value.length === 0) {
    // toast.warn('Please select date(s)');
    // }
    else {
      // Create the booking object
      let bookObj = {
        id: id,
        name: name,
        email: email,
        checkIn: checkIn,
        checkOut: checkOut,
      };

      // Store that booking object to localStorage
      // let bookInfoArr = [];
      // if (!localStorage.getItem('book-info')) {
      //   bookInfoArr.push(bookObj);
      //   localStorage.setItem('book-info', JSON.stringify(bookInfoArr));
      // } else {
      //   bookInfoArr = JSON.parse(localStorage.getItem('book-info') || '');
      //   bookInfoArr.push(bookObj);
      //   localStorage.setItem('book-info', JSON.stringify(bookInfoArr));
      // }

      axios
        .post(API_BOOKING_URL, bookObj, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          // Navigate to Home page and reset all fields
          navigate('/');
          resetFields();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function resetFields() {
    setName('');
    setEmail('');
    //onChange([]);
    setCheckIn('');
    setCheckOut('');
  }

  return (
    <div className='book_page_container'>
      <Header />

      <div className='inputs_container'>
        <div className='input_field_container'>
          <label>Name:</label>
          <input
            type='text'
            value={name}
            className='input_field'
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='input_field_container'>
          <label>Email:</label>
          <input
            type='text'
            value={email}
            className='input_field'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='input_field_container'>
          <label>Check In:</label>
          <input
            type='text'
            value={checkIn}
            className='input_field'
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        <div className='input_field_container'>
          <label>Check Out:</label>
          <input
            type='text'
            value={checkOut}
            className='input_field'
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
      </div>

      {/* <div>
        <Calendar
          onChange={onChange}
          value={value}
          minDate={new Date()}
          //activeStartDate={undefined}
          selectRange={true}
          //allowPartialRange={true}
          //returnValue={'range'}
        />
      </div> */}

      {/* <div className='reset_calendar_container'>
        <span className='reset_calendar' onClick={() => onChange([])}>
          Reset Calendar
        </span>
      </div> */}

      {/* <div className='nights_container'>
        <label>Nights: {value.length}</label>
      </div> */}

      <div className='buttons_container'>
        <button onClick={handleAdd} className='add_button'>
          Add
        </button>
        <button onClick={() => navigate('/')} className='cancel_button'>
          Cancel
        </button>
      </div>
    </div>
  );
}
