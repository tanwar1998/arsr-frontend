import React, { useState } from 'react';
import Slides from './slides.jsx';

export default function Home(props) {

  return (
      <div className='hor-row home-container-main'>
        <div className='hor-row container-main'>
          <h2>
            Home page 
          </h2>

            <Slides
              { ...props }/>
        </div>
      </div>
    );
  }