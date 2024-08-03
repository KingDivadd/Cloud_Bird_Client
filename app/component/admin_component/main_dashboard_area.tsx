'use client'
import React,{useState, useEffect} from 'react'
import { GoPeople } from "react-icons/go";
import { RiSearchLine } from "react-icons/ri";


const Main_dashboard_area = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-start  " style={{height: 'calc(100vh - 70px)'}} >

            <div className="w-full flex flex-col items-start justify-start h-full gap-[15px] overflow-y-auto ">
                
                <div className="w-full  flex flex-row items-start justify-start gap-[15px] pt-[10px] px-[15px]">

                    <div className="w-[35%] h-full   ">

                        <div className="w-full flex flex-col justify-start items-center gap-[20px] h-[480px]  ">
                            <div className="w-full flex flex-col items-start justify-between h-[50px]  ">
                                <p className="text-md font-semibold text-slate-200">Total Balance</p>
                                <p className="text-xs font-normal text-slate-400">The sum of all amount in my wallet</p>
                            </div>

                            <div className="w-full rounded-[7.5px] gradient-1 " style={{height: 'calc( 100vh - 50px - 20px )'}} > </div>

                        </div>
                    </div>

                    <div className="w-[65%] h-full flex items-start gap-[15px] ">

                        <div className="w-[65%] h-[480px] bg-slate-700 rounded-[7.5px] ">
                        </div>

                        <div className="w-[35%] h-[480px] bg-slate-700 rounded-[7.5px] p-[15px] flex flex-col items-start justify-start gap-[10px] ">
                            <span className="w-full h-[45px] px-[10px] flex items-center rounded-[5px] bg-slate-800  ">
                                <p className="text-sm text-slate-200"> Alerts & Notifications</p>
                            </span>

                            <div className="w-full flex flex-col items-start rounded-[5px] overflow-y-auto " style={{height: 'calc(100% - 45px )'}} >
                                <div className="w-full">
                                    {[1,2,3,4,5,6,7,8,9,1,2,3].map((data, ind)=>{
                                        return(
                                            <div className="h-[60px] w-full  "> </div>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="w-full  flex flex-row items-start justify-start gap-[15px] p-[15px] pb-0 ">

                    <div className="w-[77%] h-[130px] flex items-center gap-[15px] ">
                        {[1,2,3,4,5,6].map((data, ind)=>{
                            return(
                                <div className="w-1/6 h-full rounded-[5px] bg-slate-700 flex flex-col items-center justify-center gap-[3px] ">
                                    <span className="w-[45px] h-[45px] text-amber-500 "><GoPeople size={'100%'} /> </span>
                                    <p className="text-sm font-normal text-slate-200">All Client</p>
                                    <p className="text-lg font-semibold text-slate-200">23</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="w-[23%] hidden h-[150px]  ">

                    </div>

                </div>

                <div className="w-full  flex flex-row items-start justify-start gap-[15px] p-[15px] pb-0 ">

                    <div className="w-[77%] h-[400px] flex items-center gap-[15px] ">
                        <div className="w-[60%] h-full bg-slate-700 rounded-[5px] p-[15px] gap-[10px] flex flex-col items-start justify-start ">
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
                        
                        <div className="w-[40%] h-full bg-slate-700 rounded-[5px] p-[15px] gap-[10px] flex flex-col items-start justify-start ">
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

                    <div className="w-[23%] hidden h-[150px]  ">

                    </div>


                </div>

                <div className="w-full  flex flex-row items-start justify-start gap-[15px] p-[15px] pb-0 ">

                    <div className="w-[77%] h-[400px] flex items-center gap-[15px] ">
                        <div className="w-[60%] h-full bg-slate-700 rounded-[5px] p-[15px] gap-[10px] flex flex-col items-start justify-start ">
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
                        
                        <div className="w-[40%] h-full bg-slate-700 rounded-[5px] p-[15px] gap-[10px] flex flex-col items-start justify-start ">
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

                    <div className="w-[23%] hidden h-[150px]  ">

                    </div>


                </div>

                <div className="w-full  flex flex-row items-start justify-start gap-[15px] p-[15px] pb-[25px] ">

                    <div className="w-[77%] h-[400px] flex items-center gap-[15px] ">
                        <div className="w-full h-full bg-slate-700 rounded-[5px] p-[15px] gap-[10px] flex flex-col items-start justify-start ">

                            <span className="w-full rounded-[5px] h-[40px] bg-slate-800 "></span>

                        </div>

                    </div>

                    <div className="w-[23%] hidden h-[150px]  ">

                    </div>


                </div>

            </div>


        </div>
    )
}

export default Main_dashboard_area