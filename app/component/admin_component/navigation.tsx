'use client'
import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import { IoMdNotificationsOutline } from "react-icons/io";


const Navigation = () => {
    return (
        <div className="w-full h-[70px] flex flex-row items-center justify-center px-[10px]  ">
            <div className="w-full flex flex-row items-center justify-between h-[40px] gap-[10px] pl-[5px] ">
                {/* the first section */}
                <span className="w-[35%] flex items-center justify-start">
                    <p className="text-lg text-slate-100 font-semibold">Dashboard</p>
                </span>
                <span className="w-[65%] flex items-center justify-end gap-[15px]">

                    <span className="h-full flex items-center justify-between gap-[10px]">

                        <span className="w-[30px] h-[35px] text-slate-200 ">  <IoMdNotificationsOutline size={'100%'} /> </span>

                        <p className="text-sm text-slate-200 h-[35px] bg-slate-600 flex items-center px-[20px] rounded-[35px] ">2 new</p>
                    </span>

                    <p className="text-sm text-slate-200 font-normal h-[35px] my-auto flex items-center justify-center bg-slate-600 rounded-[40px] px-[20px]">3 August, 2024</p>

                    <span className=" h-full flex items-center justify-between gap-[10px]">
                        <span className="relative w-[40px] h-[40px] rounded-[40px] overflow-hidden ">
                            <Image
                                src="/auth2.png"
                                alt="Authentication"
                                layout="fill"
                                objectFit="cover"
                            />
                        </span>

                        <span className="w-[50] flex flex-col items-between justify-end ">
                            <p className="text-sm text-slate-100">Andrew Madisson</p>
                            <p className="text-sm text-end font-semibold text-slate-400">Admin</p>
                        </span>
                    </span>
                </span>
                
            </div>
        </div>
    )
}

export default Navigation