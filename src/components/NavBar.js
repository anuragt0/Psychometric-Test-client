import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server_origin } from '../utilities/constants';
import {motion} from 'framer-motion'
// import img from "../../assets/images/yi_logo.png";

// My css
import css from "../css/navbar.module.css";
import logo from "../assests/logo.png";


const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect( () => {
        verifyUser();
    }, [])

    const verifyUser = async()=>{
        if(localStorage.getItem('token')){
            const response = await fetch(`${server_origin}/api/user/verify-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
    
            const result = await response.json()
            // console.log("here: ", result);
            if(result.isAdmin===true){
                setIsAdmin(true);
            }
        }
    }
    

  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    navigate("/login");
  };

  const handleLogoutClick = (e) => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const listItemStyle = { fontSize: "0.9rem", fontWeight: "400" };

  return (
    <nav className={`${css.outerNav} navbar navbar-expand-lg fixed-top`}
    style={{ position: "sticky", top: 0, zIndex: 100 }}>
      <Link to="/" style={{ marginRight: "1rem" }}>
        <img src={logo} alt="yi-logo" style={{"width": "3rem",
    "margin-right": "2%"}} />
      </Link>
      <button
        type="button"
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto text-ff1">
          <li className="nav-item active">
          <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{
                  type: 'spring', stiffness: 300
                }}>
            <Link className="nav-link active" to="/" style={listItemStyle}>
              Home
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
              style={listItemStyle}
            >
              About
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
              to="/more"
              style={listItemStyle}
            >
              More
            </Link>
            </motion.div>
          </li>
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
                style={listItemStyle}
                >
                Analytics
                </Link>
                </motion.div>
            </li>
            )
          }
        </ul>

        <ul className="navbar-nav ms-auto">
          {localStorage.getItem("token") ? (
            <button
              className={`${css.navBtn} text-ff1 navbar-right`}
              onClick={handleLogoutClick}
            >
              <motion.p
                whileHover={{ scale: 1.1 }}
                transition={{
                  type: 'spring', stiffness: 300
                }}>
              Logout
              </motion.p>
            </button>
          ) : (
            <>
              <button
                className={`${css.navBtn} text-ff1 navbar-right`}
                onClick={handleLoginClick}
              >
                <motion.p
                whileHover={{ scale: 1.1 }}
                transition={{
                  type: 'spring', stiffness: 300
                }}>
                Login
                </motion.p>
              </button>

            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
