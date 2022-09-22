import React from 'react';
import { FooterContainer } from './style.js';
import CallIcon from '@mui/icons-material/Call';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';


export default function Navbar() {
    return (
      <FooterContainer className='hor-row '>
          <div className='hor-row footer-content-main'>
              <div className='basic-contact-content'>
                  <div className='hor-row basic-text-container'>
                      <CallIcon className='call-icon'/>
                      Call Us Anytime
                  </div>
                  <div className='hor-row number-text-container'>
                      9910347962, 8743003700
                  </div>
                  <div className='hor-row social-icons-container'>
                    <a href='https://www.facebook.com/blaroseplus'>
                      <div className='icon-container'>
                        <FacebookOutlinedIcon/>
                      </div>
                    </a>
                    <a href='https://www.youtube.com/channel/UC_QCTpdYX4FqDVYA-baroPA?view_as=subscriber'>
                      <div className='icon-container'>
                        <YouTubeIcon/>
                      </div>
                    </a>
                    <a href='https://instagram.com/blarose_official'>
                      <div className='icon-container'>
                        <InstagramIcon/>
                      </div>
                    </a>
                    <a href='https://twitter.com/BlaroseExpo'>
                      <div className='icon-container'>
                        <TwitterIcon/>
                      </div>
                    </a>
                  </div>
              </div>
              <div className='hor-row mail-text-container'>
                <div className='hor-row email-text'>
                  <span>
                    @
                  </span>
                    Email Us At
                </div>
                <a href='mailto:contact@blarose.com' className='hor-row'>
                  contact@blarose.com
                </a>
              </div>

              <div className='hor-row policy-content-main'>
                © Blarose Trenta . All rights reserved.  | {' '}
                <a href='#policy'>
                  Privacy Policy
                </a>
                <br/>
                Except as permitted by the copyright law applicable to you, you may not reproduce or communicate any of the content on this website, including files downloadable from this website, without the permission of the copyright owner.
              </div>
          </div>
      </FooterContainer>
    );
  }