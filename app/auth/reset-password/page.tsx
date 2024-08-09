'use client'
import React, {useState, useEffect} from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { CiUnlock } from "react-icons/ci";
import { IoMdEyeOff } from 'react-icons/io';
import { IoEye } from 'react-icons/io5';
import Alert from '../../component/alert'
import { patch_request } from '../../api';

const RecoverPassword = () => {
    const router = useRouter();
    const [auth, setAuth] = useState({password: '', newPassword: ''})
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({message: '', type: ''})
    const [inputError, setInputError] = useState({passwordError: false, newPasswordError: false})

    useEffect(() => {
        if (auth.password){setInputError({...inputError, passwordError: false})}
        if (auth.newPassword){setInputError({...inputError, newPasswordError: false})}
    }, [auth])
    
    function handlePassword() {
        if (showPassword){setShowPassword(false)}
        else if (!showPassword){setShowPassword(true)}
    }

    function handleChange(e:any) {
        const name = e.target.name
        const value = e.target.value
        setAuth({...auth, [name]:value})
    }

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function handleSubmit (e:any) {
        e.preventDefault()
        if (!auth.password || !auth.newPassword){
            setAlert({message: 'Please create a new password', type: 'warning'})
            setInputError({...inputError, passwordError: auth.password === '', newPasswordError: auth.newPassword === ''})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
        }else {
            if (auth.password !== auth.newPassword){
                setAlert({message: 'Password do not match', type: 'error'})
                setTimeout(() => {
                    setAlert({message: '', type: ''})
                }, 3000);
            } else {

                let payload;

                const email = sessionStorage.getItem('email') || null

                if (email == null || !email){
                    router.push('/auth/forget-password')
                }else{
                    payload = {email: email, password: auth.password}
                }
                setLoading(true);
                
                try {
                    const response = await patch_request('auth/reset-password', payload)
                                    
                    if (response.status == 201 || response.status == 200){
                        
                        showAlert(response.data.msg, "success")
    
                        setAuth({newPassword: '', password: '' })

                        sessionStorage.removeItem('email')
                        
                        setLoading(false)
    
                        localStorage.setItem('key' ,response.headers.get('x-id-key'));                    
                        
                        router.push('/auth/login')
                        
                    }else if (response.response.status == 401){
                        showAlert(response.response.data.err, "error")
                        setAuth({newPassword: '', password: '' })
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
    }



    return (
        <div className="relative w-full h-[100vh]  sm:p-[20px] flex items-center justify-center bg-slate-800">
            <span className="w-1/2 flex items-center justify-end absolute top-[20px] right-[20px] ">
                {alert.message && <Alert message={alert.message} type={alert.type} />}
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

                <div className="max-sm:w-full w-[50%] h-full flex items-start justify-start ">
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
                            <h2 className="text-2xl lg:text-3xl font-semibold text-slate-200 text-center">Reset Password</h2>
                            <span className='text-white bg-teal-600 p-[10px] rounded-[100%] '> <CiUnlock size={25} /> </span>
                            <h4 className="text-lg text-slate-200 text-center">Create a new password</h4>
                        </span>

                        <form action="" className='w-full md:w-[90%] xl:w-[80%] mx-auto flex flex-col gap-[15px] sm:gap-[30px]'>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md text-slate-200">Password</h4>
                                <span className="w-full relative ">
                                    <input type={showPassword ? "text" : "password"} name='password' className={inputError.passwordError ?'password-input-error':'password-input'} value={auth.password} onChange={handleChange} />
                                    <span className='absolute w-[40px] flex items-center justify-center top-[30%] right-0 text-teal-600' onClick={handlePassword} >
                                        {showPassword ? <IoEye size={20} className='cursor-pointer' />: <IoMdEyeOff size={20} className='cursor-pointer' /> }
                                    </span>
                                </span>
                            </span>
                            
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md text-slate-200">Re-enter Password</h4>
                                <span className="w-full relative ">
                                    <input type={showPassword ? "text" : "password"} name='newPassword' className={inputError.newPasswordError ?'password-input-error':'password-input'} value={auth.newPassword} onChange={handleChange} />
                                    <span className='absolute w-[40px] flex items-center justify-center top-[30%] right-0 text-teal-600' onClick={handlePassword} >
                                        {showPassword ? <IoEye size={20} className='cursor-pointer' />: <IoMdEyeOff size={20} className='cursor-pointer' /> }
                                    </span>
                                </span>
                            </span>
                            
                            <button className="mt-[10px] w-full h-[50px] text-white bg-teal-600 rounded-[5px] hover:bg-teal-500 flex items-center justify-center" onClick={handleSubmit} disabled={loading}>
                                {loading ? (
                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                ) : 'Submit'}
                            </button>
                        </form>

                        <span className="w-[80%] flex flex-row items-center justify-between h-[40px] mx-auto"> 

                            <p className="text-sm text-teal-400 hover:text-amber-600 hover:underline cursor-pointer mt-[10px]" onClick={() => { router.push('/auth/login') }}></p>
                            <p className="text-sm text-teal-400 hover:text-amber-600 hover:underline cursor-pointer mt-[10px]" onClick={() => { router.push('/auth/login') }}>Back to Login</p>
                        
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecoverPassword;
