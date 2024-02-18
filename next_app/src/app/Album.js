"use client"
import React from 'react';

const Album = ({ photos }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {photos.map((photo, index) => (
        <img key={index} src={photo.url} alt={`Photo ${index}`} className="w-full h-auto" />
      ))}
    </div>
  );
};

export default Album;