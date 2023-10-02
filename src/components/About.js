import React ,{ useEffect }from "react";

import i18n from "i18next";
import { useTranslation } from 'react-i18next';

import aboutImg from '../images/about-img.svg'
import wepLogo from '../images/wep-logo.svg';
import caXpert from '../images/caXpert.svg';
import aboutmobile from '../images/aboutBgmobile.png';
import "../css/about.css";

const AboutPage = () => {

  const { t } = useTranslation("translation", { keyPrefix: 'about' });

  useEffect(() => {
    let currentLang = localStorage.getItem('lang');
    i18n.changeLanguage(currentLang);

  }, []);

  return (
    <div className="u-about-page-outer-div">
      <div className="u-about-page-landing-div">
        <img src={aboutmobile} alt="women"></img>
      <div className="bg"></div>
        <div className="u-about-page-landing-div-left">
          <p className="u-about-page-landing-slogan">{t('weAre')}<br></br> {t('udyamUplift')} </p>
          <p className="u-about-page-landing-about">{t('textL1')}<br></br>
                                                    {t('textL2')} <br></br>
                                                    {t('textL3')}</p>
      </div>
      </div>
      <div>
      </div>
      {/* 1 hero */}
      <div
        className="u-about-page-landing-hero"
        style={{ backgroundColor: "white" }}
      >
        <div className="u-about-page-landing-hero-left">
          <p className="u-about-page-landing-hero-heading">{t('aboutWord')}</p>
          <p className="u-about-page-landing-hero-subheading">
            {t('discoverComplianceMindset')}
          </p>
        </div>
        <div className="u-about-page-landing-hero-right">
          <img
            src={aboutImg}
            alt="about-1"
            className="u-about-page-hero-img img-1"
          />
        </div>
      </div>
      {/* 2 hero */}
      <div
        className="u-about-page-landing-hero"
        style={{ backgroundColor: "white" }}
      >
        <div className="u-about-page-hero-right">
          <img
            src={wepLogo}
            alt="about-1"
            className="u-about-page-hero-img img-2"
          />
        </div>
        <div className="u-about-page-landing-hero-left">
          <p className="u-about-page-landing-hero-heading">{t('aboutWEP')}</p>
          <p className="u-about-page-landing-hero-subheading">
            {t('WEPNetworkPartners')}
          </p>
        </div>
      </div>
      {/* 3 hero */}
      <div
        className="u-about-page-landing-hero"
        style={{ backgroundColor: "white" }}
      >
        <div className="u-about-page-landing-hero-left">
          <p className="u-about-page-landing-hero-heading">
            {t('partnerWith')}
          </p>
          <p className="u-about-page-landing-hero-subheading">
            {t('caxpertDescription')}
          </p>
        </div>
        <div className="u-about-page-hero-right">
          <img
            src={caXpert}
            alt="about-1"
            className="u-about-page-hero-img img-1"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;