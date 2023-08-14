import React, { useState, useEffect } from 'react'
import { server_origin } from '../utilities/constants';


import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import "../css/login.css";

// Firebase for OTP
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

//IMPORTS FOR Language change Functionality
import i18n from "i18next";
import { useTranslation } from "react-i18next";

import namasteIcon from "../../src/assests/namaste.png";


const Login = () => {

    const navigate = useNavigate();

    //* IMPORTANT State: -1: EnterPhoneComponent
    //*                   0: EnterOTPComponenent
    //*                   1: EnterPasswordCheckComponenent
    //*                   2: EnterPasswordCreateComponenent
    const [componentState, setComponentState] = useState(-1);
    //*


    //* 3 Inputs mobile, otp and password
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOTP] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);

    //*

    //* Checkers
    const [otpSent, setOTPSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpError, setOtpError] = useState(null);

    const [captchaGenerated, setCaptchaGenerated] = useState(false);

    //? Language Functionality Starts ............................................................

    const { t } = useTranslation("translation", { keyPrefix: 'login' });


    //used to get language Stored in LocalStorage //*should be in every Page having Language Functionality 
    useEffect(() => {
        let currentLang = localStorage.getItem('lang');
        i18n.changeLanguage(currentLang);

        // console.log(t('array'  , { returnObjects: true }));

    }, []);


    //? Language Functionality Ends .................................................................


    //These 3 functions are for OTP sending and verification
    function onCaptchVerify() {
        try {
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    "recaptcha-container",
                    {
                        size: "invisible",
                        callback: (response) => {
                            setCaptchaGenerated(true);
                            onSignup();
                        },
                        'expired-callback': () => {
                            toast.error(t('capthchaExpiredToast'))
                        }
                    },
                    auth

                );
            }
        }
        catch (err) {
            console.log("Captcha error: ", err);
        }
    }

    //! WILL WORK ONLY FOR INDIAN PHONE NUMBERS WITH +91 code.
    const onSignup = () => {
        //* Display EnterOTP component when OTP is sent successfully
        const mobLength = mobileNumber.length;
        if ((mobLength !== 10)) {
            toast.error(t('invalidMobileToast'));
            return;
        }
        setLoading(true);
        //*Show OTP enter component
        setComponentState(0);

        //* Generate window.recaptcha
        if (captchaGenerated === false) {
            // console.log("HERE");
            onCaptchVerify();
        }

        const appVerifier = window.recaptchaVerifier;

        const formatPh = "+91" + mobileNumber;
        // console.log(formatPh);

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                // setOTPSent(true);
                setComponentState(0);
                toast.success(`${t("otpSentToast")} to mobile number ${formatPh} `);
            })
            .catch((error) => {
                // toast.error("Please refresh the page and try again!");
                setOtpError(`Some error occured Please try again later. ${error.message}`)
                console.log("error1: ", error.message);
                // if(!otpError)
                // toast(error.message);
                // toast.error("Some error occured.");
                // setComponentState(-1);
                setLoading(false);
            });
    }

    function onOTPVerify() {
        setLoading(true);
        // toast("Please wait");
        window.confirmationResult
            .confirm(otp)
            .then((res) => {
                // OTP is verified, send request to server for token
                // console.log("RESRES: ", res);
                setOtpVerified(true);
                setLoading(false);
                toast.success(t("otpVerifiedToast"))
                // OTP is verified - Show Enter Password create component
                setComponentState(2);
            })
            .catch((err) => {
                toast.error(t('enterCorrectOTPToast'));
                console.log(err);
                if (err.code === "auth/code-expired") {
                    setOtpError("OTP has expired. Please request a new OTP.");
                } else {
                    setOtpError("Invalid OTP");
                }
                setLoading(false);
            });
    }

    const handleMobileNumberChange = (event) => {
        setMobileNumber(event.target.value);
    };

    const handleOTPChange = (event) => {
        setOTP(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordMatch(event.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordMatch(event.target.value === password);
    };



    const handleSendOtpClick = async () => {
        setLoading(true);

        // Check if the mobile is already registered
        const response = await fetch(`${server_origin}/api/user/check-mobile-registered`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ mobile: mobileNumber })
        });
        let response1 = await response.json();
        if (response1.success === true) {
            // Already registered
            // Render Password check component
            setComponentState(1);
            setLoading(false);
            return;
        }
        // Not registered before
        // Render EnterOTP component
        setLoading(false);
        onSignup();
    };

    const handleVerifyOtpClick = () => {
        //* When OTP is verified show set password component
        onOTPVerify();
    };

    const handleCheckPasswordButtonClick = async () => {
        //* Check the password
        setLoading(true);
        // Check if the password is correct
        const response = await fetch(`${server_origin}/api/user/check-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile: mobileNumber, password: password })
        });
        let response1 = await response.json();
        console.log("Check password response", response1);

        if (response1.success === true) {
            //* Password is correct
            toast.success(t('loggedInToast'));
            localStorage.setItem('token', response1.token);
            navigate('/test/instructions');
        }
        else {
            //* Wrong password
            toast.error(t('wrongPasswordToast'));
        }

        setLoading(false);

    }

    const handleForgotPasswordButtonClick = () => {
        //* Show OTP 
        //! Send the OTP as user forgots the password
        onSignup();
    }


    const handleCreatePasswordButton = async () => {
        //* Create new password?
        //* After this user is logged in and token is saved
        console.log("Password: ", password);
        if (password !== confirmPassword) {
            toast.warning(t('passwordNotMatchToast'));
            return;
        }

        // Create password and generate token and login
        //!Number already registered ??? update password and generate token ::: Create Password with mobile entry in DB and generate token
        const response = await fetch(`${server_origin}/api/user/login-create-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile: mobileNumber, password: password })
        });
        let response1 = await response.json();
        if (response1.success) {
            toast.success(t('passwordCreatedToast'));
            localStorage.setItem("token", response1.token);
            navigate("/test/instructions");
        }
        else {
            toast.error(t('cannotUpdatePasswordToast'));

        }

    }

    //components //* should start with capital letter

    //Componenent 1
    const EnterPhoneComponent = () => {
        return (
            <>
                <div className="login-form">
                    <h4>{t('enterPhone')}</h4>
                    <input
                        type="tel"
                        className="login-input"
                        placeholder={t('mobilePlaceholder')}
                        value={mobileNumber}
                        onChange={handleMobileNumberChange}
                    // disabled={loading} 
                    />
                    <button
                        className="send-otp-button"
                        onClick={handleSendOtpClick}
                    >
                        {loading ? t('waitButton') : t('loginButton')}
                    </button>

                </div>
            </>
        )
    }


    const EnterPasswordCheckComponent = () => {
        return (
            <>
                <div className="login-form">
                    <h4>{t('enterPasswordToLogin')}</h4>
                    <input
                        type="password"
                        className="login-input"
                        placeholder={t('passwordPlaceholder')}
                        value={password}
                        onChange={handlePasswordChange}
                        disabled={loading}
                    />
                    <p className="forgot-password-link" onClick={handleForgotPasswordButtonClick}>
                        <span>{t('forgotPassword')}</span>
                    </p>
                    <button
                        className="send-otp-button"
                        onClick={handleCheckPasswordButtonClick}
                    >
                        {loading ? t('waitButton') : t('submitButton')}
                    </button>
                </div>
            </>
        )
    }

    const EnterPasswordCreateComponent = () => {
        return (
            <>
                <div className="login-form">
                    <h4>{t('enterPasswordToCreate')}</h4>
                    <input
                        type="password"
                        className="login-input"
                        placeholder={t("passwordPlaceholder")}
                        value={password}
                        onChange={handlePasswordChange}
                        disabled={loading}
                    />
                    <input
                        type="password"
                        className={`login-input ${passwordMatch ? '' : 'password-mismatch'}`}
                        placeholder={t('confirmPasswordPlaceholder')}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        disabled={loading}
                    />
                    {!passwordMatch && <p className="error-message">{t('PasswordNotMatch')}</p>}
                    <button
                        className="send-otp-button save-password-button"
                        onClick={handleCreatePasswordButton}
                        disabled={loading || !passwordMatch}
                    >
                        {loading ? t('waitButton') : t('saveContinueButton')}
                    </button>
                </div>
            </>
        )
    }


    const EnterOTPComponent = () => {
        return (
            <>
                <div className="login-form">
                    <h4>{t('enterOTP')}</h4>
                    <input
                        type="text"
                        className="login-input otp-input"
                        placeholder={t("otpPlaceholder")}
                        value={otp}
                        onChange={handleOTPChange}
                        disabled={loading}
                    />
                    {/* {otpError && <p className="error-message">{otpError}</p>} */}
                    {/* {otpError && toast(otpError)} */}

                    <button
                        className="send-otp-button login-button"
                        onClick={handleVerifyOtpClick}
                        disabled={loading}
                    >
                        {loading ? t('waitButton') : t('verifyOTPButton')}
                    </button>
                </div>
            </>
        )
    }





    return (
        <>
            <div id="recaptcha-container"></div>

            <div className='welcome-heading'>
                <h2 className="fancy-text">
                    {t('welcomeUser')} <img src={namasteIcon} alt="Custom Icon" className="custom-icon" />
                </h2>
            </div>

            <div className="component-slide">
                {componentState === -1 && EnterPhoneComponent()}
                {componentState === 0 && EnterOTPComponent()}
                {componentState === 1 && EnterPasswordCheckComponent()}
                {componentState === 2 && EnterPasswordCreateComponent()}
            </div>

        </>
    );
};

export default Login;