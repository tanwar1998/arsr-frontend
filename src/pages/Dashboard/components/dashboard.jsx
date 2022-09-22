import React from 'react';
import Employee from './employee.jsx';

export default function Home(props) {

  return (
      <div className='hor-row home-container-main'>
        <div className='hor-row container-main'>
          <h2>
            Home page 
          </h2>

            <Employee
              { ...props }/>
        </div>
      </div>
    );
  }