import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets'


const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
              
                <img src={assets.fleet_icon} alt="" />
               
                 <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur nemo animi fugit quos repudiandae ea ab nostrum dolor perferendis commodi magnam consectetur minima necessitatibus alias, error amet unde quasi veritatis.</p>
                <div className="footer-social-icon">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                   <h2>GET IN TOUCH</h2>    
                   <ul>
                    <li>+1-212-456-3456</li>
                    <li>feastfleet@gmail.com</li>
                   </ul>
            </div>
        </div>
    <hr />
    <p className="copy-right">CopyRight 2025 Tomato.com - All Right Reserved</p>
      
    </div>
  )
}

export default Footer
