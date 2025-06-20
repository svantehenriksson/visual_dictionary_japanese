// ImageList.js
import React, { useState } from 'react';
import './ImageList.css';

import wordsAndImages from './WordsAndImages';



const ImageList = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="image-grid">
      {wordsAndImages.map((wordsAndImages, index) => (
        <div
          key={index}
          className="image-card"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onTouchStart={() => setHoveredIndex(index)}
        >
          <img src={`/${wordsAndImages.img}`} alt={wordsAndImages.fi} />
          <div className="caption">
            {hoveredIndex === index ? wordsAndImages.en : wordsAndImages.fi}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
