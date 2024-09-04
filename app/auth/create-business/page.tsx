'use client'
import React, { useState, useEffect } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { CiLock, CiUnlock } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import Alert from "../../component/alert"
import {post_auth_request} from "../../api/index"


const Business = () => {
    const router = useRouter();
    const [auth, setAuth] = useState({first_name: '', last_name: '', email: '', password: '', user_role: '' })
    const [inputError, setInputError] = useState({first_nameError: false, last_nameError: false, emailError: false, passwordError: false})
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [alert, setAlert] = useState({message: '', type: ''})
    const [unlock_icon, setUnlock_icon] = useState(false)

    useEffect(() => {
        if (auth.email) {setInputError({ ...inputError, emailError: auth.email === "" })}
        if (auth.password) {setInputError({ ...inputError, passwordError: auth.password === "" });}
    }, [auth]);

    useEffect(() => {
        const item = sessionStorage.getItem('email')
        if (!item) {
            router.push('/auth/login')
        }else{
            setAuth({...auth, email: item})
        }
    }, [])

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

    async function update_business_account(e:any){
        e.preventDefault()
        if (!auth.first_name || !auth.last_name ){
            showAlert("Please fill all fields", "warning")
            setInputError({...inputError, emailError: auth.email === "", first_nameError: auth.first_name === '', last_nameError: auth.last_name === '', passwordError: auth.password === ''})
        }else {
            setLoading(true); 

            try {
                
                const response = await post_auth_request('app/add-business', {
                    "business_name":auth.first_name, "business_address": auth.last_name, "avatar":""
                })

                if (response.status == 200 || response.status == 201){

                    showAlert(response.data.msg, "success")

                    setAuth({first_name: '', last_name: '', email: '', password: '', user_role: '' })

                    setLoading(false)

                    router.push('/auth/login')
                    
                }else{
                    showAlert(response.response.data.err, "error")
                    setLoading(false)
                    return;
                }

            } catch (err:any) {
                showAlert('Something went worong, try again later ', 'error')
                setLoading(false)
            }


            showAlert('Account created succesfully', 'success')
            setLoading(false)
        }   
    }

    return (
        <div className=" relative w-full h-[100vh]  sm:p-[20px] flex items-center justify-center bg-slate-800">
            <span className="w-[90%] md:w-1/2 flex items-center justify-end absolute top-[20px] right-[20px] z-20 ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} {/* Display alert */}
            </span>
            
            <div className="w-full flex flex-row items-center justify-between h-full gap-[20px] bg-black rounded-[10px] ">
                <div className=" relative max-sm:hidden w-[50%] h-full rounded-[20px] flex items-center justify-center bg-black ">
                    
                    <div className="mx-auto relative w-[400px] h-[400px] rounded-[10px] overflow-hidden auth-bg">
                        <Image
                            src="/logo.jpg"
                            alt="Authentication"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    
                </div>

                <div className="max-sm:w-full w-[50%] h-full flex items-start justify-start overflow-y-auto " >
                    <div className="w-full min-h-full flex flex-col items-start justify-center max-sm:justify-start sm:rounded-[20px] gap-10 max-sm:gap-[15px] my-auto bg-black  max-sm:p-[20px] max-md:px-[20px] sm:py-[20px]">

                        <div className="hidden mx-auto max-sm:block relative w-[250px] h-[125px] rounded-[10px] overflow-hidden auth-bg">
                            <Image
                                src="/logo.jpg"
                                alt="Authentication"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                        <span className="mx-auto w-auto flex flex-col items-center justify-start gap-2">
                            <h2 className="text-xl md:text-2xl font-semibold text-center text-slate-200">Create Business </h2>
                        </span>
                        <form action="" className='w-full md:w-[90%] xl:w-[80%] mx-auto flex flex-col gap-[15px] sm:gap-[30px]'>
                            <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-sm  text-slate-200 ">Business Name</h4>
                                <input onChange={handleChange} value={auth.first_name} name='first_name' type="text" className={inputError.first_nameError ? 'signup-input-error':'signup-input'} />
                            </span>
                            <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-sm  text-slate-200 ">Address</h4>
                                <input onChange={handleChange} value={auth.last_name} name='last_name' type="text" className={inputError.last_nameError ? 'signup-input-error':'signup-input'} />
                            </span>
                            <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-sm  text-slate-200 ">Email</h4>
                                <input onChange={handleChange} value={auth.email} name='email' disabled type="text" className={'signup-input bg-slate-100'} />
                            </span>
                            

                            <p className="text-sm font-normal text-teal-500 cursor-pointer hover:underline mt-[5px] text-center " onClick={()=> {router.push('/auth/login')}} >Already have an account login</p>


                            <div className="w-full max-md:flex-wrap flex sm:items-center sm:justify-between mt-[10px] gap-[20px] ">
                                
                                <button className="w-full  h-[50px] text-white bg-teal-600 rounded-[3px] hover:bg-teal-700 flex items-center justify-center text-sm " onClick={update_business_account} disabled={loading}>
                                    {loading ? (
                                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                    ) : 'Create Business'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Business;