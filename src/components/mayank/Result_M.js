// import { useState } from "react";
import { useEffect, useState , useRef } from "react";
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

function Result_M() {
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
            toast.error("Unable to fetch result. Please login again");
            navigate("/login");
            return;
        }
        if(response1.userDoc.isRegistered===false ){
            // two conditions: 1. User given the test but not registered
            // 2. User not given the test
            if(response1.userDoc.testResponse.length!==0){
                // user given the test
                toast.error("Please register to view results");
                navigate("/test/register");
                return;
            }
            else{
                //user has not given the test
                toast.error("You have not given the test yet!");
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
            toast.success("Test results downloaded!"); // Using toast from react-hot-toast for demonstration
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
                    <FiBarChart2 className="icon-bar-chart my-5" /> Test Results
                    </h2>
                    </div>
                    <div className='chart-section'>
                        <div className="chart">
                            <h1>Graph Chart Example</h1>
                            <h4 className="chart-subtitle">Compliance vs. Social Pressure</h4>
                            <Graph responses={responses} />
                        </div>
                        <div className="chart">
                            <h1>PieChart Example</h1>
                            <h4 className="chart-subtitle">Social Influence Breakdown</h4>
                            <PieChart responses={responses} />
                        </div>
                        <div className="chart">
                            <h1>RadialBar Chart Example</h1>
                            <RadialBarChartComponent responses={responses} />
                        </div>
                    </div>
                    <div className="content-section">
                        <h3 style={{color:"#1D5B79"}}> Psychometric Test  Results</h3>
                        <p>
                            Congratulations! Here are the results of your psychometric test taken on <b>{testDate}</b> . The test assessed your personality traits, cognitive abilities, and emotional intelligence. The test results provide valuable insights into your strengths and areas for development, helping you understand yourself better.
                        </p>
                        <h3 style={{color:"#1D5B79"}}>Graph Chart</h3>
                        <p>
                            The Graph Chart displays the comparison between your compliance and social pressure scores. The compliance score reflects your tendency to conform to social norms and expectations, while the social pressure score indicates the level of influence from others in decision-making.
                        </p>
                        <h3 style={{color:"#1D5B79"}}>Pie Chart</h3>
                        <p>
                            The Pie Chart illustrates the breakdown of social influence categories. It provides an overview of the various factors affecting your decision-making process, including family, peers, and media influence.
                        </p>
                        <h3 style={{color:"#1D5B79"}}>Radial Bar Chart</h3>
                        <p>
                            The Radial Bar Chart showcases your performance in different aspects, such as cognitive abilities, emotional intelligence, and adaptability. It presents a holistic view of your strengths and areas for improvement.
                        </p>
                        {/* ... Add more content about the test results as needed ... */}
                    </div>
                    <button  className="download-button" onClick={handleDownloadClick} disabled={downloading}>
                            <FiDownload className="download-icon" />
                            {downloading?"Please wait...": "Download Results"} 
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
