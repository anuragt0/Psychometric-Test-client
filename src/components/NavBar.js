import React, { useEffect, useState, useRef} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { server_origin } from '../utilities/constants';
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { toast, Toaster } from "react-hot-toast";

// My css
import css from "../css/navbar.module.css";
import logo from "../assests/logo.png";


//IMPORTS FOR Language change Functionality
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import '../library/i18n';
import { useLanguage } from '../context/LanguageContext';


const Navbar = () => {

  const { pathname } = useLocation(); // Get the current route path

  //? Language Functionality Starts *Translation* ............................................................


  const { t } = useTranslation("translation", { keyPrefix: 'navBar' });

  const [loggedIn, setLoggedIn] = useState(false);
  
  const { selectedLanguage , setSelectedLanguage , resetLanguage } = useLanguage();


  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    resetLanguage();
    setSelectedLanguage(language);
    localStorage.setItem('lang', language);
  };

  //used to get language Stored in LocalStorage //*should be in every Page having Language Functionality 
  useEffect(() => {
    let currentLang = localStorage.getItem('lang');
    i18n.changeLanguage(currentLang);

  }, []);


  // //? Language Functionality Ends *Translation* .................................................................




  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    verifyUser();

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
      if (result.isAdmin === true) {
        setIsAdmin(true);
      }
      if(result.success===true){
        setLoggedIn(true);
        return true;
      }
      return false;
    }
    return false;
  }


  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    navigate("/login");
  };

  const handleLogoutClick = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("testProgress");
    localStorage.removeItem("lang");
    localStorage.removeItem("hasVisited");
    toast.success(t('toast.loggedOutToast'));
    navigate("/")
    // navigate("/login");
  };


  return (
    <nav className={`${css.outerNav} navbar navbar-expand-lg fixed-top`}
      style={{ position: "sticky", top: 0, zIndex: 100 }}
      >

      <div className={`${css.navDisplay}`}>
        <Link to="/" style={{ marginRight: "1rem"}}>
          <img src={logo} alt="CAXpert-logo" style={{
            "width": "11rem"
          }} />

        </Link>
        <button
          type="button"
          className={`${css.hamStyle} navbar-toggler`}
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          id="hamburger-btn"
          style= {{width: "60px"}}
          
        >
          <span className={`${css.toggler} navbar-toggler-icon `}
         
          ></span>
        </button>
      </div>

      <div className={`collapse navbar-collapse`} id="navbarCollapse">
        <ul className="navbar-nav mr-auto text-ff1">
          <li className="nav-item active">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{
                type: 'spring', stiffness: 300
              }}>
              <Link className="nav-link active" to="/"  style={{color: "#333", fontWeight: "bold"}}>
                {t('Home')}
              </Link>
            </motion.div>
          </li>
          <li className="nav-item active">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{
                type: 'spring', stiffness: 300
              }}>
              <Link
                className="nav-link active"
                to="/about"
                style={{color: "#333", fontWeight: "bold"}}
              >
                {t('About')}
              </Link>
            </motion.div>
          </li>
          {localStorage.getItem("token") && verifyUser() && (
  <li className="nav-item active">
    <motion.div
      whileHover={{ scale: 1.1,  }} // Add boxShadow and adjust values as needed
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link
        className="nav-link active"
        to="/test/result"
        // style={listItemStyle}
        style={{
          textDecoration: 'none',
          color: '#333',
          padding: '7px 13px', 
          marginLeft:'1rem',
          borderRadius: '10px', 
          width: "fit-content",
          background: 'linear-gradient(45deg, #beed6c, #3e950c)', 
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)', 
          fontWeight: 'bold',
        }}
      >
        {t('Report')}
      </Link>
    </motion.div>
  </li>
)}
          {
            isAdmin && (
              <li className="nav-item active">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{
                    type: 'spring', stiffness: 300
                  }}>
                  <Link
                    className="nav-link active"
                    to="/admin/analytics"
                  >
                    {t('Analytics')}
                  </Link>
                </motion.div>
              </li>
            )
          }
        </ul>




        <ul className="navbar-nav ms-auto">
          {/* Language Buttons Starts hit and try  */}

          {pathname !== '/test/start' && (

            <li className="nav-item active">
              {/* <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{
                          type: 'spring', stiffness: 300
                        }}> */}
              <div className={`${css.languageContainer} mx-3`}>
              <FontAwesomeIcon icon={faGlobe} />
                <select
                  className={`language-select ${css.languageSelect} ${css.btnStyle}`}
                  style={{cursor:"pointer", fontWeight: "bold", color: "#333"}}
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  <option className="nav-item active" value="en">English</option>
                  <option className="nav-item active" value="hi">  हिन्दी  </option>
                  <option className="nav-item active" value="od">  ଓଡ଼ିଆ  </option>
                  <option className="nav-item active" value="ma">  मराठी  </option>
                  <option className="nav-item active" value="ba">  বাংলা  </option>
                  <option className="nav-item active" value="gu" disabled>  ગુજરાતી  </option>
                  <option className="nav-item active" value="ta" disabled> தமிழ்  </option>
                  <option className="nav-item active" value="ko" disabled>  कोंकणी  </option>

                  {/* Add more options for other languages */}

                </select>
            
              </div>
            </li>
          )}
          {/* Language Buttons Ends   */}

          <li>
            {localStorage.getItem("token")  ? (
              <button
                className={`${css.navBtn} text-ff1 navbar-right`}
                onClick={handleLogoutClick}
              >
                {/* <motion.p
                  whileHover={{ scale: 1.1 }}
                  transition={{
                    type: 'spring', stiffness: 300
                  }}> */}
                  {t('Logout')}
                {/* </motion.p> */}
              </button>
            ) : (
              <>
                <button
                  className={`${css.navBtn} text-ff1 navbar-right`}
                  onClick={handleLoginClick}
                >
                  {/* <motion.p
                    whileHover={{ scale: 1.1 }}
                    transition={{
                      type: 'spring', stiffness: 300
                    }}> */}
                    {t('Login')}
                </button>

              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;