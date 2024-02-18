"use client"
import React, { useState } from 'react';
import Album from './Album';

const photos = [
  { url: '1.jpg' },
  { url: '2.jpg' },
  { url: '3.jpg' },
  { url: '4.jpg' },
  { url: '5.jpg' },
  { url: '6.jpg' },
  { url: '7.jpg' },
  { url: '8.jpg' },
  { url: '9.jpg' },
  // Add more photos as needed
];

const Main = () => {
  const [list, setList] = useState([]);
  
  const handleFileUpload = (event) => {
    const files = event.target.files; // Get the uploaded files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Construct a URL for the file
      const url = URL.createObjectURL(file);
      // Add the file to the list
      setList(prevList => [...prevList, { url }]);
    }
  };

  return (
    <div className="bg-custom-blue min-h-screen p-8 relative flex flex-col items-center justify-start">
  <button className="absolute top-0 right-0 m-4 px-4 py-2 text-purple-500 border border-purple-500 rounded-md hover:bg-purple-500 hover:text-white transition duration-300"><a href="/api/auth/logout">Logout</a></button>
  <img src="icon.png" alt="Icon" className="w-[100px] mb-4" /> {/* Adjust the size and margin as needed */}
  <h1 className="text-3xl text-purple-500 font-bold mb-4">My Memory Album</h1>
  <div className="w-80 flex flex-col items-center justify-center border-dashed border-2 border-purple-500 rounded-lg p-8 mb-8">
    <input 
      type="file" 
      id="upload"
      className="hidden" 
      onChange={handleFileUpload}
      multiple  // Allow multiple file selection
    />
    <label htmlFor="upload" className="cursor-pointer flex flex-col items-center">
      <svg className="w-12 h-12 text-purple-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      <p className="text-purple-500">Upload Here!</p>
    </label>
  </div>
  <Album photos={list} />
</div>


  
  );
};

export default Main;
