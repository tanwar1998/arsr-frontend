import React, { useState } from 'react';
import Gallery from './gallery.jsx';

export default function Component(props) {




    return (
      <div className='hor-row home-container-main'>
        <div className='hor-row container-main'>
          <h2>
            Gallery
          </h2>

            <Gallery
              { ...props }/>
        </div>
      </div>
    );
  }