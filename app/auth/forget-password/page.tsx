'use client'
import React, {useState, useEffect} from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { CiLock } from "react-icons/ci";
import Alert from '../../component/alert'
import { post_request } from '../../api/index';

const ForgetPassword = () => {
    const router = useRouter();
    const [auth, setAuth] = useState({email: ''})
    const [inputError, setInputError] = useState({ emailError: false });
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({message: '', type: ''})


    useEffect(() => {
        if (auth.email){setInputError({...inputError, emailError: false})}
    }, [auth])

    function handleChange(e:any){
        setAuth({...auth, email: e.target.value})
    }

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function getOtp(e:any){
        e.preventDefault()
        if (!auth.email){
            setAlert({message: 'Please provide your registered email address', type: 'warning'})
            setInputError({...inputError, emailError: auth.email === ''})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
        }else {
            setLoading(true);
            
            try {
                
                const response = await post_request('app/generate-otp', auth)
                                
                if (response.status == 201 || response.status == 200){
                    
                    showAlert(response.data.msg, "success")

                    sessionStorage.setItem('email', auth.email)

                    setAuth({email: '' })
                    
                    setLoading(false)
                    
                    router.push('/auth/verify-otp')
                    
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
        <div className="relative w-full h-[100vh]  sm:p-[20px] flex items-center justify-center bg-slate-200">
            <span className="w-[90%] md:w-1/2  flex items-center justify-end absolute top-[20px] right-[20px] ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} {/* Display alert */}
            </span>
            <div className="w-full flex flex-row items-center justify-between h-full gap-[20px]">
                
                <div className="relative max-sm:hidden w-[50%] h-full rounded-[20px] flex items-center justify-center bg-black ">
                    
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
                    <div className="w-full h-full flex flex-col items-start justify-center max-sm:justify-start  gap-10 max-sm:gap-[15px] my-auto bg-black sm:rounded-[20px]  max-sm:p-[20px] max-md:px-[20px]">

                        <div className="hidden mx-auto max-sm:block relative w-[250px] h-[125px] rounded-[10px] overflow-hidden auth-bg">
                            <Image
                                src="/logo.jpg"
                                alt="Authentication"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                        <span className="mx-auto sm:w-[97.5%] flex flex-col items-center justify-start gap-[15px] sm:gap-[25px]">
                            <h2 className="text-2xl lg:text-3xl font-semibold text-slate-200 text-center">Recover Password.</h2>
                            <span className='text-white bg-teal-500  h-[45px] w-[45px] p-[10px] rounded-[100%]  '> <CiLock size={'100%'} /> </span>
                            <h4 className="text-md sm:text-lg text-slate-200 text-center ">Enter your email address</h4>
                        </span>

                        <form action="" className='w-full md:w-[90%] xl:w-[80%] mx-auto flex flex-col gap-[15px] sm:gap-[30px]'>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md text-slate-200">Email</h4>
                                <input value={auth.email} onChange={handleChange} type="email" className={inputError.emailError? 'signup-input-error':'signup-input'} />
                            </span>
                            
                            <button className="mt-[10px] w-full h-[50px] text-white bg-teal-600 rounded-[5px] hover:bg-teal-500 flex items-center justify-center text-sm" onClick={getOtp} disabled={loading}>
                                {loading ? (
                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                ) : 'Get Otp'}
                            </button>
                        </form>

                        <span className="w-full md:w-[90%] xl:w-[80%] flex flex-wrap md:flex-row items-center justify-between h-[40px] mx-auto">
                            <p className="text-sm text-teal-400 hover:text-amber-600 hover:underline cursor-pointer mt-[10px]  text-center w-full lg:w-auto" onClick={() => { router.push('/auth/signup') }}>Don't have an account, Signup.</p>

                            <p className="text-sm text-teal-400 hover:text-amber-600 hover:underline cursor-pointer mt-[10px]  text-center w-full lg:w-auto" onClick={() => { router.push('/auth/login') }}>Back to Login</p>
                        </span>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;
