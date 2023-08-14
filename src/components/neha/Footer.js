import React , {useEffect} from 'react'
import './page.css'
import { BsTwitter } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'
import { BsLinkedin } from 'react-icons/bs'
import { BsYoutube } from 'react-icons/bs'
import img from './images/logo512.png'
import {Link} from 'react-router-dom'

//IMPORTS FOR Language change Functionality
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import '../../library/i18n';

export const Footer = () => {
    //? Language Functionality Starts ............................................................
  
const { t } = useTranslation("translation", { keyPrefix: 'footer' } );

  

//used to get language Stored in LocalStorage //*should be in every Page having Language Functionality 
useEffect(()=>{
  let currentLang = localStorage.getItem('lang');
  i18n.changeLanguage(currentLang);

  // console.log(t('array'  , { returnObjects: true }));

},[]);


//? Language Functionality Ends .................................................................




    return (
        <div className='footer'>

            <div>
                <img className='footer-img' src={img} />
            </div>
            <div className='footer-deco'>
                <Link >{t('Community')}</Link> <br />
                <a target='_blank' href='https://wep.gov.in/about'> {t('About_WEP')}</a><br />
                <a target='_blank' href='https://wep.gov.in/partners'>{t('Partners')} </a><br />
            </div>

            <div className='footer-deco'>
            <a target='_blank' href='https://wep.gov.in/newsletter'>{t('Newsletter')}</a> <br />
            <a target='_blank' href='https://wep.gov.in/events'>{t('Events')}</a> <br />
            <a target='_blank' href='https://wep.gov.in/disclaimer'>{t('Disclaimer')}</a> <br />
            </div>

            <div className='footer-deco'>
            <a target='_blank' href='https://wep.gov.in/faq'>{t('FAQ')}</a> <br />
            <a target='_blank' href='https://wep.gov.in/contactus'>{t('Feedback')}</a> <br />
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
