import React from 'react'
import twitter from '../assets/twitter_icon.png'
import linkedin from '../assets/linkedin_icon.png'
import facebook from '../assets/facebook_icon.png'
import '../css/Footer.css'

const Footer = () => {
  return (
    <div className="footer" id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img src="/logo.png" width={125} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, omnis fugiat, quo eligendi nihil nobis impedit magnam repudiandae aperiam sit, nulla amet veritatis voluptas cupiditate asperiores dolor quisquam maxime maiores.</p>
                <div className="footer-social-icons">
                    <img src={twitter} alt="" />
                    <img src={linkedin} alt="" />
                    <img src={facebook} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>TRAVEL SYNC</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Packages</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 89036 22449</li>
                    <li>hariharanmuthukumarslm@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <div className="footer-copyrights">
            Copyright 2025 @c  Tomato.com - All Rights Resevred
        </div>
    </div>
  )
}

export default Footer
