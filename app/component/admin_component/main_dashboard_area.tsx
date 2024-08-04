'use client'
import React,{useState, useEffect} from 'react'
import { GoPeople } from "react-icons/go";
import { RiSearchLine } from "react-icons/ri";


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

                            <div className="w-full rounded-[7.5px] gradient-1 " style={{height: 'calc( 100vh - 50px - 20px )'}} > </div>

                        </div>

                        <div className="max-md:w-full w-1/2 h-[480px] bg-slate-700 rounded-[7.5px] ">
                        </div>


                    </div>

                    <div className="w-full xl:w-[23%] h-full flex items-start justify-between gap-[15px] ">
                        <div className="max-lg:w-full w-[65%] xl:w-full  max-md:w-full h-[480px] bg-slate-700 rounded-[7.5px] p-[15px] flex flex-col items-start justify-start gap-[10px] ">
                            <span className="w-full h-[45px] px-[10px] flex items-center rounded-[5px] bg-slate-800  ">
                                <p className="text-sm text-slate-200"> Alerts & Notifications</p>
                            </span>

                            <div className=" w-full flex flex-col items-start rounded-[5px] overflow-y-auto " style={{height: 'calc(100% - 45px )'}} >
                                <div className="w-full">
                                    {[1,2,3,4,5,6,7,8,9,1,2,3].map((data, ind)=>{
                                        return(
                                            <div className="h-[60px] w-full  "> </div>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>

                        <div className="max-lg:hidden xl:hidden w-[35%] flex flex-wrap  justify-between items-between h-full gap-[15px] ">
                        {[1,2,3,4,5,6].map((data, ind)=>{
                            return(
                                <div className="  rounded-[5px] bg-slate-700 flex flex-col items-center justify-center gap-[3px] " style={{width: 'calc(50% - 7.5px)', height: 'calc((100% / 3) - 15px )'}} >
                                    <span className="w-[45px] h-[45px] text-amber-500 "><GoPeople size={'100%'} /> </span>
                                    <p className="text-sm font-normal text-slate-200">All Client</p>
                                    <p className="text-lg font-semibold text-slate-200">23</p>
                                </div>
                            )
                        })}
                    </div>

                    </div>

                </div>

                <div className="max-lg:flex hidden xl:flex w-full  flex flex-row items-start justify-between gap-[15px] sm:gap-[20px] px-[15px] pb-0 ">

                    <div className=" max-xl:w-full w-[77%] max-md:flex-wrap max-md:justify-between min-h-[130px] flex items-center gap-[15px] ">
                        {[1,2,3,4,5,6].map((data, ind)=>{
                            return(
                                <div className="w-1/6 max-sm:w-[47.5%] max-md:w-[31%]  h-[135px] rounded-[5px] bg-slate-700 flex flex-col items-center justify-center gap-[3px] ">
                                    <span className="max-md:w-[35px] max-md:w-[35px] w-[45px] h-[45px] text-amber-500 "><GoPeople size={'100%'} /> </span>
                                    <p className="text-sm max-md:text-[14px] font-normal text-slate-200">All Client</p>
                                    <p className="text-lg max-md:text-sm font-semibold text-slate-200">23</p>
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
                            <span className="w-full flex items-center justify-between">
                                <span className="flex items-center justify-start gap-[5px] ">
                                    <p className="text-sm font-semibold text-slate-200">New Customer</p>
                                    <p className="text-xs font-light text-slate-200">Showing 1 - 5 of 10</p>
                                </span>

                                <span className="flex items-center justify-start gap-[5px] ">
                                    <span className="w-[20px] h-[20px] text-slate-200 "> <RiSearchLine size={'100%'} /> </span>
                                    <p className="text-xs font-semibold text-slate-200 cursor-pointer">View All</p>
                                </span>
                            </span>

                            <span className="w-full rounded-[5px] h-[40px] bg-slate-800 "></span>

                        </div>
                        
                        <div className="w-[40%] max-lg:w-full h-[400px]  bg-slate-700 rounded-[5px] p-[15px] gap-[10px] flex flex-col items-start justify-start ">
                            <span className="w-full flex items-center justify-between">
                                <span className="flex items-center justify-start gap-[5px] ">
                                    <p className="text-sm font-semibold text-slate-200">Reminders</p>
                                    <p className="text-xs font-light text-slate-200">Showing 1 - 5 of 10</p>
                                </span>

                                <span className="flex items-center justify-start gap-[5px] ">
                                    <span className="w-[20px] h-[20px] text-slate-200 "> <RiSearchLine size={'100%'} /> </span>
                                    <p className="text-xs font-semibold text-slate-200 cursor-pointer">View All</p>
                                </span>
                            </span>

                            <span className="w-full rounded-[5px] h-[40px] bg-slate-800 "></span>

                        </div>

                    </div>

                    <div className="w-[23%] max-xl:w-full max-xl:hidden h-[150px]  ">

                    </div>


                </div>

                <div className="w-full  flex flex-row items-start justify-start gap-[15px] px-[15px] pb-0 ">

                    <div className="w-[77%] max-xl:w-full  flex items-center max-lg:flex-col gap-[15px] ">
                        <div className="w-[60%] max-lg:w-full h-[400px] bg-slate-700 h-[400px] rounded-[5px] p-[15px] gap-[10px] flex flex-col items-start justify-start ">
                            <span className="w-full flex items-center justify-between">
                                <span className="flex items-center justify-start gap-[5px] ">
                                    <p className="text-sm font-semibold text-slate-200">Active Leads</p>
                                    <p className="text-xs font-light text-slate-200">Showing 1 - 5 of 10</p>
                                </span>

                                <span className="flex items-center justify-start gap-[5px] ">
                                    <span className="w-[20px] h-[20px] text-slate-200 "> <RiSearchLine size={'100%'} /> </span>
                                    <p className="text-xs font-semibold text-slate-200 cursor-pointer">View All</p>
                                </span>
                            </span>

                            <span className="w-full rounded-[5px] h-[40px] bg-slate-800 "></span>

                        </div>
                        
                        <div className="w-[40%] max-lg:w-full h-[400px] bg-slate-700 rounded-[5px] p-[15px] gap-[10px] flex flex-col items-start justify-start ">
                            <span className="w-full flex items-center justify-between">
                                <span className="flex items-center justify-start gap-[5px] ">
                                    <p className="text-sm font-semibold text-slate-200">Messages</p>
                                    <p className="text-xs font-light text-slate-200">Showing 1 - 5 of 10</p>
                                </span>

                                <span className="flex items-center justify-start gap-[5px] ">
                                    <span className="w-[20px] h-[20px] text-slate-200 "> <RiSearchLine size={'100%'} /> </span>
                                    <p className="text-xs font-semibold text-slate-200 cursor-pointer">View All</p>
                                </span>
                            </span>

                            <span className="w-full rounded-[5px] h-[40px] bg-slate-800 "></span>

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