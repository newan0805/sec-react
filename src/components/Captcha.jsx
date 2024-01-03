import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Captcha = ({ onSuccess }) => {
  const site_key = process.env.REACT_APP_RECAPTCHA_SITE_KEY_v2;
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleVerifyCaptcha = () => {
    setIsCaptchaVerified(true);
    onSuccess();
  };

  return (
    <div>
      <ReCAPTCHA
        sitekey={site_key}
        onChange={handleVerifyCaptcha}
      />
      {isCaptchaVerified && (
        <div className="valid-feedback">Captcha verified!</div>
      )}
    </div>
  );
};

export default Captcha;
