import background from '../assets/background.png'
import logo from '../assets/coopridelogo.png'
import { Flex, Input, ConfigProvider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '../../node_modules/@tanstack/react-query/build/legacy/useMutation';
import { login } from '../api/auth.api';
import { useAppState } from '../context/AppContext';
import { cacheData } from '../helpers/storage';
import { showToast } from '@/utils/toast';

const Signin = () => {
  const {cacheUser} = useAppState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = useMutation({
    mutationFn: () => login({email, password}),
    onSuccess(data){
      cacheUser(data.data)
      cacheData('token', data.access);
      cacheData('refresh', data.refresh);
      showToast('Login successful', 'success')
      navigate("/dashboard")
    }
  })


  return (
    <ConfigProvider
    theme={{
      token:{
        primary:'blue'
      }
    }}>
      <div className='flex justify-center items-center h-screen bg-cover bg-center p-5' style={{backgroundImage:`url(${background})`}}>
      <div className='bg-white flex flex-col items-center rounded-xl p-4 sm:m-0 sm:w-1/3 w-full'>
        <img src={logo} className='w-28 justify-center' />
        <div className='pt-5 w-full'>
          <h2 className='text-center font-bold text-[22px]'>Login to CoopRide Owner</h2>
       <div className='gap-5 w-full flex flex-col mt-5'>
            <div className='gap-5 flex flex-col w-full'>
          <div className='relative flex items-center w-full'>
          <Icon icon="ic:outline-mail" width="1.6em" height="1.6em" className='absolute flex flex-col justify-evenly pl-3'  style={{}} />
          <input 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text" placeholder='Email Address' className='w-full p-3 rounded-xl bg-transparent border border-gray pl-12 text-sm' />
          </div>
          <div className='relative flex items-center'>
          <Icon icon="prime:lock" width="1.6em" height="1.6em" className='absolute flex flex-col justify-evenly pl-3' style={{}} />
          <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"} placeholder='Password' className='w-full p-3 rounded-xl bg-transparent border border-gray pl-12 text-sm' />
          <div className='absolute flex justify-end right-2 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
         {showPassword ? <Icon icon="iconamoon:eye-off-thin" width="1.2em" height="1.2em" className=''   /> :
          <Icon icon="mdi-light:eye" width="1.2em" height="1.2em" className='' style={{}} />}
         </div></div>
        </div>
        
          <div className='bg-yellow rounded-2xl p-3 cursor-pointer' onClick={handleLogin.mutate}>
            <h3 className='text-center'>{handleLogin.isPending ? 'Login in...' :'Login'}</h3>
          </div>

          <div
          style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
          >
          <div
                className="bg-yellow rounded-2xl p-3 cursor-pointer"
                onClick={() => navigate('signup')}
              >
                <p className="text-center">Sign up</p>
              </div>
              <div
                className="bg-yellow rounded-2xl p-3 cursor-pointer"
                onClick={() => navigate('signin')}
              >
                <p className="text-center">Forgot password</p>
              </div>
          </div>

       </div>
        </div>
      </div>
    </div>
    </ConfigProvider>
  )
}

export default Signin