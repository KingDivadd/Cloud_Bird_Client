'use client'
import React, {useEffect, useState} from 'react'
import Image from 'next/image'

const Navigation = () => {
    return (
        <div className="w-full h-[70px] flex flex-row items-center justify-center px-[10px] border-b border-[#404040] ">
            <div className="w-full flex flex-row items-center justify-between h-[40px] ">
                {/* the first section */}
                <span className="w-[35%] flex items-center justify-start">
                    <p className="text-lg text-slate-100 font-semibold">Dashboard</p>
                </span>
                <span className="w-[35%] flex items-center justify-start">
                    <p className="text-sm text-slate-200 font-semibold">d</p>
                </span>
                <span className="w-[30%] flex items-center justify-between">
                    <p className="text-sm text-slate-200 font-semibold h-[35px] my-auto flex items-center justify-center bg-[#404040] rounded-[40px] px-[25px]">3 August, 2024</p>

                    <span className="w-[50%] h-full flex items-center justify-between gap-[10px]">
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
                            <p className="text-sm text-end text-slate-400">Admin</p>
                        </span>
                    </span>
                </span>
                {/* the second section */}
                {/* the third section */}
            </div>
        </div>
    )
}

export default Navigation