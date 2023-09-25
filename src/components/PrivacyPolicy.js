import React from "react";
import "../css/privacypolicy.css"

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <header className="privacy-policy-header">
        <h1>Privacy Policy</h1>
      </header>
      <section className="privacy-policy-section">
        <ol>
          <li>
            <strong>Information We Collect:</strong>
            <p>We collect various types of personal information, including but not limited to:</p>
            <ul>
              <li><strong>Name:</strong> We collect your name to personalize your experience on our platform.</li>
              <li><strong>Email Address:</strong> We collect your email address for communication and account-related notifications.</li>
              <li><strong>Test Responses:</strong> We collect your responses to psychometric tests to provide you with personalized insights.</li>
              <li><strong>User Inputs:</strong> We gather information provided by you during interactions on our platform.</li>
              <li><strong>Activities on the Website:</strong> We track your activities on our website for analytics and personalization.</li>
              <li><strong>IP Addresses:</strong> We collect IP addresses for security and location-based services.</li>
              <li><strong>Cookies:</strong> We use cookies to enhance your experience and offer personalized content.</li>
            </ul>
          </li>
          <li>
            <strong>How We Collect Information:</strong>
            <>We collect information through registration forms when users create accounts on our website. This information helps us create your user account and provide you with personalized content and services.</>
          </li>
          <li>
            <strong>How We Use Information:</strong>
            <>We use the collected information to create and personalize user accounts. This allows us to offer a tailored experience, including customized test results and recommendations.</>
          </li>
          <li>
            <strong>Sharing of Information:</strong>
            <>We do not share user data with third parties. Your information is kept confidential and used only for providing services on our platform.</>
          </li>
          <li>
            <strong>Cookies and Tracking:</strong>
            <>We use cookies for personalization purposes. Cookies help us enhance your experience by remembering your preferences and providing personalized content.</>
          </li>
          <li>
            <strong>Security:</strong>
            <>We take data security seriously. We protect user data using encryption and secure servers to ensure your information is safe and confidential.</>
          </li>
          <li>
            <strong>User Rights:</strong>
            <>Users have the right to access their data. If you have any questions or concerns about your data, please contact us at <a href="mailto:udyamuplift@gmail.com">udyamuplift@gmail.com</a>.</>
          </li>
          {/* Add more sections as needed */}
        </ol>
      </section>
      <footer className="privacy-policy-footer">
        <p>
          This Privacy Policy was last updated on 25/09/2023.
        </p>
        <p>
          If you have any questions or concerns, please contact us at{" "}
          <a href="mailto:udyamuplift@gmail.com">udyamuplift@gmail.com</a>.
        </p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
