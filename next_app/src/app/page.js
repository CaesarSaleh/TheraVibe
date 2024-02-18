"use client"
process.env.AUTH0_SECRET= process.env.NEXT_PUBLIC_AUTH0_SECRET
process.env.AUTH0_BASE_URL= process.env.NEXT_PUBLIC_AUTH0_BASE_URL
process.env.AUTH0_ISSUER_BASE_URL= process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL
process.env.AUTH0_CLIENT_ID= process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
process.env.AUTH0_CLIENT_SECRET= process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
// import { Main } from "./main"
import Album from './Album'


export default function Home() {
  const {user, error , isLoading} = useUser()

  const router = useRouter();

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

    
  if (error) {
    console.log(error.message)
    return (
      <div>
        <p>This is an error message cuz user auth is causing an error</p>{error.message}
      </div>
    )
  }

  if (!user){
    return(
          // LANDING PAGE - PROJECT DESCRIPTION
    <div className="bg-white min-h-screen">
    {/* Blurred background */}
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "linear-gradient(to right bottom, #ff6699, #9966ff)",
          clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          mixBlendMode: "soft-light",
          filter: "blur(10px)", // Decrease blur amount here
          opacity: "0.15", // Adjust opacity here
        }}
        />
    </div>
  
    <div className="relative isolate px-8 py-16 lg:px-12 lg:py-20">
      {/* Your existing content */}
      <div className="mx-auto max-w-3xl py-16 sm:py-20 lg:py-24 z-10">
        <div className="text-center">
        <div class="flex justify-center items-center">
            <img src="icon.png" alt="Icon" class="w-[100px] mb-4" /> {/* Adjust the size and margin as needed */}
        </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 sm:text-5xl mt-12 lg:mt-0">
            Welcome to TheraVibe.VR
          </h1>
          <p className="mt-8 text-lg sm:text-xl leading-7 text-gray-600">
            Embark on a transformative journey with our groundbreaking VR therapy experience. Tailored to your unique needs, our immersive sessions offer a safe and private space where you can freely express your thoughts and emotions. Customize your therapist's appearance and surroundings to create a comfortable environment that empowers you to confidently explore your vulnerabilities. With engaging activities designed to promote relaxation and personalized recommendations to foster positive thinking, our VR therapy is a powerful tool for self-discovery and growth. Say hello to a new era of therapy, where innovation meets compassion, and healing knows no bounds!
          </p>
          <div className="mt-12 flex items-center justify-center gap-x-6">
            <button
              className="rounded-md bg-indigo-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              ><a href="/api/auth/login">Log In</a></button>
          </div>
        </div>
      </div>
    </div>  
  </div>
    )
  } else if (isLoading){
    return (
      <div>loading</div>
    )
  } else{
    return user && (
        <div className="bg-custom-blue min-h-screen p-8 relative flex flex-col items-center justify-start">
        <button className="absolute top-0 right-0 m-4 px-4 py-2 text-purple-500 border border-purple-500 rounded-md hover:bg-purple-500 hover:text-white transition duration-300"><a href="/api/auth/logout">Logout</a></button>
        <img src="icon.png" alt="Icon" className="w-14 mb-4" /> {/* Adjust the size and margin as needed */}
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
  }
}
