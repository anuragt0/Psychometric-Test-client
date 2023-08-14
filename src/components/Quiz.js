import React, { useEffect, useState } from 'react'
import { server_origin } from '../utilities/constants';
import { useNavigate } from 'react-router-dom';
import "../css/quiz.css";
import { SyncLoader } from 'react-spinners'; // Import the ClipLoader from "react-spinners"

import 'react-circular-progressbar/dist/styles.css';


import { toast, Toaster } from "react-hot-toast";

// IMPORTS for Language Functionlaity
import i18n /*, { changeLanguage }*/ from "i18next";
import { useTranslation } from 'react-i18next';



function Quiz() {

    const { t } = useTranslation("translation", { keyPrefix: 'quiz' } );

    // when Page Refreshes
    useEffect(()=>{
      let currentLang = localStorage.getItem('lang');
      i18n.changeLanguage(currentLang);
    //   console.log(currentLang);
    //! Storing Question Array According to the language in LocalStorage
    const questions1 = t('question'  , { returnObjects: true });
    console.log(questions1);
    setQuestions(questions1);
    setLoading(false);

    },[]);




    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
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
          getQuestions();

         
    }, [])


    // Dummy getQuestions
    const getQuestions = ()=>{
        //! Storing Question Array According to the language in LocalStorage
        const questions1 = t('question'  , { returnObjects: true });
        console.log(questions1);
        setQuestions(questions1);
        setLoading(false);
    };

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [clickedOption, setClickedOption] = useState(5);


    const nextQuestion = () => {
        if (clickedOption === 5 && !result[currentQuestionIndex]) {
            toast.error(t('toast.selectAtLeastOneOption'));
            return;
        }
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setClickedOption(5);
        }
    }

    const previousQuestion = () => {

        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setClickedOption(5);
        }
    }

    const updateResult = (option) => {
        setResult((prevResult) => {
            const updatedResult = [...prevResult];
            updatedResult[currentQuestionIndex] = option;
            // console.log(updatedResult);
            return updatedResult;
        });
    }

    const handleSubmit = async () => {
        if (result.length !== questions.length) {
            toast.error(t('toast.answerAllQuestions'));
            return;
        }
        // console.log("Submit quiz");
        // console.log(result);

        const response = await fetch(`${server_origin}/api/user/update-response`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ responses: result })
        });
        let response1 = await response.json();
        // console.log( response1);
        if (response1.success == true) {
            toast.success(t('toast.testSubmittedSuccessfully'));
            navigate("/test/register");
        }
        else {
            toast.error(t('toast.submitError'));
        }

        if (document.fullscreenElement) {
            document.exitFullscreen();
        }

    }


    const imageArray = [require("../images/1.png"), require("../images/2.png"), require("../images/3.png")
        , require("../images/4.png"), require("../images/5.png"), require("../images/6.png"), require("../images/7.png")
        , require("../images/8.png"), require("../images/9.png"), require("../images/10.png"), require("../images/11.png")
        , require("../images/12.png"), require("../images/13.png"), require("../images/14.png"), require("../images/15.png")
        , require("../images/16.jpg"), require("../images/17.png"), require("../images/18.jpg"), require("../images/19.png")
        , require("../images/20.png"), require("../images/21.png"), require("../images/22.png"), require("../images/23.png")
        , require("../images/24.png"), require("../images/25.png"), require("../images/26.png")];

    const totalQuestions = questions.length;
    const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;


    return (

        <div className='bodyy'>


            {isUserAuthenticated && questions.length !== 0 && !loading ? <>

                <div className="left">
                    

                        <div className="question">
                            <span id="question-number">{currentQuestionIndex + 1}. </span>
                            <span id="question-txt">{questions[currentQuestionIndex]["questionText"]}</span>
                        </div>
                        <div className="option-container">
                            {questions[currentQuestionIndex].options.map((option, i) => {
                                return (
                                    <button
                                        // className="option-btn"
                                        className={`option-btn ${clickedOption === i + 1 || result[currentQuestionIndex] === i + 1 ? 'checked' : ''}`}
                                        key={i}
                                        onClick={() => { setClickedOption(i + 1); updateResult(i + 1) }}
                                    >
                                        {option}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="buttons">
                            <button value="Next" id="next-button" onClick={nextQuestion}> {t('controls.next')}</button>
                            <button value="Prev" id="prev-button" onClick={previousQuestion}> {t('controls.previous')} </button>
                        </div>
                        <button style={result.length !== questions.length ? { display: "none" } : {}} className='btn btn-success' onClick={handleSubmit}>{t('controls.submit')}</button>

                <div className="right my-5">
                    <div className="box">

                    </div>
                    {/* <div className="box1"> */}
                    <img src={imageArray[currentQuestionIndex]} alt="img" /> 
                    {/* </div> */}
                    
                </div>

            </> : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <SyncLoader size={30} color="#fb2576" />
            </div>
            }
        </div>
    )
}

export default Quiz