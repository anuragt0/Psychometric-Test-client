// import { useState } from "react";
import React ,{ useEffect, useState , useRef } from "react";
import { server_origin } from "../../utilities/constants";
import { useNavigate } from 'react-router-dom';

import { FiDownload, FiBarChart2 } from 'react-icons/fi'; // Import the FiDownload and FiBarChart2 icons from react-icons
import { toast, Toaster } from "react-hot-toast";
import { SyncLoader } from 'react-spinners'; // Import the ClipLoader from "react-spinners"

import Graph from "./charts/Graph";
import PieChart from "./charts/PieChart";
import RadialBarChartComponent from './charts/RadialBarChart';
import { Footer } from "../neha/Footer";
import "./result.css"

//for Pdf downloadind Functionality
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// import { UserData } from "./Data";


//IMPORTS FOR Language change Functionality
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import '../../library/i18n';

function Result_M() {

//? Language Functionality Starts ............................................................
  
const { t } = useTranslation("translation", { keyPrefix: 'result' } );

//used to get language Stored in LocalStorage //*should be in every Page having Language Functionality 
useEffect(()=>{
  let currentLang = localStorage.getItem('lang');
  i18n.changeLanguage(currentLang);

  // console.log(t('array'  , { returnObjects: true }));
},[]);


//? Language Functionality Ends .................................................................



    const [responses, setResponses] = useState([])
    const [testDate, setTestDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating 2 seconds delay
            setLoading(false); // Set loading to false once the data is fetched or async task is completed
          };
      
          fetchData();

        getResult();

    }, [])

    
    //!Make separate functions for fetching results and validation

    const getResult = async () => {
        setLoading(true);
        const response = await fetch(`${server_origin}/api/user/get-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });
        let response1 = await response.json();
        // console.log("response1: ", response1);

        if (response1.success === false) {
            toast.error(t('toast.errorFetchResult'));
            navigate("/login");
            return;
        }
        if(response1.userDoc.isRegistered===false ){
            // two conditions: 1. User given the test but not registered
            // 2. User not given the test
            if(response1.userDoc.testResponse.length!==0){
                // user given the test
                toast.error(t('toast.registerToViewResults'));
                navigate("/test/register");
                return;
            }
            else{
                //user has not given the test
                toast.error(t('toast.noTestTaken'));
                navigate("/test/instructions");
                return;
            }

        }
        setResponses(response1.userDoc.testResponse);
        setTestDate(formatDateWithCustomTime(response1.userDoc.lastTestDate));
        console.log(formatDateWithCustomTime(response1.userDoc.lastTestDate));
        // console.log(response1.userDoc.testResponse);
        // console.log(response1.userDoc);
        // setLoading(false);
    }

    //* Download Functionallity Start*//
    const pdfRef =useRef() ;
    const handleDownloadClick = () => {
        console.log ("Download Started...");
        setDownloading(true);
        const input = pdfRef.current ;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio= Math.min(pdfWidth/imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY= 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('Result.pdf');
            setDownloading(false);
            toast.success(t('toast.resultsDownloaded')); // Using toast from react-hot-toast for demonstration
        });
    };
    //* Download Functionallity Ends *//

    //*Current Date and Time *//
    function getDaySuffix(day) {
        if (day >= 11 && day <= 13) {
          return 'th';
        }
        switch (day % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
        }
      }
      
      function formatDateWithCustomTime(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = String(date.getMinutes()).padStart(2, '0');
        const amPm = hour >= 12 ? 'PM' : 'AM';
        const formattedTime = `${hour % 12 || 12}:${minute} ${amPm}`;
      
        return `${day}${getDaySuffix(day)} ${month} ${year}, ${formattedTime}`;
      }


    return (

        <>
        
            
            {responses.length !== 0 && !loading ? (
                <div className="result-page" ref={pdfRef}>
                    <div className="header">
                    <h2 className="page-heading" >
                    <FiBarChart2 className="icon-bar-chart my-5" />  {t('main.main_heading1')}
                    </h2>
                    </div>
                    <div className='chart-section'>
                        <div className="chart">
                            <h1>{t('graph.heading')}</h1>
                            <h4 className="chart-subtitle">{t('graph.sub_heading')}</h4>
                            <Graph responses={responses} />
                        </div>
                        <div className="chart">
                            <h1>{t('pie.heading')}</h1>
                            <h4 className="chart-subtitle">{t('pie.sub_heading')}</h4>
                            <PieChart responses={responses} />
                        </div>
                        <div className="chart">
                            <h1>{t('radialBar.heading')}</h1>
                            <RadialBarChartComponent responses={responses} />
                        </div>
                    </div>
                    <div className="content-section">
                        <h3 style={{color:"#1D5B79"}}>{t('main.text_heading')}</h3>
                        <p>
                            {t('main.text1')} <b>{testDate}</b> {t('main.text2')}
                        </p>
                        <h3 style={{color:"#1D5B79"}}>{t('graph.text_heading')}</h3>
                        <p>
                            {t('graph.text_content')}
                        </p>
                        <h3 style={{color:"#1D5B79"}}>{t('pie.text_heading')}</h3>
                        <p>
                            {t('pie.text_content')}
                        </p>
                        <h3 style={{color:"#1D5B79"}}>{t('radialBar.text_heading')}</h3>
                        <p>
                            {t('radialBar.text_content')}
                        </p>
                        {/* ... Add more content about the test results as needed ... */}
                    </div>
                    <button  className="download-button" onClick={handleDownloadClick} disabled={downloading}>
                            <FiDownload className="download-icon" />
                            {downloading? t('toast.pleaseWait'): t('main.download') } 
                        </button>
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <SyncLoader size={30} color="#fb2576" />
                </div>
            )}
            
            <Footer></Footer>

        </>

    );
}

export default Result_M;
