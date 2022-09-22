import React, { useState } from 'react';
import Client from './client.jsx';

export default function Component(props) {




    return (
      <div className='hor-row home-container-main'>
        <div className='hor-row container-main'>
          <h2>
            Clients
          </h2>

            <Client
              { ...props }/>
        </div>
      </div>
    );
  }