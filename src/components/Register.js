import React, { useState, useEffect } from 'react';
import { server_origin } from '../utilities/constants';
import { useNavigate } from 'react-router-dom';
import "../css/register.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, } from "react-hot-toast";
import { faUser, faEnvelope, faMars, faCalendarAlt, faMapMarkerAlt, faCity, faMapPin,  } from '@fortawesome/free-solid-svg-icons';

//!CHECK IF USER HAS GIVEN THE TEST, THEN ONLY ALLOW TO REGISTER
//* get the user by using token in localstorage and then check if the user is registered or not
const RegistrationPage = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", gender: "", age: "", address: "", city: "", pincode: "", country: ""});
    const navigate = useNavigate();
    const [isRegistered, setIsRegistered] = useState(true);

    useEffect(() => {
        
        const getUser = async ()=>{
            const response = await fetch(`${server_origin}/api/user/get-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            let response1 = await response.json();
            if(response1.success===true){
                // we get the user
                if(response1.userDoc.testResponse.length===0){
                    // Not given the test yet. 
                    toast.error("You have not given the test yet!")
                    navigate("/test/instructions");
                    return;
                }
                if(response1.userDoc.isRegistered===true){
                    //Already registered
                    navigate('/test/result');
                }
                else{
                    setIsRegistered(false);
                }
            }
            else{
                toast.error("Invalid token! Please login and try again.");
                navigate("/login");
                
            }
        }

        getUser();
      
    }, [])
    


    const handleRegister = async (e) => {
        e.preventDefault();

        console.log('Form submitted!', credentials);

        const response = await fetch(`${server_origin}/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(credentials)
        });
        let response1 = await response.json();
        console.log("Register response: ", response1);
        if(response1.success==true){
            toast.success("Thanks for registering!");
            navigate("/test/result");
        }
        else{
            toast.error("Cannot register, try again later");
        }

    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
        {isRegistered?"":(
            <div className="registration-page">
                <h1>Register to know your <span style={{color:"#e31b66"}}>results</span> </h1>
                <form onSubmit={handleRegister}>
                    <div className="input-field">
                        <label htmlFor="name">
                            <FontAwesomeIcon icon={faUser} />
                        </label>
                        <input
                            type="text"
                            id="name"
                            name='name'
                            placeholder="Name"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="email">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            placeholder="Email (optional)"
                            onChange={handleChange}
                            // required
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="gender">
                            <FontAwesomeIcon icon={faMars} />
                        </label>
                        <select
                            id="gender"
                            name='gender'
                            value={credentials.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value={1}>Male</option>
                            <option value={2}>Female</option>
                            <option value={3}>Other</option>
                        </select>
                    </div>

                    <div className="input-field">
                        <label htmlFor="age">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                        </label>
                        <input
                            type="number"
                            id="age"
                            name='age'
                            value={credentials.age}
                            onChange={handleChange}
                            placeholder="Age"
                            required
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="address">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </label>
                        <input
                            type="text"
                            id="address"
                            name='address'
                            placeholder="Address"
                            value={credentials.address}
                            onChange={handleChange}
                            // required
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="city">
                            <FontAwesomeIcon icon={faCity} />
                        </label>
                        <input
                            type="text"
                            id="city"
                            name='city'
                            placeholder="City"
                            value={credentials.city}
                            onChange={handleChange}
                            // required
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="pincode">
                            <FontAwesomeIcon icon={faMapPin} />
                        </label>
                        <input
                            type="text"
                            id="pincode"
                            name='pincode'
                            placeholder="Pincode"
                            value={credentials.pincode}
                            onChange={handleChange}
                            // required
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="country">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </label>
                        <input
                            type="text"
                            id="country"
                            name='country'
                            value={credentials.country}
                            onChange={handleChange}
                            placeholder="Country"
                            // required
                        />
                    </div>

                    
                    <button type="submit" >Register</button>
                </form>
            </div>

        )}
        </>
    );
};

export default RegistrationPage;
