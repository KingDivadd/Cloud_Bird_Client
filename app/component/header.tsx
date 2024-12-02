'use client'
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { BiMenu, BiX } from "react-icons/bi";
import {useChat} from '@/app/context/ChatContext'

const Header = () => {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const {header_nav, setHeader_nav} = useChat()

    // useEffect(() => {
    //     router.push('/auth/login')
    // }, [])

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const nav_to = (navv:string)=>{
        setHeader_nav(navv)
    }

    const handle_signup = ()=>{
        setHeader_nav('pricing')
    }

    return (
        <div className="w-full flex flex-col items-center justify-start bg-blue-600 ">
            <nav className="w-[92.5%] mx-auto h-[120px] flex items-center justify-between ">
                {/* left nav */}
                <div className=" flex h-full items-center justify-start gap-5">
                    <span className="flex items-center mr-5 cursor-pointer" onClick={()=> setHeader_nav('home') }>
                        <p className="text-xl font-semibold text-white">Cloud</p>
                        <p className="text-xl font-semibold text-[#04b2e4]">Bird</p>
                    </span>

                </div>
                {/* right nav */}

                <div className=" flex h-full items-center justify-end gap-5">
                    
                    <button className="h-[50px] font-[500] text-lg px-5 flex items-center text-white hover:text-sky-400 "  onClick={()=> router.push('/auth/login')}>
                        Sign in
                    </button>
                    <button className="h-[50px] font-[500] text-lg px-5 flex items-center text-slate-300 border-2 border-slate-300 hover:text-sky-400 hover:border-[#04b2e4] "  onClick={()=> router.push('/auth/signup')}>
                        Sign up
                    </button>
                </div>
            </nav>

            {(header_nav == 'home' || header_nav == 'features' ) && 
            <div className="w-[70%] mx-auto flex flex-col items-start justify-start gap-5 mb-20">
                <p className="xl:text-[65px] font-bold text-white">Cloud Bird</p>
                <p className="xl:text-lg w-[650px] text-start font-[400] text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique aut consectetur quae quaerat porro qui quia temporibus impedit corporis, ipsam a tempore facilis magni rem ea repudiandae modi nisi eligendi!</p>
                <button className="h-[60px] text-xl font-[400] bg-sky-400 px-5 flex items-center text-white  mt-5"onClick={()=> router.push('/auth/signup')}>
                    Proceed
                </button>

            </div>}



        </div>
    );
};

export default Header;
