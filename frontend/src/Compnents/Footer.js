import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PinterestIcon from '@mui/icons-material/Pinterest';
import CallIcon from '@mui/icons-material/Call';
function Footer() {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1 className="title"> Categories</h1>
          <span className="words"> jeans</span>
          <span className="words"> pants</span>
          <span className="words"> dresses</span>
        </div>
        <div className="item">
          <h1 className="title">JOIN US</h1>
          <span>
            {' '}
            <FacebookIcon></FacebookIcon>
          </span>
          <span>
            <InstagramIcon></InstagramIcon>
          </span>

          <span>
            <PinterestIcon></PinterestIcon>
          </span>
        </div>
        <div className="item">
          <h1 className="title"> About</h1>
          <p className="words">
            {' '}
            we are a clothing brand for women! our target is to make you
            fashionable, comfortable, trendy, elegant and confident
          </p>
        </div>
        <div className="item">
          <h1 className="title">Contact</h1>
          <span>
            <p className="words"> you can contact our customer service via:</p>{' '}
            <AlternateEmailIcon></AlternateEmailIcon>
          </span>
          <span>
            <CallIcon></CallIcon>
          </span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo"> theBOw</span>
          <span className="copyright">
            ©-Copyright 2023, all rights Reserved
          </span>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}

export default Footer;
