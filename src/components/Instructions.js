import React from "react";
import { server_origin } from '../utilities/constants';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, } from "react-hot-toast";
import { SyncLoader } from 'react-spinners'; // Import the ClipLoader from "react-spinners"

import "../css/instructions.css"


//IMPORTS FOR Language change Functionality
import i18n from "i18next";
import { useTranslation } from "react-i18next";
// import '../../library/i18n';

function InstructionsPage() {

    //? Language Functionality Starts ............................................................

    const { t } = useTranslation("translation", { keyPrefix: 'instruction' });


    //used to get language Stored in LocalStorage //*should be in every Page having Language Functionality 
    useEffect(() => {
        let currentLang = localStorage.getItem('lang');
        i18n.changeLanguage(currentLang);

        // console.log(t('array'  , { returnObjects: true }));

    }, []);


    //? Language Functionality Ends .................................................................



    const navigate = useNavigate();
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //*Validate the token to see if the page is accessible to the user
        const validateUserToken = async () => {
            setLoading(true);
            const response = await fetch(`${server_origin}/api/user/verify-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
            });
            let response1 = await response.json();
            setLoading(false);
            console.log('ValidateUserToken response: ', response1);
            if (response1.success === true) {
                setIsUserAuthenticated(true);
            } else {
                toast.error(t('toast.loginToContinue'), {
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
            {isUserAuthenticated && !loading ? (
                <>
                    <h1>{t('testInstructions')}</h1>
                    <p>{t('welcomeMessage')}</p>
                    <p>
                        <strong>{t('instructionsHeader')}</strong>
                    </p>
                    <ol>
                        {t('instructionList', { returnObjects: true }).map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                    <p>
                        <strong>{t('note')}</strong>: {t('noteMessage')}
                    </p>

                    <div className="start-button-container">
                        <button onClick={() => {
                            navigate('/test/start');
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
                        }} className='btn btn-primary'>{t('startTestButton')}</button>
                    </div>
                </>
            ):(
                loading && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <SyncLoader size={30} color="#fb2576" />
                </div>
                )
            )}
        </div>
    );
}

export default InstructionsPage;

