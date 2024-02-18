"use client"
process.env.AUTH0_SECRET= process.env.NEXT_PUBLIC_AUTH0_SECRET
process.env.AUTH0_BASE_URL= process.env.NEXT_PUBLIC_AUTH0_BASE_URL
process.env.AUTH0_ISSUER_BASE_URL= process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL
process.env.AUTH0_CLIENT_ID= process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
process.env.AUTH0_CLIENT_SECRET= process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';



export default function Home() {
  const {user, error , isLoading} = useUser()

  const router = useRouter();
    
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
      <div>
        <p>not logged in!</p>
        <a href="/api/auth/login">Login</a>
      </div>
    )
  } else if (isLoading){
    return (
      <div>loading</div>
    )
  } else{

    return user && (<div className="bg-white min-h-screen">
    {/* Blurred background */}
    <p style={{color: 'black'}}>{user.name}</p>
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
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 sm:text-5xl mt-12 lg:mt-0">
            Discover Growth and Self-improvement
          </h1>
          <p className="mt-8 text-lg sm:text-xl leading-7 text-gray-600">
            TheraVibe.VR provides personalized psychological therapy. Embark on a transformative journey with our groundbreaking VR therapy experience. Tailored to your unique needs, our immersive sessions offer a safe and private space where you can freely express your thoughts and emotions. Customize your therapist's appearance and surroundings to create a comfortable environment that empowers you to confidently explore your vulnerabilities. With engaging activities designed to promote relaxation and personalized recommendations to foster positive thinking, our VR therapy is a powerful tool for self-discovery and growth. Say hello to a new era of therapy, where innovation meets compassion, and healing knows no bounds. 
          </p>
          <div className="mt-12 flex items-center justify-center gap-x-6">
            {/* <button onClick={() => handleAuth()}
              className="rounded-md bg-indigo-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              > */}
              {/* Get started
            </button> */}
          </div>
        </div>
      </div>
    </div>
    {/* <button onClick={() => handleOut()}
      className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
    >
      Logout
    </button> */}
    <a href="/api/auth/logout">Logout</a>
  
  </div>
  
  ); 
  }
}
