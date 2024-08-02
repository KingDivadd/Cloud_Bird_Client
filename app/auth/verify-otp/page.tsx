'use client'
import React, {useState, useEffect} from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { CiUnlock } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import Alert from '../../component/alert'
import { post_request } from '../../api';

const ForgetPassword = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({message: '', type: ''})
    const [auth, setAuth] = useState({email: '', otp: ''})

    useEffect(() => {
    
        const email = sessionStorage.getItem('email')
        if(!email || email == null){
            router.back()
        }else{
            setAuth({...auth, email: email})
        }

    }, [])

    async function resend_otp() {
        try {
            const email = sessionStorage.getItem('email') || null

            if (email == null || !email){
                router.back()
            }else{
                setAuth({...auth, email:email})
            }
            
            const response = await post_request('auth/generate-otp', {email: email})
                            
            if (response.status == 201 || response.status == 200){
                
                showAlert(response.data.msg, "success")
                
                setLoading(false)
                                
            }else if (response.response.status == 401){
                showAlert(response.response.data.err, "error")
                setAuth({email: '', otp: '' })
                setLoading(false)
            }
            else{
                showAlert(response.response.data.err, "error")
                setLoading(false)
                return;
            }

        } catch (err:any) {

            console.log(err);
            
            showAlert('Something went worong, try again later ', 'error')
            setLoading(false)
        }
    }

    function handleChange(e:any) {
        setAuth({...auth, otp: e.target.value})
    }

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function verifyOtp(e:any) {
        e.preventDefault()
        if (!auth.otp){
            setAlert({message: 'Please enter otp', type: 'error'})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
        }else {
            setLoading(true);
            
            try {
                let payload;

                const email = sessionStorage.getItem('email') || null
    
                if (email == null || !email){
                    router.push('/auth/forget-password')
                }else{
                    payload = {email: email, otp: auth.otp}
                }
                
                const response = await post_request('auth/verify-otp', payload)
                                
                if (response.status == 201 || response.status == 200){
                    
                    showAlert(response.data.msg, "success")

                    setAuth({email: '', otp: '' })
                    
                    setLoading(false)
                    
                    router.push('/auth/reset-password')
                    
                }else if (response.response.status == 401){
                    showAlert(response.response.data.err, "error")
                    setAuth({email: '', otp: '' })
                    setLoading(false)
                }
                else{
                    showAlert(response.response.data.err, "error")
                    setLoading(false)
                    return;
                }

            } catch (err:any) {

                console.log(err);
                
                showAlert('Something went worong, try again later ', 'error')
                setLoading(false)
            }
        }
    }
    return (
        <div className="relative w-full h-[100vh] p-[20px] flex items-center justify-center">
            <span className="w-1/2 flex items-center justify-end absolute top-[20px] right-[20px] ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} {/* Display alert */}
            </span>
            <div className="w-full flex flex-row items-center justify-between h-full gap-[20px]">
                <div className="relative w-[45%] h-full rounded-[20px] overflow-hidden">
                    <Image 
                        src="/auth2.png" 
                        alt="Authentication" 
                        layout="fill" 
                        objectFit="cover" 
                    />
                </div>
                <div className="w-[55%] rounded-[20px] h-full flex items-start justify-start">
                    <div className="w-full h-full flex flex-col items-start justify-start gap-10 mt-[60px]">
                        <span className="mx-auto w-[80%] flex flex-col items-center justify-start gap-5">
                            <h2 className="text-3xl font-semibold text-black">Recover Password</h2>
                            <span className='text-white bg-amber-600 p-[10px] rounded-[100%] '> {true ? <CiLock size={25} />: <CiUnlock size={25} />} </span>
                            <h4 className="text-lg text-center">A six digit code has been sent to <p className="text-blue-500">  {auth.email || "your email"} </p> </h4>
                        </span>

                        <form action="" className='w-[80%] mx-auto flex flex-col gap-[30px]'>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">OTP</h4>
                                <span className="w-full h-auto relative">

                                    <input type="text" name='otp' value={auth.otp} onChange={handleChange} className='signup-input' />
                                </span>
                            </span>
                            
                            <button className="mt-[10px] w-full h-[50px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={verifyOtp} disabled={loading}>
                                {loading ? (
                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                ) : 'Verify Otp'}
                            </button>
                        </form>

                        <span className="w-[80%] flex flex-row items-center justify-between h-[40px] mx-auto"> 

                            <p className="text-sm text-blue-400 hover:text-amber-600 hover:underline cursor-pointer mt-[10px]" onClick={() => { router.push('/auth/login') }}>Back to Login</p>
                        
                            <p className="text-sm text-blue-400 hover:text-amber-600 cursor-pointer mt-[10px]" onClick={resend_otp}>Resend Otp</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;