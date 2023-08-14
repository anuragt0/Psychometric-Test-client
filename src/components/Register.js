import React, { useState, useEffect } from 'react';
import { server_origin } from '../utilities/constants';
import { useNavigate } from 'react-router-dom';
import "../css/register.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, } from "react-hot-toast";
import { faUser, faEnvelope, faMars, faCalendarAlt, faMapMarkerAlt, faCity, faMapPin,  } from '@fortawesome/free-solid-svg-icons';

//IMPORTS FOR Language change Functionality
import i18n from "i18next";
import { useTranslation } from "react-i18next";
// import '../../library/i18n';


//!CHECK IF USER HAS GIVEN THE TEST, THEN ONLY ALLOW TO REGISTER
//* get the user by using token in localstorage and then check if the user is registered or not
const RegistrationPage = () => {

//? Language Functionality Starts ............................................................
  
const { t } = useTranslation("translation", { keyPrefix: 'register' } );

//used to get language Stored in LocalStorage //*should be in every Page having Language Functionality 
useEffect(()=>{
  let currentLang = localStorage.getItem('lang');
  i18n.changeLanguage(currentLang);

  // console.log(t('array'  , { returnObjects: true }));
},[]);


//? Language Functionality Ends .................................................................





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
                    toast.error(t('toast.test_not_given'))
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
                toast.error(t('toast.not_login'));
                navigate("/login");
                
            }
        }

        getUser();
      
    }, [])
    


    const handleRegister = async (e) => {
        e.preventDefault();

        console.log('Form submitted!', credentials);

        const response = await fetch(`${server_origin}/api/user/register-update-user`, {
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
            toast.success(t('toast.register'));
            navigate("/test/result");
        }
        else{
            toast.error(t('toast.not_register'));
        }

    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
        {isRegistered?"":(
            <div className="registration-page">
                <h1>{t('register_to_view')}<span style={{color:"#e31b66"}}>{t('results')}</span> </h1>
                <form onSubmit={handleRegister}>
                    <div className="input-field">
                        <label htmlFor="name">
                            <FontAwesomeIcon icon={faUser} />
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
                        </label>
                        <select
                            id="gender"
                            name='gender'
                            value={credentials.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">{t('gender')}</option>
                            <option value={1}>{t('select_gender')}</option>
                            <option value={2}>{t('male')}</option>
                            <option value={3}>{t('female')}</option>
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
                            placeholder={t('age')}
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
                            placeholder={t('address')}
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
                            placeholder={t('city')}
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
                            placeholder={t('pincode')}
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
                            placeholder={t('country')}
                            // required
                        />
                    </div>

                    
                    <button type="submit" >{t('register')}</button>
                </form>
            </div>

        )}
        </>
    );
};

export default RegistrationPage;
