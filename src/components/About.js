import React from 'react';
import '../css/about.css';
import aboutImg from '../images/about-img.svg';
import wepLogo from '../images/wep-logo.svg';
import caXpert from '../images/caXpert.svg';

 function About() {
  return (

    <div className="about">

       <div className="page1">
       <div className="extra"></div>
        <h3 className="we-are">WE ARE</h3>
        <h1>UDYAM UPLIFT</h1>
        
          <div className="Greenbox">
            <h3 className="msg-about">Uncover the<br></br> Path to Success <br></br>with<br></br> Personalized<br></br> Compliance<br></br> Solutions.</h3>
          </div>
       </div>
       
      
       <div className="page2">
        <div className="square1">
            
        </div>
        <div className="square2">
            <h5>ABOUT</h5>
        </div>
        <div className="about-box">
            <div className="about-img">
                <img src={aboutImg} alt="img" style={{height:"100%", width:"100%", marginLeft:"10%"}}></img>
            </div>
            <div className="about-cont">
            
                <p>
                Discover your compliance mindset and receive<br></br>
                personalized strategies to overcome barriers<br></br>
                and achieve success. Our comprehensive test<br></br> 
                and insightful PDF report will empower you<br></br> 
                to reach new heights in your entrepreneurial <br></br>
                journey. Reduce drop-out rates and<br></br> 
                unlock your true potential with Compliance<br></br> 
                Self Help Test.<br></br>
                </p>
            </div>
        </div>
       </div>

       <div className="page3">
        <div className="extra2"></div>
         <div className="square1">
            
         </div>
         <div className="square2">
                <h5>ABOUT<br></br> WEP</h5>
         </div>
         <div className="about-box">
            
            <div className="about-cont">
                <p>
                Discover your compliance mindset and receive<br></br>
                personalized strategies to overcome barriers<br></br>
                and achieve success. Our comprehensive test<br></br> 
                and insightful PDF report will empower you<br></br> 
                to reach new heights in your entrepreneurial <br></br>
                journey. Reduce drop-out rates and<br></br> 
                unlock your true potential with Compliance<br></br> 
                Self Help Test.<br></br>
                </p>
            </div>
            <div className="about-img">
                <img src={wepLogo} alt="img" style={{height:"100%", width:"100%", marginLeft:"10%"}}></img>
            </div>
        </div>
       </div>

       <div className="page4">
       <div className="square1">
            
            </div>
            <div className="square2">
                <h5>PARTNER<br></br>WITH</h5>
            </div>
            <div className="about-box">
                <div className="about-img">
                    <img src={caXpert} alt="img" style={{height:"100%", width:"85%", marginLeft:"10%"}}></img>
                </div>
                <div className="about-cont">
                    <p>
                    Discover your compliance mindset and receive<br></br>
                    personalized strategies to overcome barriers<br></br>
                    and achieve success. Our comprehensive test<br></br> 
                    and insightful PDF report will empower you<br></br> 
                    to reach new heights in your entrepreneurial <br></br>
                    journey. Reduce drop-out rates and<br></br> 
                    unlock your true potential with Compliance<br></br> 
                    Self Help Test.<br></br>
                    </p>
                </div>
            </div>
       </div>

    </div>
  )
}

export default About;