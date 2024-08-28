import React, { useState } from 'react';

const OTPInput = ({ length = 4, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (onChange) onChange(newOtp.join(''));

      // Move to the next input field if a digit is entered
      if (index < length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      document.getElementById(`otp-${index - 1}`).focus();
      if (onChange) onChange(newOtp.join(''));
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text').slice(0, length);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split('').concat(Array(length).fill('')).slice(0, length);
      setOtp(newOtp);
      if (onChange) onChange(newOtp.join(''));
    }
    e.preventDefault();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          maxLength="1"
          style={{
            width: '55px',
            height: '55px',
            margin: '0px 10px',
            fontSize: '24px',
            textAlign: 'center',
            backgroundColor: digit ? '#18CD02' : '#ffffff', // Highlight when a value is entered
            border: '2px solid #E2E2E2',
            // borderRadius: '5px',
            outline: 'none',
          }}
          className='rounded-xl'
        />
        
      ))}
    </div>
  );
};

export default OTPInput;
