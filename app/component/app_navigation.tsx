'use client'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import { HiOutlinePower } from "react-icons/hi2";



const App_navigation = () => {
    const router = useRouter()

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

                <button className="px-[20px] h-[55px] flex items-center justify-center rounded-[3px] gap-[5px]  text-white cursor-pointer hover:bg-red-600" onClick={logout}>
                    <span className="h-[22.5px] w-[22.5px] "> <HiOutlinePower size={'100%'} /> </span>
                    <p className="text-md font-medium">Logout</p>
                </button>
            </div>

        </div>
    )
}

export default App_navigation