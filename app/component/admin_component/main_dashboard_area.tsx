'use client'
import React,{useState, useEffect} from 'react'
import { GoPeople } from "react-icons/go";
import { RiSearchLine } from "react-icons/ri";
import { IoWarningOutline } from "react-icons/io5";
import { IoIosSquareOutline, IoMdClose } from "react-icons/io";
import { IoIosCheckboxOutline } from "react-icons/io";
import { AiOutlineMail } from 'react-icons/ai';
import { dash_item } from '@/constants';
import { BiDollar } from 'react-icons/bi';


const Main_dashboard_area = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-start  " style={{height: 'calc(100vh - 70px)'}} >

            <div className="w-full flex flex-col items-start justify-start h-full gap-[15px] overflow-y-auto ">
                
                <div className="w-full  flex flex-col xl:flex-row items-start justify-start gap-[15px] sm:gap-[20px] pt-[10px] px-[15px] ">

                    <div className="w-full xl:w-[77%] flex max-md:flex-col items-start justify-between gap-[15px] sm:gap-[20px] h-full   ">

                        <div className="max-md:w-full w-1/2 flex flex-col justify-start items-center gap-[20px] h-[480px]  ">
                            <div className="w-full flex flex-col items-start justify-between h-[50px]  ">
                                <p className="text-md font-semibold text-slate-200">Total Balance</p>
                                <p className="text-xs font-normal text-slate-400">The sum of all amount in my wallet</p>
                            </div>

                            <div className="w-full rounded-[7.5px] gradient-1 p-[10px] flex flex-col items-start gap-[10px] justify-start " style={{height: 'calc( 100vh - 50px - 20px )'}} > 
                                <span className="w-full h-[30%] rounded-[3px] flex items-center justify-between gap-[10px] ">
                                    <div className="w-[55%] h-full flex items-start justify-start p-[10px] sm:p-[20px] ">
                                        <span className="h-[50px] w-[50px] text-sky-300 "><BiDollar size={'100%'} />  </span>
                                        <p className="text-3xl text-slate-200 mt-[4px]">23,450.97</p>
                                    </div>
                                    <div className="w-[45%] h-full flex flex-col items-end justify-start px-[15px] py-[30px] ">
                                        <p className="text-xs text-slate-300 w-full text-end ">Compared to last month </p>
                                        <p className="text-xs text-green-500"> 36%</p>
                                    </div>

                                </span>

                                <span className="w-full h-[70%] rounded-[3px] bg-slate-700"></span>
                            </div>

                        </div>

                        <div className="max-md:w-full w-1/2 h-[480px] flex flex-col items-start justify-start gap-[25px] ">

                            <div className="w-full flex flex-col items-start justify-start h-1/3 gap-[20px] ">
                                <span className="w-full flex flex-col items-start justify-between h-[50px]  ">
                                    <p className="text-md font-semibold text-slate-200">Affiliate Sale</p>
                                    <p className="text-xs font-normal text-slate-400">The sum of all amount from affiliate sale</p>
                                </span>

                                <div className="w-full h-full gradient-1 rounded-[7.5px] flex items-start justify-start ">
                                    <div className="w-[55%] h-full flex items-start justify-start p-[10px] sm:p-[20px] ">
                                        <span className="h-[50px] w-[50px] text-sky-300 "><BiDollar size={'100%'} />  </span>
                                        <p className="text-3xl text-slate-200 mt-[4px]">13,450.97</p>
                                    </div>
                                    <div className="w-[45%] h-full flex flex-col items-end justify-start px-[15px] py-[30px] ">
                                        <p className="text-xs text-slate-300 w-full text-end ">Compared to last month </p>
                                        <p className="text-xs text-green-500"> 36%</p>
                                    </div>
                                </div>

                            </div>

                            <div className="w-full flex flex-col items-start justify-start h-1/3 gap-[20px] ">
                                <span className="w-full flex flex-col items-start justify-between h-[30px]  ">
                                    <p className="text-md font-semibold text-slate-200">Invoice Due</p>
                                </span>

                                <div className="w-full h-full gradient-1 rounded-[7.5px] flex items-start justify-start ">
                                    <div className="w-[55%] h-full flex items-start justify-start p-[10px] sm:p-[20px] ">
                                        <span className="h-[50px] w-[50px] text-sky-300 "><BiDollar size={'100%'} />  </span>
                                        <p className="text-3xl text-slate-200 mt-[4px]">13,450.97</p>
                                    </div>
                                    <div className="w-[45%] h-full flex flex-col items-end justify-start px-[15px] py-[30px] ">
                                        <p className="text-xs text-slate-300 w-full text-end ">Compared to last month </p>
                                        <p className="text-xs text-green-500"> 36%</p>
                                    </div>
                                </div>

                            </div>

                            <div className="w-full flex flex-col items-start justify-start h-1/3 gap-[20px] ">
                                <div className="w-full h-full gradient-1 rounded-[7.5px] flex items-start justify-between ">
                                    <div className="w-[60%] h-full flex flex-col items-start justify-start pl-[30px] py-[20px] ">
                                        <p className="text-2xl text-slate-200 w-full text-start ">Active Leads </p>
                                    </div>
                                    <div className="w-[40%] h-full flex flex-col items-end justify-start p-[10px] sm:p-[20px] ">
                                        <p className="text-3xl text-slate-200 mt-[4px]">0</p>
                                        <p className="text-sm text-slate-200">Last Month: <strong>0</strong> </p>
                                    </div>
                                </div>

                            </div>


                        </div>


                    </div>

                    <div className="w-full xl:w-[23%] h-full flex items-start justify-between gap-[15px] ">
                        <div className="max-lg:w-full w-[65%] xl:w-full  max-md:w-full h-[480px] bg-slate-700 rounded-[7.5px] p-[15px] flex flex-col items-start justify-start gap-[10px] ">
                            <span className="w-full h-[45px] px-[10px] flex items-center rounded-[5px] bg-slate-800  ">
                                <p className="text-xs text-slate-200"> Alerts & Notifications</p>
                            </span>

                            <div className=" w-full flex flex-col items-start rounded-[5px] overflow-y-auto " style={{height: 'calc(100% - 45px )'}} >
                                <div className="w-full">
                                    {[1,2,3,4,5,6,7,8,9,1,2,3].map((data, ind)=>{
                                        return(
                                            <span key={ind} className="min-h-[50px] w-full flex items-center justify-between gap-[15px] border-b border-slate-500 ">
                                                <span className="w-[25px] h-[25px] text-teal-300 flex items-center justify-center"><AiOutlineMail /> </span>

                                                <span className="h-full flex flex-col gap-[3px] justify-center item-start" style={{width: 'calc(100% - 25px)'}}>
                                                    <span className="w-full flex items-center justify-between">
                                                        <p className="text-[14px]  text-slate-200">Logged in to customer Porter </p>
                                                        <span className="h-[20px] w-[20px] rounded-[100%] bg-slate-800 p-[3px] text-slate-200 hover:bg-red-600 cursor-pointer flex items-center justify-center ">
                                                            <IoMdClose size={'100%'} />
                                                        </span>
                                                        {/* <p className="text-xs font-light text-slate-400">dismiss</p> */}
                                                    </span>

                                                    <span className="w-full flex items-center justify-between">
                                                        <p className="text-[14px] font-nomal text-slate-200">Bill Palmer </p>
                                                        <p className="text-[13px] font-light text-slate-300">5hrs ago</p>
                                                    </span>

                                                </span>
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>

                        <div className="max-lg:hidden xl:hidden w-[35%] flex flex-wrap  justify-between items-between h-full gap-[15px] ">
                        {dash_item.map((data:any, ind:number)=>{
                            return(
                                <div key={ind} className="rounded-[5px] bg-slate-700 flex flex-col items-center justify-center gap-[3px] " style={{width: 'calc(50% - 7.5px)', height: 'calc((100% / 3) - 15px )'}} >
                                    <span className="w-[45px] h-[45px] text-amber-500 "><GoPeople size={'100%'} /> </span>
                                    <p className="text-sm font-normal text-slate-200">{data.title}</p>
                                    <p className="text-lg font-semibold text-slate-200">{data.amount}</p>
                                </div>
                            )
                        })}
                    </div>

                    </div>

                </div>

                <div className="max-lg:flex hidden xl:flex w-full  flex flex-row items-start justify-between gap-[15px] sm:gap-[20px] px-[15px] pb-0 ">

                    <div className=" max-xl:w-full w-[77%] max-md:flex-wrap max-md:justify-between min-h-[130px] flex items-center gap-[15px] ">
                        {dash_item.map((data:any, ind:number)=>{
                            return(
                                <div key={ind} className="w-1/6 max-sm:w-[47.5%] max-md:w-[31%]  h-[135px] rounded-[5px] bg-slate-700 flex flex-col items-center justify-center gap-[3px] ">
                                    <span className="max-md:w-[35px] max-md:w-[35px] w-[45px] h-[45px] text-amber-500 "><GoPeople size={'100%'} /> </span>
                                    <p className="text-sm max-md:text-[14px] font-normal text-slate-200">{data.title}</p>
                                    <p className="text-lg max-md:text-sm font-semibold text-slate-200">{data.amount}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="w-[23%]  max-xl:hidden h-[150px ] ">
                    </div>

                </div>

                <div className="w-full  flex  flex-row items-start justify-start gap-[15px] px-[15px] pb-0 ">

                    <div className="w-[77%] max-xl:w-full  flex max-lg:flex-col items-center gap-[15px] ">
                        <div className="w-[60%] max-lg:w-full h-[400px] bg-slate-700 rounded-[5px] p-[15px] gap-[10px] flex flex-col items-start justify-start ">
                            <span className="w-full h-[40px] flex items-center justify-between">
                                <span className="flex items-center justify-start gap-[5px] ">
                                    <p className="text-sm font-semibold text-slate-200">New Customer</p>
                                    <p className="text-xs font-light text-slate-200">Showing 1 - 5 of 10</p>
                                </span>

                                <span className="flex items-center justify-start gap-[5px] ">
                                    <span className="w-[20px] h-[20px] text-slate-200 "> <RiSearchLine size={'100%'} /> </span>
                                    <p className="text-xs font-semibold text-slate-200 cursor-pointer">View All</p>
                                </span>
                            </span>

                            <span className="w-full rounded-[5px] h-[45px] bg-slate-800 flex flex-row items-center justify-between px-[10px]">
                                <p className="text-xs w-[25%] text-slate-200 ">Name</p>
                                <p className="text-xs w-[25%] text-slate-200 ">Assigned To</p>
                                <p className="text-xs w-[25%] text-slate-200 ">Signup Date</p>
                                <p className="text-xs w-[25%] text-slate-200 "></p>
                            </span>

                            <div className="w-full  bg-slate-600 rounded-[5px] flex flex-col items-start justify-start overflow-y-auto" style={{height: 'calc(100% - 85px)'}}>
                                <div className='flex flex-col items-start justify-start w-full' >
                                    {[1,2,3,4,5,6,7,8,9,0].map((data, ind)=>{
                                        return(
                                            <span key={ind} className=" h-[50px] w-full flex px-[10px] flex items-center justify-between hover:bg-slate-700  ">
                                                <p className="text-xs w-[25%] text-slate-300 ">Andrew Madison</p>
                                                <p className="text-xs w-[25%] text-slate-300 ">Cerena Williams</p>
                                                <p className="text-xs w-[25%] text-slate-300 ">05-08-2024</p>
                                                <span className="text-xs w-[25%] text-slate-300 ">

                                                </span>
                                            </span>
                                        )
                                })}
                                </div>
                            </div>

                        </div>
                        
                        <div className="w-[40%] max-lg:w-full h-[400px]  bg-slate-700 rounded-[5px] p-[15px] gap-[10px] flex flex-col items-start justify-start ">
                            <span className="w-full h-[40px] flex items-center justify-between">
                                <span className="flex items-center justify-start gap-[5px] ">
                                    <p className="text-sm font-semibold text-slate-200">Reminders</p>
                                    <p className="text-xs font-light text-slate-200">Showing 1 - 5 of 10</p>
                                </span>

                                <span className="flex items-center justify-start gap-[5px] ">
                                    <span className="w-[20px] h-[20px] text-slate-200 "> <RiSearchLine size={'100%'} /> </span>
                                    <p className="text-xs font-semibold text-slate-200 cursor-pointer">View All</p>
                                </span>
                            </span>

                            <span className="w-full rounded-[5px] h-[40px] bg-slate-800 h-[45px] px-[10px] flex items-center justify-between gap-[20px] ">
                                <p className="text-xs text-slate-200">Important Alerts</p>
                                <p className="text-xs text-slate-200">Action</p>
                            </span>

                            <div className="w-full flex items-start justify-start bg-slate-600 rounded-[5px] overflow-y-auto " style={{height: 'calc(100% - 85px)'}} >
                                <div className="w-full flex flex-col items-start justify-start">
                                    {[1,2,3,4,5,6,7].map((data, ind)=>{
                                        return(
                                            <span key={ind} className=" h-[50px] w-full flex px-[10px] flex items-center justify-between gap-[15px] hover:bg-slate-700  ">
                                                <span className="w-[25px] h-[25px] text-red-500 flex items-center justify-center">
                                                    <IoWarningOutline size={'100%'} /> 
                                                </span>

                                                <span className="h-full flex flex-col items-start justify-center overflow-x-auto" style={{width: 'calc(100% - 50px)'}}>
                                                    <p className="text-xs font-normal text-teal-100">Reminder One</p>
                                                    <p className="text-xs font-light text-slate-300 truncate overflow-hidden text-overflow-ellipsis max-w-md">Here is a short descrition of reminder one</p>
                                                </span>

                                                <span className="w-[25px] h-[25px] text-slate-200 flex items-center justify-center cursor-pointer">
                                                    <IoIosSquareOutline size={'100%'} /> 
                                                </span>
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="w-[23%] max-xl:w-full max-xl:hidden h-[150px]  ">

                    </div>


                </div>

                <div className="w-full  flex flex-row items-start justify-start gap-[15px] px-[15px] pb-0 ">

                    <div className="w-[77%] max-xl:w-full  flex items-center max-lg:flex-col gap-[15px] ">
                        <div className="w-[60%] max-lg:w-full h-[400px] bg-slate-700 h-[400px] rounded-[5px] p-[15px] gap-[10px] flex flex-col items-start justify-start ">
                            <span className="w-full h-[40px] flex items-center justify-between">
                                <span className="flex items-center justify-start gap-[5px] ">
                                    <p className="text-sm font-semibold text-slate-200">Active Leads</p>
                                    <p className="text-xs font-light text-slate-200">Showing 1 - 5 of 10</p>
                                </span>

                                <span className="flex items-center justify-start gap-[5px] ">
                                    <span className="w-[20px] h-[20px] text-slate-200 "> <RiSearchLine size={'100%'} /> </span>
                                    <p className="text-xs font-semibold text-slate-200 cursor-pointer">View All</p>
                                </span>
                            </span>

                            <span className="w-full rounded-[5px] h-[45px] bg-slate-800 px-[10px] flex items-center justify-between ">
                                <p className="text-xs text-slate-200 font-normal w-[25%] ">Name</p>
                                <p className="text-xs text-slate-200 font-normal w-[20%] ">Date</p>
                                <p className="text-xs text-slate-200 font-normal w-[25%] ">Assigned To</p>
                                <p className="text-xs text-slate-200 font-normal w-[20%] ">Status</p>
                                <p className="text-xs text-slate-200 font-normal w-[10%] "></p>
                            </span>

                            <div className="w-full  bg-slate-600 rounded-[5px] flex flex-col items-start justify-start overflow-y-auto" style={{height: 'calc(100% - 85px)'}}>
                                <div className='flex flex-col items-start justify-start w-full' >
                                    {[1,2,3,4,5,6,7,8,9,0].map((data, ind)=>{
                                        return(
                                            <span key={ind} className=" h-[50px] w-full flex px-[10px] flex items-center justify-between hover:bg-slate-700  ">
                                                <p className="text-xs w-[25%] text-slate-300 ">Andrew Madison</p>
                                                <p className="text-xs w-[20%] text-slate-300  ">05-08-2024</p>
                                                <p className="text-xs w-[25%] text-slate-300 ">Cerena Williams</p>
                                                <p className="text-xs w-[25%] text-slate-300 ">{ind % 2 == 1 ? "In Progress":"Contacted" }</p>
                                                <p className="text-xs w-[10%] text-teal-300 hover:underline cursor-pointer ">view</p>
                                            </span>
                                        )
                                })}
                                </div>
                            </div>

                        </div>
                        
                        <div className="w-[40%] max-lg:w-full h-[400px] bg-slate-700 rounded-[5px] p-[15px] gap-[10px] flex flex-col items-start justify-start ">
                                    {/*  */}
                            <span className="w-full h-[40px] flex items-center justify-between">
                                <span className="flex items-center justify-start gap-[5px] ">
                                    <p className="text-sm font-semibold text-slate-200">Messages</p>
                                    <p className="text-xs font-light text-slate-200">Showing 1 - 5 of 10</p>
                                </span>

                                <span className="flex items-center justify-start gap-[5px] ">
                                    <span className="w-[20px] h-[20px] text-slate-200 "> <RiSearchLine size={'100%'} /> </span>
                                    <p className="text-xs font-semibold text-slate-200 cursor-pointer">View All</p>
                                </span>
                            </span>

                            <span className="w-full rounded-[5px] h-[40px] bg-slate-800 h-[45px] px-[10px] flex items-center justify-between gap-[20px] ">
                                <p className="text-xs text-slate-200">Name & Messages</p>
                                <p className="text-xs text-slate-200">Action</p>
                            </span>

                            <div className="w-full flex items-start justify-start bg-slate-600 rounded-[5px] overflow-y-auto " style={{height: 'calc(100% - 85px)'}} >
                                <div className="w-full flex flex-col items-start justify-start">
                                    {[1,2,3,4,5,6,7].map((data, ind)=>{
                                        return(
                                            <span key={ind} className=" h-[50px] w-full flex px-[10px] gap-[15px] flex items-center justify-between hover:bg-slate-700  ">
                                                <span className="w-[25px] h-[25px] text-teal-400 flex items-center justify-center">
                                                    <AiOutlineMail size={'100%'} /> 
                                                </span>

                                                <span className="h-full flex flex-col items-start justify-center overflow-x-auto" style={{width: 'calc(100% - 85px)'}}>
                                                    <p className="text-xs font-normal text-teal-100">Reminder One</p>
                                                    <p className="text-xs font-light text-slate-300 truncate overflow-hidden text-overflow-ellipsis max-w-md">Here is a short descrition of reminder one</p>
                                                </span>

                                                <p className="text-xs font-normal text-teal-100 hover:underline w-[50px] text-end cursor-pointer">View</p>
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>
                                    {/*  */}

                        </div>

                    </div>

                    <div className="w-[23%] max-xl:w-full max-xl:hidden h-[150px]  ">

                    </div>


                </div>

                <div className="w-full  flex flex-row items-start justify-start gap-[15px] px-[15px] pb-[25px] ">

                    <div className="w-[77%] max-xl:w-full h-[400px] flex items-center gap-[15px] ">
                        <div className="w-full h-full bg-slate-700 rounded-[5px] p-[15px] gap-[10px] flex flex-col items-start justify-start ">

                            <span className="w-full rounded-[5px] h-[40px] bg-slate-800 "></span>

                        </div>

                    </div>

                    <div className="w-[23%] max-xl:w-full max-xl:hidden h-[150px]  ">

                    </div>


                </div>

            </div>


        </div>
    )
}

export default Main_dashboard_area