import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import './Book.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import axios from 'axios';

const API_BOOKING_URL = 'http://localhost:5000/api/bookings';

export default function Book() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [value, onChange] = useState<any>([]);

  function isEmailValid(val: string) {
    let regEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (!regEmail.test(val)) {
      return false;
    } else {
      return true;
    }
  }

  function isString(x: string) {
    return new RegExp('([\'"]?)[a-zA-Z]+\\1$').test(x);
  }

  function handleAdd() {
    // Validate user inputs
    if (!name) {
      toast.warn('Please enter your name');
    } else if (!isString(name)) {
      toast.error('Name must not have numbers');
    } else if (!email) {
      toast.warn('Please enter an email');
    } else if (!isEmailValid(email)) {
      toast.error('Enter a valid email');
    } else if (value.length === 0) {
      toast.warn('Please select date(s)');
    } else {
      // Create the booking object
      let bookObj = {
        name: name,
        email: email,
        checkIn: dayjs(value[0]).format('DD-MM-YYYY'),
        checkOut: dayjs(value[1]).format('DD-MM-YYYY'),
      };

      axios
        .post(API_BOOKING_URL, bookObj, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          setTimeout(() => {
            toast.success('Booking created successfully!');
          }, 300);

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
    onChange([]);
  }

  function getNumberOfNights() {
    const date1 = dayjs(value[0]);
    const date2 = dayjs(value[1]);
    return date2.diff(date1, 'days');
  }

  function disabledTiles() {
    return false;
  }

  return (
    <div className='book_page_container'>
      <Header />

      <div className='inputs_container'>
        <div className='input_field_container'>
          <label>Name:</label>
          <input type='text' value={name} className='input_field' onChange={(e) => setName(e.target.value)} />
        </div>

        <div className='input_field_container'>
          <label>Email:</label>
          <input type='text' value={email} className='input_field' onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      <div>
        <Calendar
          onChange={onChange}
          value={value}
          minDate={new Date()}
          selectRange={true}
          //tileDisabled={disabledTiles}
          // tileClassName={}
        />
      </div>

      <div className='reset_calendar_container'>
        <span className='reset_calendar' onClick={() => onChange([])}>
          Reset Calendar
        </span>
      </div>

      <div className='nights_container'>
        <label>Nights: {getNumberOfNights()}</label>
      </div>

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
