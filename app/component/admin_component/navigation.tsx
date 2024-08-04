'use client'

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiMenu, BiX } from "react-icons/bi";
import Admin_side_bar from './admin_side_bar';
import { TbSmartHome } from 'react-icons/tb';
import { LiaUserEditSolid } from 'react-icons/lia';

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [side_route, setSide_route] = useState('')

    useEffect(() => {
        const item = sessionStorage.getItem('side_route')
        if (!item || item == null || !['dashboard', 'user-management'].includes(item)){
            setSide_route('dashboard')
        }else{
            setSide_route(item)
        }
    }, [])

    function save_side_route(item:any) {
        sessionStorage.setItem('side_route', item)
        setSide_route(item)
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full h-[70px] flex flex-row items-center justify-center px-[15px]">
            <div className="w-full flex flex-row items-center justify-between h-[40px] gap-[10px]">
                {/* First section */}
                <span className="w-[50%] md:w-[35%] flex items-center justify-start gap-[15px]">
                    <span className="block sm:hidden w-[35px] h-[35px] text-slate-200 cursor-pointer" onClick={toggleMenu}>
                        <BiMenu size={'100%'} />
                    </span>
                    <p className="text-lg text-slate-100 font-semibold">Dashboard</p>
                </span>
                <span className="w-[50%] md:w-[65%] flex items-center justify-end gap-[25px]">
                    <span className="h-full flex items-center justify-between gap-[10px]">
                        <span className="w-[35px] h-[35px] text-slate-200">
                            <IoMdNotificationsOutline size={'100%'} />
                        </span>
                        <p className="hidden sm:flex text-sm text-slate-200 h-[35px] bg-slate-600 flex items-center px-[20px] rounded-[35px]">
                            2 new
                        </p>
                    </span>
                    <p className="hidden md:flex text-sm text-slate-200 font-normal h-[35px] my-auto flex items-center justify-center bg-slate-600 rounded-[40px] px-[20px]">
                        3 August, 2024
                    </p>
                    <span className="h-full flex items-center justify-between gap-[20px]">
                        <span className="relative w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] rounded-[40px] overflow-hidden">
                            <Image
                                src="/auth2.png"
                                alt="Authentication"
                                layout="fill"
                                objectFit="cover"
                            />
                        </span>
                        <span className="hidden lg:flex  flex flex-col items-between justify-end">
                            <p className="text-sm text-slate-100">Andrew Madisson</p>
                            <p className="text-sm text-end font-semibold text-slate-400">Admin</p>
                        </span>
                    </span>
                </span>
            </div>
            {/* Dropdown menu */}
            {menuOpen && (
                <div
                    ref={menuRef}
                    className="absolute top-[0px] left-0 w-full bg-white shadow-lg rounded-b-[10px] z-10 p-4"
                >
                    <span className="flex flex-col gap-4 w-full">
                        <span className="w-full h-[40px] flex items-center justify-end">
                            <span className="cursor-pointer" onClick={toggleMenu}>
                                <BiX size={24} />
                            </span>
                        </span>

                        <span className=" h-[40px] w-full flex items-center justify-start gap-[10px]" >
                            <span className={"w-[30px] h-[30px] flex items-center justify-center text-slate-800 "} onClick={()=> save_side_route('dashboard')} >
                                <TbSmartHome size={'100%'} />
                            </span>
                            <p className="text-md font-normal text-black flex item-center ">Dashboard</p>
                        </span>

                        <span className=" h-[40px] w-full flex items-center justify-start gap-[10px]" >
                            <span className={"w-[30px] h-[30px] flex items-center justify-center text-slate-800 "} onClick={()=> save_side_route('user-management')} >
                                <LiaUserEditSolid size={'100%'} />
                            </span>
                            <p className="text-md font-normal text-black ">User Management</p>
                        </span>

                        <span className=" h-[40px] w-full flex items-center justify-start gap-[10px]" >
                            <span className={"w-[30px] h-[30px] flex items-center justify-center text-slate-800 "} onClick={()=> save_side_route('notification')} >
                                <IoMdNotificationsOutline size={'100%'} />
                            </span>
                            <p className="text-md font-normal text-black ">Notification</p>
                        </span>

                    </span>
                </div>
            )}
        </div>
    );
};

export default Navigation;
