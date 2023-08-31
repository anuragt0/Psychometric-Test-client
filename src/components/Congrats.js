import React, { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { server_origin } from '../utilities/constants';

import useWindowSize from "@rooks/use-window-size";
import Confetti from 'react-confetti'
import { toast, Toaster } from "react-hot-toast";

import "../css/congrats.css";


const Congrats = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    let savedProgress = localStorage.getItem('testProgress');
    savedProgress = JSON.parse(savedProgress);
    if (savedProgress === null || savedProgress.length !== 26) {
      toast.error("Please complete the test to continue");
      navigate("/test/instructions");
      return;
    }
    verifyUser();
    setLoading(false);

  }, [])
  const verifyUser = async () => {
    if (localStorage.getItem('token')) {
      const response = await fetch(`${server_origin}/api/user/verify-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });

      const result = await response.json()
      if (result.success === true) {
        setLoggedIn(true);
      }
    }
  }


  const handleRegister = () => {
    navigate("/register")
  }

  const handleLogin = () => {
    navigate("/login")
  }

  const handleViewReport = () => {
    navigate("/test/result")
  }

  const { width, height } = useWindowSize()

  return (
    <>
      <Confetti
         width={window.innerWidth}
         height={window.innerHeight}
        //  numberOfPieces={600}
        //  recycle={false}
 />

 
      {!loading &&
        <div className="congratulations-container">
          <div className="congratulations-content">
            <h2 className='main-heading'>Congratulations!🎉</h2>
            <p className='sub-heading'>You have successfully submitted the test.</p>
            {
              !loggedIn ?
                <p className='sub-heading'>PLEASE LOGIN OR REGISTER TO VIEW YOUR RESULT..</p>
                : <p className='sub-heading'>Click on below button to view your report</p>
            }
            <div className="buttons-container">
              {
                !loggedIn ? <>
                  <button className="login-button" onClick={handleLogin}>Login</button>
                  <button className="signup-button" onClick={handleRegister}>Sign Up</button>
                </>
                  : <button className="signup-button" onClick={handleViewReport}>View Report</button>
              }
            </div>
          </div>
        </div>

      }

    </>
  )
}

export default Congrats