'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {useChat} from '../../context/ChatContext'

const Login = () => {
    const router = useRouter()
    const [auth, setAuth] = useState({email: '', password: '', first_name: '', last_name: ''})
    const {header_nav, setHeader_nav} = useChat()

    const handle_change = (e:any)=>{
        const name = e.target.name
        const value = e.target.value
        setAuth({...auth, [name]:value})

    }

    const handle_signup = ()=>{
        setHeader_nav('pricing')
        router.push('/')
    }

    return (
        <div className="w-full bg-slate-200 h-[100vh]  flex flex-col items-start justify-start gap-10">
            <span className="w-full h-[80px] bg-slate-800">
                <div className="w-[80%] mx-auto h-full flex items-center justify-start ">
                    <span className="flex items-center  cursor-pointer" onClick={()=> router.push('/') }>
                        <p className="text-xl font-semibold text-white">Insight</p>
                        <p className="text-xl font-semibold text-amber-500">Edge</p>
                    </span>
                </div>
            </span>

            <span className=" text-2xl font-[600] mx-auto flex items-center ">Sign up to Insight <p className="text-amber-600">Edge</p></span>
            <form action='' className=" w-[400px] mx-auto flex flex-col items-start justify-start rounded-[5px] p-[20px] bg-white min-h-[200px] py-[30px] gap-[35px] ">
                
                <input type="text" name='first_name' onChange={handle_change} placeholder='First Name' className='input-type-1 ' />
                
                <input type="text" name='last_name' onChange={handle_change} placeholder='Last Name' className='input-type-1 ' />
                
                <input type="email" name='email' onChange={handle_change} placeholder='Email' className='input-type-1 ' />
                                
                <input type="password" name='password' onChange={handle_change} placeholder='Password' className='input-type-1' />

                {/* <span className="w-full flex items-center justify-end">
                    <p className="text-sm text-blue-600 cursor-pointer hover:text-amber-600" onClick={()=> router.push('/generate-otp')} >Forgot Password?</p>
                </span> */}

                <button className="w-full flex items-center justify-center h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white">
                    Sign in
                </button>

            </form>
            <span className="text-md font-[500] mx-auto flex items-center gap-[10px] ">Already have an account? <p className="text-blue-600 cursor-pointer" onClick={()=> router.push('/user/login')}>login</p></span>


        </div>
    )
}

export default Login