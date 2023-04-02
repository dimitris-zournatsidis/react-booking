import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './Book.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

export default function Book() {
  const id = uuidv4();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [numOfNights, setNumOfNights] = useState<number>();
  const [value, onChange] = useState<any>(new Date());

  function isEmailValid(val: string) {
    let regEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (!regEmail.test(val)){
      return false;
    } else {
      return true;
    }
  }

  function handleAdd() {
    // console.log('add clicked');
    if (!name) {
      toast.warn('Please enter your name');
    } else if (!email) {
      toast.warn('Please enter an email');
    } else if (!isEmailValid(email)) {
      toast.error('Enter a valid email');
    } else if (!value) {
      toast.warn('Please select date(s)');
    } else {
      let bookObj = {
        id: id,
        name: name,
        email: email,
        date: value,
      };

      let bookInfoArr = [];
      if (!localStorage.getItem('book-info')) {
        bookInfoArr.push(bookObj);
        localStorage.setItem('book-info', JSON.stringify(bookInfoArr));
      } else {
        bookInfoArr = JSON.parse(localStorage.getItem('book-info') || '');
        bookInfoArr.push(bookObj);
        localStorage.setItem('book-info', JSON.stringify(bookInfoArr));
      }

      navigate('/');
      resetFields();
    }
  }

  function resetFields() {
    setName('');
    setEmail('');
    onChange([]);
  }

  useEffect(() => {});

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
      </div>

      <div className='calendar_container'>
        <Calendar onChange={onChange} value={value} />
      </div>

      <div className='input_field_container'>
        <label>Nights:</label>
        <input
          type='number'
          value={numOfNights}
          className='input_field'
          onChange={(e) => setNumOfNights(+e.target.value)}
        />
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
