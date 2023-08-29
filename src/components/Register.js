import React, { useState, useEffect } from 'react';
import { server_origin } from '../utilities/constants';
import { useNavigate } from 'react-router-dom';
import "../css/register.css";
import "../css/login.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, } from "react-hot-toast";
import { faUser, faEnvelope, faMars, faCalendarAlt, faCity,  faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

//IMPORTS FOR Language change Functionality
import i18n from "i18next";
import { useTranslation } from "react-i18next";


// Firebase for OTP
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

//!CHECK IF USER HAS GIVEN THE TEST, THEN ONLY ALLOW TO REGISTER
//* get the user by using token in localstorage and then check if the user is registered or not
const RegistrationPage = () => {

    //? Language Functionality Starts ............................................................

    const { t } = useTranslation("translation", { keyPrefix: 'register' });

    //used to get language Stored in LocalStorage //*should be in every Page having Language Functionality 
    useEffect(() => {
        let currentLang = localStorage.getItem('lang');
        i18n.changeLanguage(currentLang);

        // console.log(t('array'  , { returnObjects: true }));
    }, []);


    //? Language Functionality Ends .................................................................

    const navigate = useNavigate();

    useEffect(() => {
        let savedProgress = localStorage.getItem('testProgress');
        savedProgress = JSON.parse(savedProgress);
        // if(savedProgress===null || savedProgress.length!==26){
        //     toast.error("Please complete the test to continue");
        //     navigate("/test/instructions");
        //     return;
        // }
        if(savedProgress !== null)
            setUserTestResponses(savedProgress)
    }, [])
    


    //* STATES
    //todo bug in storing gender
    const [credentials, setCredentials] = useState({ name: "", email: "", gender: "", age: "",  city: ""});

    //* 3 Inputs mobile, otp and password
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOTP] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    // const [showPassword, setShowPassword] = useState(false);

    //* componentState = 1 means EnterPhoneComponent
    //* componentState = 2 means EnterOtpComponent
    //* componentState = 3 means RegisterComponent
    const [componentState, setComponentState] = useState(1);

    const [userTestResponses, setUserTestResponses] = useState([]);


    //*

    //* Checkers
    const [otpSent, setOTPSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpError, setOtpError] = useState(null);

    const [captchaGenerated, setCaptchaGenerated] = useState(false);
       
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
                            toast.error(t('toast.capthchaExpiredToast'))
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
            toast.error(t('toast.invalidMobileToast'));
            return;
        }
        setLoading(true);
        //*Show OTP enter component
        setComponentState(2);

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
                const str = t("toast.otpSentToast") + " " + formatPh;
                toast.success(str);
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
                toast.success(t("toast.otpVerifiedToast"))
                console.log("HERHERHEHREH");
                setComponentState(3);
                // OTP is verified - Show Enter Password create component
            })
            .catch((err) => {
                toast.error(t('toast.enterCorrectOTPToast'));
                console.log(err);
                if (err.code === "auth/code-expired") {
                    setOtpError(t('toast.otpExpired'));
                } else {
                    setOtpError(t('toast.otpInvalid'));
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
            toast.success("This number is already registered, please login to continue");
            navigate("/login");
            return;
        }
        // Not registered before
        // Render EnterOTP component
        setLoading(false);
        onSignup();
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        if(credentials.name.length === 0){
            toast.error("Please enter name to register");
            return;
        }
        if(password.length<5){
            toast.error("Password must be of atleast 5 characters");
            return;
        }
        const updatedCreds = credentials;
        updatedCreds["password"] = password;
        updatedCreds["mobile"] = mobileNumber;
        updatedCreds["testResponse"] = userTestResponses;
        updatedCreds["lastTestDate"] = Date.now();

        const response = await fetch(`${server_origin}/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCreds)
        });
        let response1 = await response.json();
        console.log("Register response: ", response1);
        if (response1.success == true) {
            localStorage.setItem("token", response1.token);
            toast.success(t('toast.registered'));
            if(localStorage.getItem('testProgress')){
                navigate("/test/result");
                localStorage.removeItem("testProgress");
                return;
            }
            navigate("/");
        }
        else {
            toast.error(t('toast.not_register'));
        }

    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordMatch(event.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordMatch(event.target.value === password);
    };



    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleVerifyOtpClick = () => {
        //* When OTP is verified show set password component
        onOTPVerify();
    };

    //* COMPONENTS

    //Component 1
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
                        disabled={loading}
                        onClick={handleSendOtpClick}
                    >
                        {loading ? t('waitButton') : "Send OTP"}
                    </button>

                </div>
            </>
        )
    }

    //* COMPONENT 2
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

    //* Can only be seen after otp verification
    const RegisterComponent = () => {
        return (


            <div className="registration-page">
                {/* <h1>{t('register_to_view')}<span style={{ color: "#e31b66" }}>{t('results')}</span> </h1> */}
                <form onSubmit={handleRegister}>
                    <div className="input-field">
                        <label htmlFor="name">
                            <FontAwesomeIcon icon={faUser} />
                            &nbsp;
                            Name
                            <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name='name'
                            placeholder={t('name')}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="email">
                            <FontAwesomeIcon icon={faEnvelope} />
                            &nbsp;
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            placeholder={t('email')}
                            onChange={handleChange}
                        // required
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="gender">
                            <FontAwesomeIcon icon={faMars} />
                            &nbsp;
                            Gender
                            <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                            id="gender"
                            name='gender'
                            value={credentials.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value={0}>{"Select Gender"}</option>
                            <option value={1}>{t('male')}</option>
                            <option value={2}>{t('female')}</option>
                            <option value={3}>{"Other"}</option>
                        </select>
                    </div>

                    <div className="input-field">
                        <label htmlFor="age">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            &nbsp;
                            Age
                            <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="number"
                            id="age"
                            name='age'
                            value={credentials.age}
                            onChange={handleChange}
                            placeholder={t('age')}
                            required
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="city">
                            <FontAwesomeIcon icon={faCity} />
                            &nbsp;
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            name='city'
                            placeholder={t('city')}
                            value={credentials.city}
                            onChange={handleChange}
                        // required
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="password">
                            <FontAwesomeIcon icon={faLock} />
                            &nbsp;
                            Password
                            <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="password"
                            id='password'
                            placeholder={t("passwordPlaceholder")}
                            value={password}
                            onChange={handlePasswordChange}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">
                            <FontAwesomeIcon icon={faLock} />
                            &nbsp;
                            Confirm Password
                            <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="password"
                            className={`login-input ${passwordMatch ? '' : 'password-mismatch'}`}
                            placeholder={t('confirmPasswordPlaceholder')}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            disabled={loading}
                            required
                        />
                    </div>
                    {!passwordMatch && <p className="error-message">{t('PasswordNotMatch')}</p>}



                    <button type="submit" >{t('register')} <FontAwesomeIcon icon={faUnlock} /></button>
                </form>
            </div>
        )
    }

    return (
        <div className='register-outer-div'>
            <div id="recaptcha-container"></div>
            <div className="registration-heading">
                {/* <h1>{t('register_to_view')}<span style={{ color: "#e31b66" }}>{t('results')}</span> </h1> */}
                <h1 style={{textDecoration: "underline"}}>Register</h1>
                {/* <h3 style={{color: "#5b564e"}}>Your personalized <span style={{ color: "#37840b" }}>personality insights </span>report is just a step away. </h3> */}
                <h3 style={{color: "#5b564e"}}>Unlock Your Personalized Personality Insights Report
                <p style={{ color: "#1A5D1A" }}>Discover a deeper understanding of yourself, <em> just a step away</em></p></h3>
            </div>

            {componentState === 1 && EnterPhoneComponent()}
            {componentState === 2 && EnterOTPComponent()}
            {componentState === 3 && RegisterComponent()}

        </div>
    );
};

export default RegistrationPage;
