"use client";

import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas-pro';
import Image from 'next/image';
import Picker from 'vanilla-picker';
import DatePicker from 'react-datepicker'
const fileSaver = require('file-saver');
import ColorPicker from 'react-pick-color';
import { relativeTimeRounding } from 'moment';
import { text } from 'stream/consumers';

const InvitationCard = () => {
  const cardRef = useRef(null); // Reference to the card container

  const backgrounds = [
    '/background1.jpg',  // Add border/background images to the public folder
    '/background2.jpg',
    '/background3.jpg',
    '/background4.png',
    '/background5.png',
    '/background6.png'
  ];

  const foregrounds = [
    '/foreground1.jpg',  // Add actual images (foreground) to the public folder
    '/foreground2.jpg',
    '/foreground3.jpg',
    '/foreground4.png',
    '/foreground5.png',
    '/foreground6.png',
    '/foreground7.png',
    '/foreground8.png',
    '/foreground9.png',
    '/foreground10.png',
    '/foreground11.png',
    '/foreground12.png',
  ]

  const [bgImage, setBgImage] = useState(backgrounds[0]);
  const [fgImage, setFgImage] = useState(foregrounds[0]);

  const [invitationDetails, setInvitationDetails] = useState({
    name: '',
    lastName:'',
    address: '',
    date: '',
    time: '',
    event: '',
    checkInTime: '',
    length: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvitationDetails({
      ...invitationDetails,
      [name]: value,
    });
  };

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, {
          useCORS: true,
          scale: 2, // Increase quality
        });
        canvas.toBlob((blob) => {
          fileSaver.saveAs(blob, 'invitation_card.png');
        });
      } catch (error) {
        console.error('Error generating image:', error);
      }
    }
  };

  const [checkInTime, setCheckInTime] = useState({
    hour: '00',
    minute:'00',
    m: 'am'
  })

  var formattedTime;
  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setCheckInTime({
      ...checkInTime,
      [name]: value,
    });
  };

  //rounds time to nearest 15 minutes
  const roundTime = (x) => {
    try {
      var round = 15;
      var minute = x.toString().substring(3);
      var rounded = Math.round(parseInt(minute) / round) * round;
      if (rounded == 0) {
        return x.toString().substring(0,3) + "00";
      }
      else if (Number.isNaN(rounded)) {
        return "TBD";
      }
      else {
        return x.toString().substring(0,3) + rounded;
      }   
    }
    catch(e) {
      return ('HH:MM AM/PM');
    }
  }

  //function to change month to text format when displaying
  const dateFormat = () => {
    try {
      var date = new Date(invitationDetails.date);
      date.setDate(date.getDate() + 1);
      var newDateFormat = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(date);
      return newDateFormat;
    }
    catch (err) {
      return('MM/DD/YY');
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between p-10 space-y-8 md:space-y-0 md:space-x-8">
      {/* Left Side: Input Fields */}
      <div className="w-full md:w-3/5 ml-10">
        <h1 className="text-xl font-bold mb-4">Invitation Generator</h1>
        {/* Background Selector */}
        <div>
          <h3 className="text-lg font-medium mb-2">Select a border (background):</h3>
          <div className="flex space-x-4 mb-6">
            {backgrounds.map((bg, idx) => (
              <button
                key={idx}
                className={`w-20 h-20 bg-cover bg-center rounded ${bgImage === bg ? 'ring-4 ring-blue-500' : ''}`}
                style={{ backgroundImage: `url(${bg})` }}
                onClick={() => setBgImage(bg)}
              />
            ))}
          </div>
        </div>

        {/* Foreground Selector */}
        <div>
          <h3 className="text-lg font-medium mb-2">Select an image (foreground):</h3>
          <div className="flex space-x-4 mb-6">
            {foregrounds.map((fg, idx) => (
              <button
                key={idx}
                className={`w-20 h-20 bg-cover bg-center rounded ${fgImage === fg ? 'ring-4 ring-blue-500' : ''}`}
                style={{ backgroundImage: `url(${fg})` }}
                onClick={() => setFgImage(fg)}
              />
            ))}
          </div>
        </div>

        {/* Invitation Details Input */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">What are you celebrating?</label>
            <input
              type="text"
              name="event"
              value={invitationDetails.event}
              onChange={handleChange}
              placeholder="Enter the name of your party"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={invitationDetails.date}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Check-In Time</label>
                <select className = "text-2xl" name="hour" id="hour" value={checkInTime.hour} onChange={handleTimeChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>

                <select className = "text-2xl mt-3" name="minute" id="minute" value={checkInTime.minute} onChange={handleTimeChange}>
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select>

                <select className = "text-2xl mt-3" name="m" id="m" value={checkInTime.m} onChange={handleTimeChange}>
                  <option value="am">am</option>
                  <option value="pm">pm</option>
                </select>
            </div>
            {/*<div>
              <label className="block text-sm font-medium text-gray-700">Length of Event</label>
              <input
                placeholder = 'in hours'
                type="text"
                name="length"
                value={invitationDetails.length}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>*/}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Who should people contact to RSVP?</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={invitationDetails.name}
                onChange={handleChange}
                placeholder="First Name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="lastName"
                value={invitationDetails.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <input
              type="text"
              name="phoneNumber"
              value={invitationDetails.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              name="email"
              value={invitationDetails.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </form>
      </div>

      {/* Right Side: Generated Invitation */}
      <div className="w-full md:w-2/5 rounded-lg shadow-lg">
      <div ref={cardRef} className="relative w-full h-full">
          {/* Background (Border Image) */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}></div>

          {/* Foreground (Actual Image) */}
          <div className="absolute inset-0 m-6 bg-cover bg-center" style={{ backgroundImage: `url(${fgImage})` }}></div>
          
          {/*Aerosports logo*/}
          <div className="object-none object-right-top w-24 h-24 border-4" style={{ backgroundImage: `url(/aerosportslogo.png)` }}></div>
          
          {/* Invitation Text */}
          <div className="absolute inset-x-0 top-12 flex items-center justify-center">
            <div className="text-white text-center" id = 'displayTextColor'>
                <div className='mt-20'>
                <img title="object-right-top" className="absolute top-0 right-8 w-13 h-10" src= "/aerosportslogo.png"/>
              <h2 className="text-white text-3xl font-bold" id = 'displayTextColor'>You're Invited!</h2>
              <p className="text-lg mt-2">Join us for {invitationDetails.event || 'a fun-filled event!'}</p>
              <p className="mt-4">Date: {dateFormat() || 'MM/DD/YYYY'}</p>
              <p className="mt-1">Check-In Time: {`${checkInTime.hour}:${checkInTime.minute} ${checkInTime.m}`}</p>
              <p className="mt-1">Length of the event is: {'2 hours'}</p>
              <p className="mt-4">{invitationDetails.address || 'Aerosports Trampoline Park'}</p>
              <p className="mt-4">
                Please RSVP by contacting {invitationDetails.name} {invitationDetails.lastName ? ` ${invitationDetails.lastName}` : ''} at{' '}
                {invitationDetails.phoneNumber || '555-555-5555'} or {invitationDetails.email || 'email@example.com'}.
                </p>
              </div>
            </div>
          </div>
        </div>
      <button 
        onClick={() => handleDownload()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Download Invitation
      </button>
      </div>
    </div>
  );
};
export default InvitationCard;
