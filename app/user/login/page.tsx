'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {useChat} from '../../context/ChatContext'

const Login = () => {
    const router = useRouter()
    const [auth, setAuth] = useState({email: '', password: ''})
    const {header_nav, setHeader_nav} = useChat()
    const [loading, setLoading] = useState(false)

    const handle_change = (e:any)=>{
        const name = e.target.name
        const value = e.target.value
        setAuth({...auth, [name]:value})

    }

    const handle_signup = ()=>{
        setHeader_nav('pricing')
        router.push('/')
    }

    const handle_login = (e:any)=>{
        e.preventDefault();
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setTimeout(() => {
                router.push('/user/dashboard')
            }, 1000);
        }, 3000);

    }

    return (
        <div className="w-full bg-slate-200 h-screen flex flex-col relative items-center justify-center gap-10">
            <span className="w-full h-[80px] absolute top-0 left-0 bg-slate-800">
                <div className="w-[80%] mx-auto h-full flex items-center justify-start ">
                    <span className="flex items-center  cursor-pointer" onClick={()=> router.push('/') }>
                        <p className="text-xl font-semibold text-white">Insight</p>
                        <p className="text-xl font-semibold text-amber-500">Edge</p>
                    </span>
                </div>
            </span>

            <span className="text-2xl font-[600] flex items-center ">Sign in to Insight <p className="text-amber-600">Edge</p></span>
            <form action='' className="w-[400px] flex flex-col items-start justify-start rounded-[5px] p-[20px] bg-white min-h-[200px] py-[30px] gap-[35px]">
                
                <input type="email" name='email' onChange={handle_change} placeholder='Email' className='input-type-1 ' />
                
                <input type="password" name='password' onChange={handle_change} placeholder='Password' className='input-type-1' />

                <span className="w-full flex items-center justify-end">
                    <p className="text-sm text-blue-600 cursor-pointer hover:text-amber-600" onClick={()=> router.push('/user/recover-password')} >Forgot Password?</p>
                </span>

                <button className="w-full flex items-center justify-center h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white" onClick={handle_login} disabled={loading}>
                    {loading ? (
                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    ) : 'sign in'}
                </button>


            </form>
            <span className="text-md font-[500] flex items-center gap-[10px] ">Don't have an account? <p className="text-blue-600 cursor-pointer" onClick={handle_signup}>Signup</p></span>


        </div>
    )
}

export default Login