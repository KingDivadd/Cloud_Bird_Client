'use client'
import React, { useState, useEffect } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { CiLock, CiUnlock } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import Alert from "../../component/alert"
import {post_request} from "../../api/index"

const GenerateOtp = () => {
    const router = useRouter();
    const [auth, setAuth] = useState({ email: '' });
    const [inputError, setInputError] = useState({ emailError: false });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [alert, setAlert] = useState({message: '', type: ''})
    const [unlock_icon, setUnlock_icon] = useState(false)

    useEffect(() => {
        if (auth.email) {setInputError({ ...inputError, emailError: auth.email === "" })}
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
    
        if (!auth.email ) {
            showAlert("Please enter your registered email", "warning");
            setInputError({ emailError: auth.email === "" });
            return;
        } else {
            setLoading(true);
            
            try {
                
                const response = await post_request('app/generate-otp', auth)
                                
                if (response.status == 201 || response.status == 200){
                    
                    showAlert(response.data.msg, "success")

                    setLoading(false)
                    
                    setUnlock_icon(true)
                    
                    localStorage.setItem('email', auth.email)
                    
                    setAuth({email: '' })
                    
                    router.push('/auth/verify-otp')
                    
                }else{
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
                            <h2 className="text-xl lg:text-2xl font-semibold text-slate-200 text-center">Generate Otp</h2>
                            <span className='text-white bg-teal-500  h-[45px] w-[45px] p-[10px] rounded-[100%] '>
                                {unlock_icon ? <CiUnlock size={'100%'} />: <CiLock size={'100%'} /> }
                                </span>
                            <h4 className=" text-sm  lg:text-md text-slate-200 text-center w-full ">Please enter your registered email to generate otp</h4>
                        </span>

                        <form action="" className='w-full md:w-[90%] xl:w-[80%] mx-auto flex flex-col gap-[15px] sm:gap-[30px]'>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md  text-slate-200 ">Email</h4>
                                <input type="email" name='email' className={inputError.emailError ? 'signup-input-error' : 'signup-input'} value={auth.email} onChange={handleChange} />
                            </span>
                            
                            <button className="mt-[10px] w-full h-[50px] text-white bg-teal-600 rounded-[5px] hover:bg-teal-500 flex items-center justify-center text-sm " onClick={handleSubmit} disabled={loading}>
                                {loading ? (
                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                ) : 'Generate Otp'}
                            </button>
                        </form>

                        <span className="w-full flex flex-col items-center justify-center">
                            <p className="text-sm text-teal-400 hover:text-amber-600 hover:underline cursor-pointer mt-[10px]  text-center w-full lg:w-auto " onClick={() => { router.push('/auth/lgoin') }}>Back to Login.</p>

                            
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GenerateOtp;