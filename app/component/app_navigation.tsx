'use client'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import { HiOutlinePower } from "react-icons/hi2";



const App_navigation = () => {
    const router = useRouter()
    const [userRole, setUserRole] = useState('')

useEffect(() => {
    const user_role = localStorage.getItem('user_role')
    if (!user_role || user_role == null || !['admin', 'single_user', 'business_user'].includes(user_role) ){
        router.push('/auth/login')
    }else{
        setUserRole(user_role)
    }
}, [])

    function logout() {
        sessionStorage.clear()
        localStorage.clear()
        router.push('/auth/login')
    }
    return (
        <div className="w-full min-h-[100px] px-[75px] flex items-center justify-center bg-slate-900 ">
            <div className="w-full h-full flex items-center justify-between">
                <div className="flex item-center justify-center gap-[5px]">
                    <p className="font-extrabold text-2xl text-teal-500 ">CM</p>
                    <p className="font-bold text-2xl text-white">MANAGEMENT</p>
                    <p className="font-extrabold text-2xl text-teal-500">SOLUTIONS</p>
                </div>

                <div className="h-full flex items-center justify-end gap-[10px] ">
                    <span className="h-[55px] flex items-center  ">
                        
                        {userRole == "business_user"  && 

                        <p className="text-sm flex items-end font-medium text-teal-500">[Business Account]</p>} 
                        {userRole == "admin"  && 

                        <p className="text-sm flex items-end font-medium text-teal-500">[Admin Account]</p>}
                        
                    </span>

                    <button className="px-[20px] h-[55px] flex items-center justify-center rounded-[3px] gap-[5px]  text-white cursor-pointer hover:bg-red-600" onClick={logout}>
                        <span className="h-[22.5px] w-[22.5px] "> <HiOutlinePower size={'100%'} /> </span>
                        <p className="text-md font-medium">Logout</p>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default App_navigation