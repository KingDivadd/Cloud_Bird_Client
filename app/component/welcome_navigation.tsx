'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'

const Welcome_navigation = () => {
    const router = useRouter()

    return (
        <div className="w-full h-[50px] px-[75px] flex items-center justify-start bg-slate-200">
            <p className="text-md font-semibold">Welcome to your Credit Repair Dashbaord</p>
        </div>
    )
}

export default Welcome_navigation