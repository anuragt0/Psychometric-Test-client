// import { useState } from "react";
import React, { useEffect, useState, useRef } from "react";
import { server_origin } from "../../utilities/constants";
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import { FiDownload, FiBarChart2 } from 'react-icons/fi'; // Import the FiDownload and FiBarChart2 icons from react-icons
import { toast } from "react-hot-toast";
import { SyncLoader } from 'react-spinners'; // Import the ClipLoader from "react-spinners"
import { motion } from 'framer-motion'
import Graph from "./charts/Graph";
import PieChart from "./charts/PieChart";
import RadialBarChartComponent from './charts/RadialBarChart';
// import { Footer } from "../neha/Footer";
import "./result.css";
import logo2 from '../../images/logo1.png';
import t1 from '../../images/t1.png';

//for Pdf downloadind Functionality
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// import { UserData } from "./Data";


//IMPORTS FOR Language change Functionality
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import '../../library/i18n';

function Result_M() {


  //? Language Functionality Starts ......................................................................

  const { t } = useTranslation("translation", { keyPrefix: 'result' });

  //used to get language Stored in LocalStorage //*should be in every Page having Language Functionality 
  useEffect(() => {
    let currentLang = localStorage.getItem('lang');
    i18n.changeLanguage(currentLang);

    // console.log(t('array'  , { returnObjects: true }));
  }, []);


  //? Language Functionality Ends .................................................................


  //?  text Content Start ...............................................


  const [personalityName, setPersonalityName] = useState('');
  // Function to receive personalityName from the child component (Graph)
  const handleGraphData = (name) => {
    setPersonalityName(name);
  };

  const [categoryName, setCategoryName] = useState('');
  // Function to receive personalityName from the child component (Graph)
  const handlePieData = (name) => {
    setCategoryName(name);
  };

  const [affectingFacttors, setAffectingFacttors] = useState({});
  // Function to receive personalityName from the child component (Graph)
  const handleRadialData = (data) => {
    setAffectingFacttors(data);
  };

  // *"graph": {"text_content": { personalityName:{ Description and Qualities}............
  const graph_uri = 'graph.text_content.' + personalityName;

  const pie_uri = 'pie.text_content.' + categoryName;

  const radial_uri = 'radialBar.text_content';


  // console.log(pie_uri);

  //t(pie_uri ) -> only one paragraph

  //* text guideline for designer --
  // graph --> 1 . content == t(graph_uri + '.description')  ***its just a String
  // console.log(t(graph_uri + '.description'));
  //           2.  quailties == t(graph_uri + '.qualities')  ***use .map because  its an array with exactly five Qualities in it 
  const qualities_arr = t(graph_uri + '.qualities', { returnObjects: true });
  // console.log(qualities_arr);


  //?  text Content ends here  ..................................................................


  // REACT TO PDF
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `your-name-udyam-uplift`
  });






  const [responses, setResponses] = useState([])
  const [testDate, setTestDate] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    getResult();

  }, [])


  //!Make separate functions for fetching results and validation

  const getResult = async () => {
    // setLoading(true);
    const response = await fetch(`${server_origin}/api/user/get-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
    });
    let response1 = await response.json();
    // console.log("response1asdfasdfasd: ", response1);

    if (response1.success === false) {
      toast.error(t('toast.errorFetchResult'));
      navigate("/login");
      return;
    }
    // console.log("asdflkjasldkfjaskldfjl", response1.userDoc);
    if (!response1.userDoc.testResponse || response1.userDoc.testResponse.length !== 26) {
      toast.error(t('toast.inCompleteTest'));
      navigate("/test/instructions");
      return;
    }
    setResponses(response1.userDoc.testResponse);
    setTestDate(formatDateWithCustomTime(response1.userDoc.lastTestDate));
    setUserName(response1.userDoc.name);
    // console.log(formatDateWithCustomTime(response1.userDoc.lastTestDate));
    setLoading(false);
  }

  //* Download Functionallity Start*//
  const pdfRef = useRef();
  const handleDownloadClick = () => {
    // console.log ("Download Started...");
    setDownloading(true);
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
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
        <div className="result-page" ref={componentRef}>
          <div className="inner-1">
            <div className="head-main">
              <img src={logo2} alt="badge" className="img1" style={{ float: "left" }}></img>
              <h1 className="head" >{t('main.congratulations')}</h1>
              <h4 className="head-1"> {userName} , {t('main.congo_text1')}<br></br>
              {t('main.congo_text2')}</h4>
              <button className="rounded-btn1" onClick={handlePrint} disabled={downloading}>
                {downloading ? t('toast.pleaseWait') : t('main.download')}
              </button>
            </div>
          </div>

          <div className="inner-2">
            <p className="head2" style={{ textAlign: "center" }}>{t('main.text1')} <strong>{testDate}</strong> {t('main.text2')}</p>
            <br></br>
            <h2 className="head3" style={{ textAlign: "center" }}>{t('main.person_text1')} <span className="head4">{t(graph_uri + '.name')}</span> {t('main.person_text2')} </h2>
          </div>
          <div className="quad-graph">
            <Graph responses={responses} onGraphData={handleGraphData} />
          </div>
          <p className="text1" style={{ textAlign: "center" }}>{t(graph_uri + '.description')}</p>

          <div className="inner-3">

            <h2 style={{ textAlign: "center" }}><span className="head-5">{t('main.yourQualities')} </span></h2>
            <br></br>
            <div className="image-star">
              <img src={t1} alt="star" width="60px" height="60px" className="t1"></img>
              <img src={t1} alt="star" width="60px" height="60px" className="t2"></img>
              <img src={t1} alt="star" width="60px" height="60px" className="t3"></img>
            </div>
            <div className="text-under-star">
              <h4 className="ht1">{qualities_arr[0]}</h4>
              <h4 className="ht2">{qualities_arr[1]}</h4>
              <h4 className="ht3">{qualities_arr[2]}</h4>
            </div>
            <br></br>
            <div className="image-star">
              <img src={t1} alt="star" width="60px" height="60px" className="t4"></img>
              <img src={t1} alt="star" width="60px" height="60px" className="t5"></img>
            </div>
            <div className="text-under-star">
              <h4 className="ht4">{qualities_arr[3]}</h4>
              <h4 className="ht5">{qualities_arr[4]}</h4>
            </div>
            <br /><br /><br />

            <h2 style={{ textAlign: "center" }}><span className="head-5">{t('pie.sub_heading')}</span></h2>
            <div className="text-pie">
              <div className="pie1">
                <PieChart responses={responses} onPieData={handlePieData} />
              </div>
              <p className="text-beside-pichart">{t(pie_uri)}</p>
            </div>
            <h2 style={{ textAlign: "center", marginTop: "60px" }}><span className="head-5">{t('radialBar.sub_heading')}</span></h2>
            <div className="radialBar">
              <RadialBarChartComponent responses={responses} onRadialData={handleRadialData} />
            </div>

            <div className="inner-4">
              <div className="inner-star">
                <img src={t1} alt="star" className="star"></img>
                <p style={{ fontSize: "18px" }}> {t('radialBar.label1')} </p>
              </div>
              <p className="p1" style={{ fontSize: "16px" }}>
                {t(radial_uri + '.group_size_or_unanimity?.' + affectingFacttors[0])}
              </p>

              <div className="inner-star">
                <img src={t1} alt="star" className="star"></img>
                <p style={{ fontSize: "18px" }}> {t('radialBar.label2')}</p>
              </div>
              <p className="p1" style={{ fontSize: "16px" }}>
                {t(radial_uri + '.cohesion_or_status_of_others?.' + affectingFacttors[1])}
              </p>

              <div className="inner-star">
                <img src={t1} alt="star" className="star"></img>
                <p style={{ fontSize: "18px" }}> {t('radialBar.label3')}</p>
              </div>
              <p className="p1" style={{ fontSize: "16px" }}>
                {t(radial_uri + '.Reciprocity?.' + affectingFacttors[2])}
              </p>

              <div className="inner-star">
                <img src={t1} alt="star" className="star"></img>
                <p style={{ fontSize: "18px" }}> {t('radialBar.label4')}</p>
              </div>
              <p className="p1" style={{ fontSize: "16px" }}>
                {t(radial_uri + '.Commitment_and_Consistency?.' + affectingFacttors[3])}
              </p>

              <div className="inner-star">
                <img src={t1} alt="star" className="star"></img>
                <p style={{ fontSize: "18px" }}> {t('radialBar.label5')}</p>
              </div>
              <p className="p1" style={{ fontSize: "16px" }}>
                {t(radial_uri + '.Scarcity?.' + affectingFacttors[4])}
              </p>

              <div className="inner-star">
                <img src={t1} alt="star" className="star"></img>
                <p style={{ fontSize: "18px" }}> {t('radialBar.label6')}</p>
              </div>
              <p className="p1" style={{ fontSize: "16px" }}>
                {t(radial_uri + '.Authority/_commands?.' + affectingFacttors[5])}
              </p>


              <div className="endbtn">
                <button className="rounded-btn" onClick={handlePrint} disabled={downloading}>
                  {downloading ? t('toast.pleaseWait') : t('main.download')}
                </button>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <SyncLoader size={30} color="#3e950c" />
        </div>
      )}
    </>


  );
}

export default Result_M;