import React from 'react'
import './page.css'
import { BsTwitter } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'
import { BsLinkedin } from 'react-icons/bs'
import { BsYoutube } from 'react-icons/bs'
import img from './images/logo512.png'
import {Link} from 'react-router-dom'

export const Footer = () => {
    return (
        <div className='footer'>

            <div>
                <img className='footer-img' src={img} />
            </div>
            <div className='footer-deco'>
                <Link >Community</Link> <br />
                <a target='_blank' href='https://wep.gov.in/about'>About WEP</a><br />
                <a target='_blank' href='https://wep.gov.in/partners'>Partners </a><br />
            </div>

            <div className='footer-deco'>
            <a target='_blank' href='https://wep.gov.in/newsletter'>Newsletter</a> <br />
            <a target='_blank' href='https://wep.gov.in/events'>Events</a> <br />
            <a target='_blank' href='https://wep.gov.in/disclaimer'>Disclaimer</a> <br />
            </div>

            <div className='footer-deco'>
            <a target='_blank' href='https://wep.gov.in/faq'>FAQ's</a> <br />
            <a target='_blank' href='https://wep.gov.in/contactus'>Feedback</a> <br />
            </div>

            <div className='footer-deco socials'>
                <a target='_blank' href='https://twitter.com/NITIAayog'><BsTwitter /></a> <br />
                <a target='_blank' href='https://www.facebook.com/WomenEntrepreneurshipPlatform/'><FaFacebook /></a><br />
                <a target='_blank' href='https://www.linkedin.com/company/women-entrepreneurship-platform-niti-aayog/' ><BsLinkedin /></a><br />
                <a target='_blank' href='https://www.youtube.com/watch?v=UFJeTwHh01w' ><BsYoutube /></a><br />
            </div>

        </div>
    )
}
