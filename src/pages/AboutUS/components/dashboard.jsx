import React, { useState } from 'react';
import About from './about.jsx';
import OurTeam from './ourTeam.jsx';
import PreviousShow from './previousShow.jsx';

export default function Home(props) {
  const [currentComponent, setCurrentComponent] = useState('about');

  const elements = [
    {
      label: 'About US',
      value: 'about'
    },
    {
      label: 'Our Team',
      value: 'ourTeam'
    },
    {
      label: 'PreviousShow',
      value: 'previousShow'
    },
  ]



    return (
      <div className='hor-row home-container-main'>
        <div className='hor-row container-main'>
          <h2>
            About US
          </h2>

          <div className='hor-row tabs-container-main'>
            {
              elements.map((item)=>(
                <span className={'tab-item' + ( item.value === currentComponent ? ' selected-tab': '' ) }
                  key = { item.value } 
                  onClick = { ()=> setCurrentComponent(item.value)}
                  >
                  { item.label }
                </span>
              ))
            }
          </div>

            { currentComponent === 'about' && <About
              { ...props }/>}
            {currentComponent === 'ourTeam' && <OurTeam
              { ...props }/>}
            {currentComponent === 'previousShow' && <PreviousShow
              { ...props }/>}
        </div>
      </div>
    );
  }