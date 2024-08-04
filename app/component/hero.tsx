'use client'
import { useState } from 'react';
import Image from "next/image";
import CustomButton from "./custombuttom";
import Link from "next/link";
import { IoIosPeople } from "react-icons/io";
import { FaGlobe } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { BiMenu, BiX } from "react-icons/bi";

const Hero = () => {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="w-full bg-white flex flex-col jusitify-start items-center lg:flex-row lg:items-start lg:jusitify-center gap-[20px] sm:gap-[40px] lg:gap-[10px] pt-[20px] pb-[20px]">
            {/* left side */}
            <div className="w-full lg:w-[45%] min-h-[50vh] lg:h-[94.5vh] flex items-start justify-start px-[15px] sm:px-[30px] lg:pl-[40px] xl:px-[70px] pt-[20px]">
                <div className="w-full h-auto flex flex-col justify-start items-start">
                    {/* the icon and logo */}
                    <nav className="w-full flex flex-row items-center justify-between gap-3 h-[50px]">
                        {/* logo goes here */}
                        <h3 className="font-bold text-2xl sm:text-3xl">CRS</h3>
                        <span 
                            className={`max-lg:block hidden h-[40px] w-[40px] sm:h-[50px] sm:w-[50px] cursor-pointer transition-transform ${menuOpen ? 'rotate-90' : ''}`}
                            onClick={toggleMenu}
                        >
                            <BiMenu size={'100%'} />
                        </span>
                    </nav>

                    {/* Dropdown menu */}
                    {menuOpen && (
                        <div className="absolute top-0 left-0 w-full bg-white shadow-lg rounded-b-md p-4 z-10">
                            <span 
                                className="absolute top-2 right-2 cursor-pointer"
                                onClick={toggleMenu}
                            >
                                <BiX size={30} />
                            </span>
                            <ul className="w-full flex flex-col gap-4">
                                <li className='w-full flex justify-center'>
                                    <Link href='/' className='w-full text-slate-800 text-center font-sm hover:underline ' onClick={toggleMenu}>Home</Link>
                                </li>
                                <li className='w-full flex justify-center'>
                                    <Link href='#platformfeatures'w-full className='text-slate-800 text-center font-sm hover:underline' onClick={toggleMenu}>Features</Link>
                                </li>
                                <li className='w-full flex justify-center'>
                                    <Link href='#reviews' className='w-full text-slate-800 text-center font-sm hover:underline' onClick={toggleMenu}>Reviews</Link>
                                </li>
                                <li>
                                    <button className="w-full text-slate-800 text-center font-sm hover:underline " onClick={() => { router.push('/auth/signup'); toggleMenu(); }}>Signup</button>
                                </li>
                                <li>
                                    <button className="w-full text-slate-800 text-center font-sm hover:underline " onClick={() => { router.push('/auth/login'); toggleMenu(); }}>Login</button>
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* The middle text and button */}
                    <div className="w-full flex flex-col justify-start items-start mt-[50px] lg:mt-[150px] gap-[30px]">
                        <h1 className="font-bold text-[35.5px] sm:text-[45px] w-full lg:w-[85%] text-center lg:text-start">Advanced Credit Repair Solution</h1>
                        <h4 className="font-normal text-[18px] w-[97.5%] max-lg:mx-auto lg:w-[85%] text-center lg:text-start">Introducing the Most Advanced All-In-One Credit Repair System Ever Created.</h4>
                        <button className="max-lg:mx-auto w-[175px] h-[45px] sm:h-[50px] mt-[20px] sm:mt-[50px] lg:mt-[75px] bg-slate-800 text-slate-200 rounded-[25px] hover:bg-slate-700" onClick={() => { router.push('/auth/signup') }}>Get Started</button>
                    </div>

                    {/* The bottom */}
                    <div className="hidden w-auto h-[140px] flex flex-row items-start justify-start gap-[20px] mt-[90px]">
                        <span className="w-[130px] h-full flex flex-col items-start justify-between">
                            <span className="w-auto text-blue-600"> <IoIosPeople size={30} /> </span>
                            <h1 className="font-bold text-4xl">20M+</h1>
                            <h4 className="font-light text-sm">Users Globally</h4>
                        </span>
                        <span className="h-full w-1 border-r border-slate-300"></span>
                        <span className="w-[130px] ml-[30px] h-full flex flex-col items-start justify-between">
                            <span className="w-auto text-blue-600"> <FaGlobe size={25} /> </span>
                            <h1 className="font-bold text-4xl">30M+</h1>
                            <h4 className="font-light text-sm">Countries Served</h4>
                        </span>
                    </div>
                </div>
            </div>

            {/* right side */}
            <div className="w-[87%] sm:w-[85.5%] max-lg:mx-auto lg:w-[55%] h-[70vh] lg:h-[94.5vh] flex flex-col justify-start items-start bg-slate-900 rounded-[10px] sm:rounded-[20px] lg:rounded-l-[20px] pt-[20px] relative">
                <nav className="max-lg:hidden z-2 w-full flex flex-row items-center justify-between gap-[40px] h-[50px] px-[30px] xl:px-[70px]">
                    {/* logo goes here */}
                    <span className="flex flex-row items-center justify-start gap-[40px]">
                        <Link href={'/'} className='text-slate-200 font-sm hover:underline'>Home</Link>
                        <Link href={'#platformfeatures'} className='text-slate-200 font-sm hover:underline'>Features</Link>
                        <Link href={'#reviews'} className='text-slate-200 font-sm hover:underline'>Reviews</Link>
                    </span>
                    <button className="w-[150px] h-[45px] bg-white text-slate-700 font-md rounded-[22.5px] hover:bg-slate-100" onClick={() => { router.push('/auth/login') }}>Login</button>
                </nav>

                <div className="z-1 h-[80%] lg:h-[70%] w-[110%] absolute top-[10%] lg:top-[15%] max-lg:left-[-5%] lg:right-0 bg-slate-900 rounded-[10px] sm:rounded-[20px] lg:rounded-l-[20px] p-[10px]">
                    <div className="relative w-full h-full rounded-[10px] sm:rounded-[20px] overflow-hidden bg-slate-700">
                        <Image
                            src=""
                            alt="Dashboard Img"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
