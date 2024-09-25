"use client";

import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import Image from 'next/image';

const InvitationCard = () => {
  const cardRef = useRef(null); // Reference to the card container

  const backgrounds = [
    '/background1.jpg',  // Add border/background images to the public folder
    '/background2.jpg',
    '/background3.jpg',
  ];

  const foregrounds = [
    '/foreground1.jpg',  // Add actual images (foreground) to the public folder
    '/foreground2.jpg',
    '/foreground3.jpg',
  ];

  const [bgImage, setBgImage] = useState(backgrounds[0]);
  const [fgImage, setFgImage] = useState(foregrounds[0]);

  const [invitationDetails, setInvitationDetails] = useState({
    name: '',
    address: '',
    date: '',
    time: '',
    event: '',
    checkInTime: '',
    endTime: '',
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
          saveAs(blob, 'invitation_card.png');
        });
      } catch (error) {
        console.error('Error generating image:', error);
      }
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
              <input
                type="time"
                name="checkInTime"
                value={invitationDetails.checkInTime}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Time</label>
              <input
                type="time"
                name="endTime"
                value={invitationDetails.endTime}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
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
          <div className="absolute inset-0 m-4 bg-cover bg-center" style={{ backgroundImage: `url(${fgImage})` }}></div>

          {/* Invitation Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
                <div className='mt-20'>
              <h2 className="text-white text-3xl font-bold">You're Invited!</h2>
              
              <p className="text-lg mt-2">Join us for {invitationDetails.event || 'a fun-filled event!'}</p>
              <p className="mt-4">Date: {invitationDetails.date || 'MM/DD/YYYY'}</p>
              <p className="mt-1">Check-In Time: {invitationDetails.checkInTime || 'HH:MM AM/PM'}</p>
              <p className="mt-1">End Time: {invitationDetails.endTime || 'HH:MM AM/PM'}</p>
              <p className="mt-4">{invitationDetails.address || 'Aerosports Tramplone Park'}</p>
              <p className="mt-4">
                Please RSVP by contacting {invitationDetails.name} {invitationDetails.lastName ? ` ${invitationDetails.lastName}` : ''} at{' '}
                {invitationDetails.phoneNumber || '555-555-5555'} or {invitationDetails.email || 'email@example.com'}.
                </p>
              </div>
            </div>
          </div>
        </div>
      <button 
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Download Invitation
      </button>
      </div>
    </div>
  );
};

export default InvitationCard;
