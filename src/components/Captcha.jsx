// src/components/Captcha.js
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Captcha = ({ onSuccess }) => {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleVerifyCaptcha = () => {
    setIsCaptchaVerified(true);
    onSuccess();
  };

  return (
    <div className="mb-3">
      <ReCAPTCHA
        sitekey="your-recaptcha-site-key"
        onChange={handleVerifyCaptcha}
      />
      {isCaptchaVerified && (
        <div className="valid-feedback">Captcha verified!</div>
      )}
    </div>
  );
};

export default Captcha;
