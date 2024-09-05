'use client'
import React, {useState, useEffect} from 'react'
import {DoughnutChartFour} from "../donut_chart"

const Dashboard = () => {
    const dataValues = [25, 25, 20, 35];
    const labels = ['Other Services', 'Suspension Inspection and replacement', 'Service 3', 'Service 4'];
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#475569'];

    return (
        <div className="w-full flex items-start justify-center bg-[#475569] gap-[40px] px-[75px] py-[40px] ">
            <div className="flex-1 flex flex-col items-start justify-start rounded-[5px] bg-slate-900 min-h-[500px] p-[25px] shadow-md">
                <span className="w-full pb-[10px] flex items-center justify-start border-b border-slate-700">
                    <p className="text-sm font-medium text-white">Latest Scores & Repair Status</p>
                </span>

                <div className="w-full min-h-[300px] py-[20px] flex items-center justify-center gap-[50px] "> 

                    <span className="  flex flex-col justify-center items-center relative  ">
                        <DoughnutChartFour  /> 
                        <span className="w-[225px] h-[225px]  flex flex-col items-center justify-center absolute top-0 right-0 ">
                            <p className="text-3xl font-bold text-white">638</p>
                            <p className="text-sm text-sky-500">Exuifax</p>
                            <p className="text-sm text-white">Sep 04, 2024</p>
                            
                        </span>
                    </span>

                    <span className="  flex flex-col justify-center items-center relative  ">
                        <DoughnutChartFour  /> 
                        <span className="w-[225px] h-[225px]  flex flex-col items-center justify-center absolute top-0 right-0 ">
                            <p className="text-3xl font-bold text-white">632</p>
                            <p className="text-sm text-sky-500">Experion</p>
                            <p className="text-sm text-white">Sep 04, 2024</p>
                            
                        </span>
                    </span>

                    <span className="  flex flex-col justify-center items-center relative  ">
                        <DoughnutChartFour  /> 
                        <span className="w-[225px] h-[225px]  flex flex-col items-center justify-center absolute top-0 right-0 ">
                            <p className="text-3xl font-bold text-white">627</p>
                            <p className="text-sm text-sky-500">TransUnion</p>
                            <p className="text-sm text-white">Sep 04, 2024</p>
                            
                        </span>
                    </span>

                </div>

                <div className="w-full flex items-start justify-between gap-[25px]  ">
                    <div className="w-[65%] flex flex-col items-start justify-start h-[300px] gap-[15px]">
                        <div className="w-full flex items-center justify-between h-[50px] gap-[15px] ">
                            <span className="w-1/4 h-full rounded-[3px] text-sm text-start bg-slate-800 text-white flex items-center pl-[10px]" >Repair Status</span>
                            <span className="w-1/4 h-full rounded-[3px] text-sm text-start bg-slate-800 text-white flex items-center pl-[10px]" >Equifax</span>
                            <span className="w-1/4 h-full rounded-[3px] text-sm text-start bg-slate-800 text-white flex items-center pl-[10px]" >Experian</span>
                            <span className="w-1/4 h-full rounded-[3px] text-sm text-start bg-slate-800 text-white flex items-center pl-[10px]" >TransUnion</span>
                        </div>

                        <div className="w-full flex items-center justify-between h-[50px] gap-[15px] ">
                            <span className="w-1/4 h-full rounded-[3px] text-sm text-start text-white flex items-center gap-[5px] pl-[10px]" >In Dispute <p className="text-teal-400">[0]</p> </span>
                            <span className="w-1/4 h-full rounded-[3px] text-sm text-start text-white flex items-center pl-[10px]" >0</span>
                            <span className="w-1/4 h-full rounded-[3px] text-sm text-start text-white flex items-center pl-[10px]" >0</span>
                            <span className="w-1/4 h-full rounded-[3px] text-sm text-start text-white flex items-center pl-[10px]" >0</span>
                        </div>

                        <div className="w-full flex items-center justify-between h-[50px] gap-[15px] ">
                            <span className="w-1/4 h-full rounded-[3px] text-sm text-start bg-slate-800 text-white flex items-center gap-[5px] pl-[10px]" >Pending <p className="text-teal-400">[0]</p> </span>
                            <span className="w-1/4 h-full rounded-[3px] text-sm text-start bg-slate-800  text-white flex items-center pl-[10px]" >0</span>
                            <span className="w-1/4 h-full rounded-[3px] text-sm text-start bg-slate-800  text-white flex items-center pl-[10px]" >0</span>
                            <span className="w-1/4 h-full rounded-[3px] text-sm text-start bg-slate-800  text-white flex items-center pl-[10px]" >0</span>
                        </div>

                        <div className="w-full flex items-center justify-between h-[50px] gap-[15px] ">
                            <span className="w-1/4 h-full rounded-[3px] text-sm text-start text-white flex items-center gap-[5px] pl-[10px]" >Repairs <p className="text-teal-400">[0]</p> </span>
                            <span className="w-1/4 h-full rounded-[3px] text-sm text-start text-white flex items-center pl-[10px]" >0</span>
                            <span className="w-1/4 h-full rounded-[3px] text-sm text-start text-white flex items-center pl-[10px]" >0</span>
                            <span className="w-1/4 h-full rounded-[3px] text-sm text-start text-white flex items-center pl-[10px]" >0</span>
                        </div>

                    </div>

                    <div className="w-[35%]  flex flex-col items-start justify-start h-full">
                        
                        <div className="w-full flex flex-col items-start justify-start gap-[15px]  overflow-y-auto">
                            <div className="w-full flex flex-col items-start justify-start gap-[15px] ">

                                <span className="h-[50px] px-[10px] flex items-center justify-start text-sm text-white bg-slate-800 w-full ">
                                    Recent Active Dispute
                                </span>

                                    {['0001', '0002', '0003', '0004', '0005'].map((data:any, ind:number)=>{
                                            return(
                                                <span key={ind} className="w-full flex items-center justify-between px-[10px] h-[50px] ">
                                                    <h4 className="text-sm text-white flex items-center gap-[5px]"> Dispute Id:<p className="text-teal-400">DP{data}</p> </h4>
                    
                                                    <p className="text-sm text-white">In Progress</p>
                                                </span>
                                            )
                                        })

                                    }
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-[400px]  flex-col items-start justify-start  gap-[40px]" >
                <div className="w-full  flex flex-col items-start justify-start bg-slate-900 p-[25px] rounded-[5px] ">

                    <span className="w-full pb-[10px] flex items-center justify-start border-b border-slate-700">
                        <p className="text-sm font-medium text-white">Balance</p>
                    </span>

                    <span className="w-full h-[50px] mt-[15px] flex items-center justify-between bg-[#475569] px-[10px] rounded-[3px]">
                        <h4 className="text-sm text-white">Current Balance</h4>
                        <p className="text-md text-teal-400 font-semibold">$250.00</p>
                    </span>

                    <span className="w-full h-[50px] mt-[5px] flex items-center justify-start border-b border-slate-700">
                        <p className="text-sm font-medium text-white">Next Payment Due</p>
                    </span>

                    <span className="w-full h-[50px] mt-[15px] flex flex-row items-center px-[10px] justify-between gap-[5px]  bg-slate-800 rounded-[3px]">
                        <p className="text-sm text-teal-400 font-semibold">$50.00</p>
                        <p className="text-sm text-white font-semibold"> - </p>
                        <p className="text-sm text-teal-400 font-semibold">$ 2024-09-01</p>
                    </span>
                </div>

                <div className="w-full min-h-[400px] flex flex-col items-start justify-start bg-slate-900 p-[25px] rounded-[5px] ">

                    <span className="w-full pb-[10px] flex items-center justify-start border-b border-slate-700">
                        <p className="text-sm font-medium text-white">Tracking and Monitoring</p>
                    </span>
                    <div className="w-full flex flex-col items-start justify-start gap-[15px] overflow-y-auto">
                        <span className="w-full h-[50px] flex items-center justify-between">
                            <h4 className="text-sm text-white">Dispute Status:  </h4>
                            <p className="text-sm text-teal-400">Mailed on 2024-08-01</p>
                        </span>
                        <span className="w-full h-[50px] flex items-center justify-between">
                            <h4 className="text-sm text-white">Next Report Refresh:  </h4>
                            <p className="text-sm text-teal-400">2024-09-01</p>
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard