'use client'
import React, {useState, useEffect} from 'react'
import {DoughnutChartFour} from "../donut_chart"

const Dashboard = () => {

    return (
        <div className="w-full flex items-start justify-center bg-[#475569] gap-[40px] px-[75px] py-[40px]">
            <div className="flex flex-col items-start justify-start gap-[30px] flex-1 overflow-x-auto " >
                {/* section 1 */}
                <div className="w-full flex flex-col items-start justify-start rounded-[5px] bg-slate-900 p-[25px] shadow-md">
                
                    <span className="w-full pb-[10px] flex items-center justify-start border-b border-slate-700">
                        <p className="text-sm font-medium text-white">Latest Scores & Repair Status (admin)</p>
                    </span>

                    
                    <div className="w-full py-[20px] flex items-center justify-between gap-[25px] ">
                        {[{title: 'Total Profiles Managed', value: '25'}, 
                        {title: "Client's with active dispute", value: "15"}, 
                        {title: "Clients in Progress", value: "15"},
                        {title: "Dispute Sucess Rate", value: "75%"}].map((data:any, ind:number)=>{
                            return(
                                <span key={ind} className="h-[225px] w-1/4 bg-[#475569] p-[12.5px] rounded-[5px] ">
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-[10px] bg-slate-900 rounded-[3px] p-[15px] ">
                                        <p className="text-sm font-medium text-sky-500 text-center">{data.title}</p>
                                        <p className="text-3xl font-bold text-white">{data.value}</p>
                                    </div>
                                </span>
                            )
                        })}
                    </div>

                    <div className="w-full min-h-[300px]  flex items-center justify-center gap-[50px] "> 

                        <span className="  flex flex-col justify-center items-center relative  ">
                            <DoughnutChartFour  /> 
                            <span className="w-[225px] h-[225px]  flex flex-col items-center justify-center absolute top-0 right-0 ">
                                <p className="text-3xl font-bold text-white">30%</p>
                                <p className="text-sm text-sky-500">Dispute In Progress</p>
                                
                            </span>
                        </span>

                        <span className="  flex flex-col justify-center items-center relative  ">
                            <DoughnutChartFour  /> 
                            <span className="w-[225px] h-[225px]  flex flex-col items-center justify-center absolute top-0 right-0 ">
                                <p className="text-3xl font-bold text-white">5 (17%)</p>
                                <p className="text-sm text-sky-500">Dispute Sent</p>
                                
                            </span>
                        </span>

                        <span className="  flex flex-col justify-center items-center relative  ">
                            <DoughnutChartFour  /> 
                            <span className="w-[225px] h-[225px]  flex flex-col items-center justify-center absolute top-0 right-0 ">
                                <p className="text-3xl font-bold text-white">5 (17%)</p>
                                <p className="text-sm text-sky-500">Dispute Sent</p>
                                
                            </span>
                        </span>
                    </div>


                </div>
                    
                    {/* section 2 */}
                <div className=" flex w-full  items-start justify-start gap-[40px] ">
                    <div className="w-1/2 flex flex-col items-start justify-start  rounded-[5px] bg-slate-900 p-[25px] ">
                        <span className="w-full pb-[10px] flex items-center justify-between border-b border-slate-700">
                            <p className="text-sm font-medium text-white">Profile Repairs & Status</p>
                            <p className="text-sm font-medium text-sky-500"></p>
                        </span>

                        <span className="w-full h-[50px] mt-[15px] flex items-center justify-start gap-[5px] bg-[#475569] px-[10px] rounded-[3px] ">
                            <p className="text-sm font-medium text-white w-[150px]">Profile</p>
                            <p className="text-sm font-medium text-white w-[90px] text-start ">Repair Id</p>
                            <p className="text-sm font-medium text-white flex-1 ">Status</p>
                        </span>

                        <div className="w-full flex flex-col items-start justify-start gap-[15px]">

                            <div className="w-full h-[375px] mt-[15px] flex flex-col items-start justify-start overflow-y-auto">
                                <div className="w-full flex flex-col">

                                    {[
                                        {name: "Nwok Precious", value: 'RP0001', status: 'Pending'},
                                        {name: "Nwok Deborah", value: 'RP0002', status: 'In Pending'},
                                        {name: "Ibrahim Amos", value: 'RP0003', status: 'Pending'},
                                        {name: "John Bush", value: 'RP0004', status: 'Completed'},
                                        {name: "Abraham Job", value: 'RP0005', status: 'Pending'},
                                        {name: "Ibrahim Amos", value: 'RP0003', status: 'Pending'},
                                        {name: "John Bush", value: 'RP0004', status: 'Completed'},
                                        {name: "Abraham Job", value: 'RP0005', status: 'Pending'},
                                        

                                    ].map((data:any, ind:number)=>{
                                        return(
                                            
                                            <span key={ind} className="w-full overflow-x-auto flex items-center justify-start overflow-x-auto ">
                                                <span className="whitespace-nowrap h-[50px] hover:bg-slate-800 flex items-center justify-between  px-[10px] rounded-[3px] gap-[5px] w-full">

                                                    <h4 className="text-sm text-white w-[150px]  ">{data.name}</h4>
                                                    <p className="text-sm text-sky-500 w-[90px] ">{data.value}</p>
                                                    <p className="text-sm text-sky-500 flex-1 text-start ">{data.status}</p>
                                                </span>

                                            </span>
                                        )
                                    })}
                                </div>

                            </div>

                        </div>


                    </div>

                    <div className="w-1/2 flex flex-col items-start justify-start bg-slate-900 p-[25px] rounded-[5px] ">

                        <span className="w-full pb-[10px] flex items-center justify-between border-b border-slate-700">
                            <p className="text-sm font-medium text-white">Billings & Payment</p>
                            <p className="text-sm font-medium text-sky-500"></p>
                        </span>

                        <span className="w-full h-[50px] mt-[15px] flex items-center justify-between bg-[#475569] px-[10px] rounded-[3px] ">
                            <p className="text-sm font-medium text-white">Outstanding Invoices:</p>
                            <p className="text-sm font-medium text-sky-500">$1,500.00</p>
                        </span>

                        <span className="w-full h-[60px] mt-[15px] flex items-center justify-between border-b border-t border-slate-700">
                            <p className="text-sm font-medium text-white">Payments</p>
                            <p className="text-sm font-medium text-sky-500"></p>
                        </span>

                        <div className="w-full  flex flex-col items-start justify-start gap-[15px]">

                            <div className="w-full h-[300px] mt-[15px] flex flex-col items-start justify-start overflow-auto">
                                <div className="w-full flex flex-col">

                                    {[
                                        {name: "Recent Payments", value: 300.00, desc: '(John Doe - Paid on 2024-08-20)'},
                                        {name: "Next Payment", value: 200.00, desc: '(Jane Smith on 2024-09-01)'},
                                        {name: "Recent Payments", value: 300.00, desc: '(John Doe - Paid on 2024-08-20)'},
                                        {name: "Next Payment", value: 150.00, desc: '(Jane Smith on 2024-09-01)'},
                                        {name: "Recent Payments", value: 300.00, desc: '(John Doe - Paid on 2024-08-20)'},
                                        {name: "Next Payment", value: 150.00, desc: '(Jane Smith on 2024-09-01)'},

                                    ].map((data:any, ind:number)=>{
                                        return(
                                            
                                            <span key={ind} className="w-full overflow-x-auto flex items-center justify-start overflow-x-auto ">
                                                <span className="whitespace-nowrap h-[50px] hover:bg-slate-800 flex items-center justify-between  px-[10px] rounded-[3px] w-full gap-[5px]">

                                                    <h4 className="text-sm text-white w-[175px] ">{data.name}</h4>
                                                    <p className="text-sm text-sky-500 w-[80px] text-center">${data.value}</p>
                                                    <p className="text-sm text-sky-500 w-[120px]   text-start">{data.desc}</p>
                                                </span>

                                            </span>
                                        )
                                    })}
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </div>

            <div className="flex w-[400px] flex-col items-start justify-start  gap-[40px] ">
                <div className="w-full  flex flex-col items-start justify-start bg-slate-900 p-[25px] rounded-[5px] ">

                    <span className="w-full pb-[10px] flex items-center justify-between border-b border-slate-700">
                        <p className="text-sm font-medium text-white">Dispute Mangement</p>
                        <p className="text-sm font-medium text-sky-500">(25)</p>
                    </span>
                    
                    <div className="w-full flex flex-col items-start justify-start gap-[15px]">

                        <span className="w-full h-[50px] mt-[15px] flex items-center justify-between bg-[#475569] px-[10px] rounded-[3px]">
                            <h4 className="text-sm text-white font-medium">Profile</h4>
                            <p className="text-sm text-white font-medium">No. of dispute</p>
                        </span>

                        <div className="w-full h-[370px] flex flex-col items-start justify-start overflow-y-auto">
                            <div className="w-full flex flex-col">

                                {[{name: "Nwok Deborah", value: 5},
                                    {name: "Nwok Precious", value: 7},
                                    {name: "Amos Babangida", value: 3},
                                    {name: "Ibrahim Musa", value: 5},
                                    {name: "Patient Andrew", value: 7},
                                    {name: "Akin Peace", value: 3},
                                    {name: "Ryan Zucks", value: 5},
                                ].map((data:any, ind:number)=>{
                                    return(
                                        <span key={ind} className="w-full h-[50px] hover:bg-slate-800 flex items-center justify-between  px-[10px] rounded-[3px]">
                                            <h4 className="text-sm text-white ">{data.name}</h4>
                                            <p className="text-sm text-sky-500">{data.value}</p>
                                        </span>
                                    )
                                })}
                            </div>

                        </div>

                    </div>

                    <span className="w-full h-[40px] mt-[15px] pt-[10px] flex flex-row items-center px-[10px] justify-between gap-[5px] border-t border-[#475569] rounded-[3px]">
                        <p className="text-sm text-sky-500 font-semibold">4</p>
                        <p className="text-sm text-white font-semibold"> - </p>
                        <p className="text-sm text-sky-500 font-semibold">20</p>
                    </span>
                </div>

                <div className="w-full flex-1 min-h-[590px] flex flex-col items-start justify-start bg-slate-900 p-[25px] rounded-[5px] ">

                    <span className="w-full pb-[10px] flex items-center justify-start border-b border-slate-700">
                        <p className="text-sm font-medium text-white">Tracking and Monitoring</p>
                    </span>
                    <div className="w-full flex flex-col items-start justify-start gap-[15px] overflow-y-auto">
                        <span className="w-full h-[50px] flex items-center justify-between">
                            <h4 className="text-sm text-white">Dispute Status:  </h4>
                            <p className="text-sm text-sky-500">Mailed on 2024-08-01</p>
                        </span>
                        <span className="w-full h-[50px] flex items-center justify-between">
                            <h4 className="text-sm text-white">Next Report Refresh:  </h4>
                            <p className="text-sm text-sky-500">2024-09-01</p>
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard