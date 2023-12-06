import React, { useEffect } from "react";

import i18n from "i18next";
import { useTranslation } from "react-i18next";

import aboutImg from "../images/about-img.svg";
import wepLogo from "../images/wep-logo.svg";
import caXpert from "../images/caXpert.svg";
import aboutmobile from "../images/aboutBgmobile.png";
import "../css/about.css";
import logo from "../assests/logo.png";
import asset1 from "../images/asset-1.png";
import metric1 from "../images/hand-coin.png";
import metric2 from "../images/thumb-badge.png";
import metric3 from "../images/hand-balane.png";
import barrupee from "../images/bar-rs.png";
import staruser from "../images/star-user.png";
import flowchart2 from "../images/flowchart2.png";
import flowchart3 from "../images/flowchart3.png";
import flowchart1 from "../images/flowchart1.png";
import india from "../images/india.png";
import smiley from "../images/smiley.png";
import handphone from "../images/hand-phone.png";
import logoudyam from "../images/logo-udyam.png";

const AboutPage = () => {
    const { t } = useTranslation("translation", { keyPrefix: "about" });

    useEffect(() => {
        let currentLang = localStorage.getItem("lang");
        i18n.changeLanguage(currentLang);
    }, []);

    return (
        <div className="u-about-page">
            {/* --------------------- Section 1 --------------------- */}
            <div className="u-about-page-section-1-bg">
                <div className="u-about-page-section-1">
                    {/* <div className="u-about-page-section-1-bg"></div> */}
                    <div className="u-about-page-section-1-heading">
                        <div>
                            <h1>UDYAM UPLIFT</h1>
                            <span>Navchetna Se Nayi Pragati</span>
                            <div className="horizontal-line"></div>
                        </div>
                        <div className="u-about-page-section-1-heading-img">
                            <img src={logoudyam} alt="" />
                        </div>
                    </div>
                    <div className="u-about-page-section-1-heading-p">
                        <p>
                            Udyam Uplift is an empirical framework designed as a
                            self assessment test that helps women entrepreneurs
                            (WE) prioritise compliance by leveraging principles
                            of compliance psychology and social influence.
                        </p>
                        <p>
                            Udyam Uplift uses a 26-question test to assess an
                            entrepreneur's susceptibility to various compliance
                            traps, including conformity, compliance, and
                            obedience. The test results are used to classify the
                            entrepreneur into one of four quadrants: Ideal
                            Normative, Friendly Follower, Information Driven, or
                            Individualist Rebellion.
                        </p>
                        <p>
                            Udyam Uplift also provides a donut chart that
                            reveals the percentage of influence from each social
                            pressure factor: conformity, compliance, and
                            obedience. Additionally, Udyam Uplift closely
                            evaluates the entrepreneur's responses to identify
                            which compliance trap techniques they are most
                            susceptible to.
                        </p>
                    </div>
                </div>
            </div>
            {/* --------------------- Section 2 --------------------- */}
            <div className="u-about-page-section-2">
                <div>
                    <h2>UDYAM UPLIFT CAN HELP ENTREPRENEURS TO</h2>
                    <div className="horizontal-line"></div>
                </div>
                <ul>
                    <li>
                        <div className="circle"></div>
                        Understand their susceptibility to various compliance
                        traps
                    </li>
                    <li>
                        {" "}
                        <div className="circle"></div>
                        Identify areas where they need to improve their
                        compliance posture
                    </li>
                    <li>
                        {" "}
                        <div className="circle"></div>
                        Develop strategies to mitigate their compliance risks
                    </li>
                    <li>
                        {" "}
                        <div className="circle"></div>Create a more compliant
                        workplace culture
                    </li>
                </ul>
            </div>
            {/* --------------------- Section 3 --------------------- */}
            <div className="u-about-page-section-3">
                <div>
                    <h2>WHAT DOES A COMPLIANCE TRAP FOR A WE LOOK LIKE?</h2>
                    <div className="horizontal-line"></div>
                </div>
                <div>
                    <p>
                        A compliance trap is a situation in which an individual
                        or organization is incentivized to comply with a rule or
                        regulation, even though doing so may be harmful or
                        unethical. Compliance traps can be created by a variety
                        of factors, such as social pressure, authority, and
                        reciprocity.
                    </p>
                    <p>
                        In the context of Udyam Uplift, a compliance trap could
                        be something like:
                    </p>
                    <div className="u-about-page-section-3__boxes">
                        <div className="u-about-page-section-3__box">
                            WE is pressured by her peers to sign a contract with
                            a supplier who has a history of non-compliance.
                        </div>
                        <div className="u-about-page-section-3__box">
                            WE is afraid of being penalized by a regulator if
                            she does not comply with a new regulation, even
                            though she does not understand the regulation or why
                            it is necessary.
                        </div>
                        <div className="u-about-page-section-3__box">
                            WE feels obligated to return a favor to a colleague
                            by signing a contract, even though the contract
                            contains terms that are not in her best interests.
                        </div>
                    </div>
                </div>
            </div>
            {/* --------------------- Section 4 --------------------- */}

            <div className="u-about-page-section-4">
                <div>
                    <h2>THE PROCESS</h2>
                    <div className="horizontal-line"></div>
                </div>
                <img src={asset1} alt="" />
            </div>
            {/* Section 5 */}
            <div className="u-about-page-section-5">
                <img src={flowchart1} alt="" />
            </div>
            {/* Section 6 */}
            <div className="u-about-page-section-6">
                <div className="u-about-page-section-6__sub">
                    <p>
                        Udyam Uplift is a valuable tool for lending
                        organizations that are looking to reduce their risk,
                        improve their performance, and build a more compliant
                        business ecosystem Udyam Uplift can help lending
                        organizations to:
                    </p>
                    <div className="u-about-page-section-6__boxes">
                        <div className="u-about-page-section-6__box">
                            Reduce the risk of defaults by identifying
                            compliance risks in borrowers.
                        </div>
                        <div className="u-about-page-section-6__box">
                            Improve the quality of their loan portfolios by
                            selecting borrowers who are more likely to be
                            successful
                        </div>
                        <div className="u-about-page-section-6__box">
                            Make better lending decisions by providing insights
                            into borrowers' motivation and behavior.
                        </div>
                        <div className="u-about-page-section-6__box">
                            Enhance their reputation by demonstrating their
                            commitment to compliance.
                        </div>
                    </div>
                    <p>
                        Here is a specific use case of how Udyam Uplift can be
                        used by lending organizations to reduce the risk of
                        defaults:
                    </p>
                    <div className="u-about-page-section-6__sub-flowchart">
                        <img src={flowchart3} alt="" />
                    </div>
                    <p>
                        For example, a borrower who is classified as an
                        "Individualist Rebellion" may be more likely to ignore
                        or disregard compliance requirements, which could lead
                        to regulatory penalties and disruptions to their
                        business.
                    </p>
                    <p>
                        Udyam Uplift can help lending organizations to make more
                        informed lending decisions and to reduce the risk of
                        defaults.
                    </p>
                    <div></div>
                    <div className="u-about-page-section-6__metrics">
                        <h3>Metrics to Track:</h3>
                        <div className="u-about-page-section-6__metrics-box">
                            <div>
                                <img src={metric1} alt="" />
                                <span>
                                    Reduction in default rate due to Udyan
                                    Uplift
                                </span>
                            </div>
                            <div>
                                <img src={metric2} alt="" />
                                <span>
                                    Improvement in loan portfolio quality due to
                                    Udyam Uplift
                                </span>
                            </div>
                            <div>
                                <img src={metric3} alt="" />
                                <span>
                                    Improvement in lending decision-making
                                    accuracy due to Udyam Uplift
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="u-about-page-section-6__sub">
                    <p>
                        Udyam Uplift is greatly beneficial, to identify the
                        compliance champions from a community. By identifying
                        and engaging compliance champions, impact consultants
                        can help their clients to create a more culture of
                        compliance within their communities. . This can help to
                        reduce the risk of compliance violations and improve the
                        overall social and environmental performance of the
                        community.
                    </p>
                    <p>
                        Here is a use case of how an impact consultant could use
                        Udyam Uplift to identify and engage compliance
                        champions:
                    </p>

                    <p>
                        The impact consultant provides training on compliance
                        best practices to the potential compliance champions.
                        The impact consultant also empowers the compliance
                        champions to contribute through knowledge and
                        connectedness that they bring to their communities,
                        ensuring verified information dissemination. By
                        recognizing and rewards compliance champions for their
                        contributions to improving the company's compliance
                        posture.
                    </p>
                    <div className="u-about-page-section-6__sub-flowchart">
                        <img src={flowchart2} alt="" />
                    </div>
                    <div className="u-about-page-section-6__metrics">
                        <h3>Metrics to Track:</h3>
                        <div className="u-about-page-section-6__metrics-box">
                            <div>
                                <img src={staruser} alt="" />
                                <span>Impact of Udyam Uplift clients</span>
                            </div>
                            <div>
                                <img src={barrupee} alt="" />
                                <span>
                                    Financial impact of Udyam Uplift on clients
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Section 7 */}
            <div className="u-about-page-section-7">
                <div>
                    <h2>FEATURES OF UDYAM UPLIFT</h2>
                    <div className="horizontal-line"></div>
                </div>
                <div className="u-about-page-section-7__metrics-box">
                    <div>
                        <img src={handphone} alt="" />
                        <span>Mobile-First Design</span>
                    </div>
                    <div>
                        <img src={india} alt="" />
                        <span>Functionality in Eight Different Languages</span>
                    </div>
                    <div>
                        <img src={smiley} alt="" />
                        <span>
                            Valuable & Comprehensive Feedback in 15 mins
                        </span>
                    </div>
                </div>
            </div>
            {/* Section 8 */}
            <div className="u-about-page-section-8">
                <div className="u-about-page-section-8__heading">
                    <div className="u-about-page-section-8__head">
                        <h2>ABOUT</h2>
                        <img src={caXpert} alt="" />
                    </div>
                    <div className="horizontal-line"></div>
                </div>
                <div>
                    <p>
                        CAxpert offers accounting services, specifically
                        tailored for small businesses, with an emphasis on
                        integrating third-party technologies with accounting
                        programs for safe and smooth data exchange.
                    </p>
                    <p>
                        Delivering hands-on services, CAxpert provides a
                        comprehensive solution for accounting and
                        compliance-related concerns as well as basic financial
                        requirements. This allows businesses to focus on
                        expansion without worrying about the intricacies of
                        financial management.
                    </p>
                    <p>
                        Small business owners are the engines of growth for our
                        economy and their books should reflect that too.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
