import React, { useState } from 'react'

import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import "../css/login.css";

// Firebase for OTP
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


const Login = () => {
    //below 2 are inputs
    
    var testMobileNumber = "+16505554567";
    var testVerificationCode = "123456";
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOTP] = useState('');

    const [otpSent, setOTPSent] = useState(false);
    const [loading, setLoading] = useState(false);

    //*This function is called once the OTP is verified, to generate the token
    const loginUser = async ()=>{
        const response = await fetch(`http://localhost:5000/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mobile: mobileNumber})
        });
        let response1 = await response.json();
        if(response1.success){
            localStorage.setItem('token', response1.token);
            toast.success("Logged in successfully");
            navigate("/");
        }
    }

    //These 3 functions are for OTP sending and verification
    function onCaptchVerify() {
        try{
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    "recaptcha-container",
                    {
                        size: "invisible",
                        callback: (response) => {
                            onSignup();
                        },
                        "expired-callback": () => {  },
                    },
                    auth
                );
            }
        }
        catch(err){
            console.log("Captcha error: ", err);
        }
    }

    //! WILL WORK ONLY FOR INDIAN PHONE NUMBERS WITH +91 code.
    function onSignup() {
        const mobLength = mobileNumber.length;
        if ((mobLength !== 10)) {
            toast.error("Please enter valid mobile number");
            return;
        }
        setLoading(true);
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;

        const formatPh = "+91" + mobileNumber;
        console.log(formatPh);

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setOTPSent(true);
                toast.success("OTP sent successfully!");
            })
            .catch((error) => {
                // toast.error("Please refresh the page and try again!");
                console.log("error1: ", error.message);

                setLoading(false);
            });
    }

    function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then( (res) => {
                //!OTP is verified, send request to server for token
                console.log("RESRES: ", res);
                loginUser();
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Invalid OTP")
                setLoading(false);
            });
    }

    const handleMobileNumberChange = (event) => {
        setMobileNumber(event.target.value);
    };

    const handleOTPChange = (event) => {
        setOTP(event.target.value);
    };

    const handleSendOtpClick = () => {
        onSignup();
    };

    const handleVerifyOtpClick = () => {
        onOTPVerify();
    };

    return (
        <>
          <div id="recaptcha-container"></div>
    
          <div className="login-form">
            <h2>Login</h2>
            <input
              type="tel"
              className="login-input"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              disabled={otpSent || loading} // Disable the input during OTP verification
            />
            {/* {error && <p className="error-message">{error}</p>} Show error message */}
            {!otpSent ? (
              <button
                className="send-otp-button"
                onClick={handleSendOtpClick}
                disabled={loading} // Disable the button during OTP sending
              >
                {loading ? "Please wait..." : "Send OTP"}
              </button>
            ) : (
              <>
                <input
                  type="text"
                  className="otp-input"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOTPChange}
                  disabled={loading} // Disable the input during OTP verification
                />
                <button
                  className="login-button"
                  onClick={handleVerifyOtpClick}
                  disabled={loading} // Disable the button during OTP verification
                >
                  {loading ? "Please wait..." : "Verify"}
                </button>
              </>
            )}
          </div>
        </>
      );
    };

export default Login;