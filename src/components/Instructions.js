import React from "react";
import { server_origin } from '../utilities/constants';
import {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, } from "react-hot-toast";
import "../css/instructions.css"

function InstructionsPage() {
    const navigate = useNavigate();
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

    useEffect(() => {
        //*Validate the token to see if the page is accessible to the user
        const validateUserToken = async () => {
          const response = await fetch(`${server_origin}/api/user/verify-user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token'),
            },
          });
          let response1 = await response.json();
          console.log('ValidateUserToken response: ', response1);
          if (response1.success === true) {
            setIsUserAuthenticated(true);
          } else {
            toast.error('Please Login to continue', {
                style: {
                  border: '1px solid #713200',
                  padding: '16px',
                  color: '#713200',
                },
                iconTheme: {
                  primary: '#713200',
                  secondary: '#FFFAEE',
                },
              });
            navigate('/login');
          }
        };
      
        // Run the effect only once on component mount
        validateUserToken();
      
        // Cleanup function to prevent duplicate execution
        return () => {
            
        };
      }, []);
      
    

  return (
    <div className="instructions-page">
    {!isUserAuthenticated?"":(
        <>
        <h1>Test Instructions</h1>
        <p>
            Welcome to the test! This test contains 26 questions, and for each question, you'll have four options to choose from.
        </p>
        <p>
            <strong>Instructions:</strong>
        </p>
        <ol>
            <li>Ensure you are in a quiet environment to concentrate on the test.</li>
            <li>Read each question carefully and choose the best option.</li>
            <li>Once you select an option, you can also change it.</li>
            <li>There is no time limit, so take your time and do your best!</li>
            <li>After clicking the "Start Test" button, full-screen mode will be enabled.</li>
            <li>This test is designed to assess your knowledge and skills in various areas.</li>
            <li> Please answer each question to the best of your ability.</li>
        </ol>
        <p>
            <strong>Note:</strong> If you accidentally exit full-screen mode during the test, you can click the "Go Full Screen" button again to re-enable it.
        </p>
        <div className="start-button-container">
        <button onClick={()=>{
                navigate('/test/start')
                const element = document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                // Firefox
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                // Chrome, Safari, and Opera
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                // Internet Explorer and Edge
                element.msRequestFullscreen();
            }
            }} className='btn btn-primary'> Start Test</button>
        </div>

        </>
    )}
    </div>
  );
}

export default InstructionsPage;

