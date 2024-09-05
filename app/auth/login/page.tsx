'use client'
import React, { useState, useEffect } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { CiLock, CiUnlock } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import Alert from "../../component/alert"
import { authentications } from '@/constants';
import { post_request } from '@/app/api';

const Login = () => {
    const router = useRouter();
    const [auth, setAuth] = useState({ email: '', password: '' });
    const [inputError, setInputError] = useState({ emailError: false, passwordError: false });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [alert, setAlert] = useState({message: '', type: ''})
    const [unlock_icon, setUnlock_icon] = useState(false)

    useEffect(() => {
        if (auth.email) {setInputError({ ...inputError, emailError: auth.email === "" })}
        if (auth.password) {setInputError({ ...inputError, passwordError: auth.password === "" });}
    }, [auth]);

    function handlePassword() {
        setShowPassword(!showPassword);
    }

    function handleChange(e:any) {
        const name = e.target.name;
        const value = e.target.value;
        setAuth({ ...auth, [name]: value });
    }

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
    
        if (!auth.email || !auth.password) {
            showAlert("Please enter all fields", "warning");
            setInputError({ emailError: auth.email === "", passwordError: auth.password === "" });
            return;
        } else {
            setLoading(true);
            
            try {
                
                const response = await post_request('app/login', auth)
                
                if (response.status == 201 || response.status == 200){
                    
                    showAlert(response.data.msg, "success")

                    sessionStorage.setItem('email', auth.email)

                    setAuth({email: '', password: '' })
                    
                    setLoading(false)

                    setUnlock_icon(true)

                    localStorage.setItem('key' ,response.headers.get('x-id-key'));       
                                        
                    localStorage.setItem('user_role', response.data.user.user_role )

                    if (response.data.user.user_role == 'business_user' && !response.data.user.business.length){
                        router.push('/auth/create-business')

                    }else{
                        router.push('/home')
                    }
                    
                }else{
                    
                    if (response.response && response.response && response.response.status == 402) {
                        sessionStorage.setItem("email", auth.email)
                        router.push('/auth/generate-otp')
                    }
                    showAlert(response.response.data.err, "error")
                    setLoading(false)
                    return;
                }

            } catch (err:any) {                
                showAlert('Something went worong, try again later ', 'error')
                setLoading(false)
            }
        }
    }

    return (
        <div className=" relative w-full h-[100vh]  sm:p-[20px] flex items-center justify-center bg-slate-200">
            <span className="w-[90%] md:w-1/2 flex items-center justify-end absolute top-[20px] right-[20px] z-20 ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} {/* Display alert */}
            </span>
            
            <div className="w-full flex flex-row items-center justify-between h-full gap-[20px] bg-black rounded-[10px] ">
                
                <div className="relative max-sm:hidden w-[50%] h-full rounded-[20px] flex items-center justify-center ">
                    
                    <div className="mx-auto relative w-[400px] h-[400px] rounded-[10px] overflow-hidden auth-bg">
                        <Image
                            src="/logo.jpg"
                            alt="Authentication"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                </div>


                <div className=" max-sm:w-full w-[50%] h-full flex items-start justify-start ">
                    
                    <div className="w-full h-full flex flex-col items-start justify-center max-sm:justify-start  gap-10 max-sm:gap-[15px] my-auto  sm:rounded-[20px] max-sm:p-[20px] max-md:px-[20px] ">

                        <div className="hidden mx-auto max-sm:block relative w-[250px] h-[125px] rounded-[10px] overflow-hidden auth-bg">
                            <Image
                                src="/logo.jpg"
                                alt="Authentication"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                        <span className="mx-auto w-auto flex flex-col items-center justify-start gap-[15px] sm:gap-[25px]">
                            <h2 className="text-xl lg:text-2xl font-semibold text-slate-200 text-center">Welcome Back.</h2>
                            <span className='text-white bg-teal-500  h-[45px] w-[45px] p-[10px] rounded-[100%] '>
                                {unlock_icon ? <CiUnlock size={'100%'} />: <CiLock size={'100%'} /> }
                                </span>
                            <h4 className=" text-sm  lg:text-lg text-slate-200 ">Sign in</h4>
                        </span>

                        <form action="" className='w-full md:w-[90%] xl:w-[80%] mx-auto flex flex-col gap-[15px] sm:gap-[30px]'>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-sm  text-slate-200 ">Email</h4>
                                <input type="email" name='email' className={inputError.emailError ? 'signup-input-error' : 'signup-input'} value={auth.email} onChange={handleChange} />
                            </span>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-sm  text-slate-200 ">Password</h4>
                                <span className="w-full relative  ">
                                    <input type={showPassword ? "text" : "password"} name='password' className={inputError.passwordError ? 'password-input-error' : 'password-input'} value={auth.password} onChange={handleChange} />
                                    <span className='absolute w-[40px] flex items-center justify-center top-[30%] right-0 text-teal-600' onClick={handlePassword} >
                                        {showPassword ? <IoEye size={20} className='cursor-pointer' /> : <IoMdEyeOff size={20} className='cursor-pointer' />}
                                    </span>
                                </span>
                            </span>
                            <button className="mt-[10px] w-full h-[50px] text-white bg-teal-600 rounded-[5px] hover:bg-teal-500 flex items-center justify-center text-sm" onClick={handleSubmit} disabled={loading}>
                                {loading ? (
                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                ) : 'Login'}
                            </button>
                        </form>

                        <span className="w-full flex flex-col items-center justify-center">
                            <p className="text-sm text-teal-400 hover:text-amber-600 hover:underline cursor-pointer mt-[10px]  text-center w-full lg:w-auto" onClick={() => { router.push('/auth/signup') }}>Don't have an account, Signup.</p>

                            <p className="text-sm text-teal-400 hover:text-amber-600 hover:underline cursor-pointer mt-[10px]  text-center w-full lg:w-auto" onClick={() => { router.push('/auth/generate-otp') }}>Forget Password</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
