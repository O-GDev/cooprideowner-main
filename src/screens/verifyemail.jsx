import background from '../assets/background.png'
import logo from '../assets/coopridelogo.png'
import { Flex, Input, ConfigProvider } from 'antd';
import { useState } from 'react';
import {useLocation} from "react-router-dom";
import OTPInput from '../components/otpfield';
import { useNavigate } from 'react-router-dom';
import { verifyEmail } from '../api/auth.api';

const VerifyEmail = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { email } = location.state || {};
  const [otp, setOtp] = useState('');

  const handleVerify = async () => {
    try {
      await verifyEmail({email, otp})
      navigate("/signin");
    } catch (error) {
      console.log(error?.message)
    }
  }



  return (
    <ConfigProvider
    theme={{
      token:{
        primary:'blue'
      }
    }}>
      <div className='flex justify-center items-center h-screen bg-cover bg-center overflow-x-hidden' style={{backgroundImage:`url(${background})`}}>
      <div className='bg-white flex flex-col items-center rounded-xl p-4 sm:m-0 sm:w-1/3'>
        <img src={logo} className='w-28 justify-center' />
        <div className='pt-5 w-full'>
          <h2 className='text-center font-bold text-[22px]'>Verify Email</h2>
          <h5 className='text-center font-medium text-[#616161] text-[14px] pt-3'>A code has been sent to your email, please input it here</h5>
       <div className=''>
            <div className='my-7'>
              <OTPInput 
              onChange={(e) => setOtp(e) }
              length={6}
              />          
        </div>
        
         
          
         
          <div className='bg-yellow rounded-2xl p-3 cursor-pointer my-3' onClick={handleVerify}>
            <h3 className='text-center font-semibold'>Finish Sign Up</h3>
          </div>
       </div>
        </div>
      </div>
    </div>
    </ConfigProvider>
  )
}

export default VerifyEmail