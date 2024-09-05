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
                        <p className="text-sm font-medium text-white">User, Profile and Dispute Matrics </p>
                    </span>

                    
                    <div className="w-full py-[20px] flex items-center justify-between gap-[25px] ">
                        {[
                        {title: 'Total Users', value: '1,500'}, 
                        {title: "Total Profile", value: "2,500"}, 
                        {title: "Total Disputes", value: "300"},
                        {title: "Total Repair", value: "200"}].map((data:any, ind:number)=>{
                            return(
                                <span key={ind} className="h-[225px] w-1/4 bg-[#475569] p-[12.5px] rounded-[15px] ">
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-[10px] bg-slate-900 rounded-[10px] p-[10px] ">
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
                                <p className="text-3xl font-bold text-white">20</p>
                                <p className="text-sm text-sky-500">New Dispute</p>
                                
                            </span>
                        </span>

                        <span className="  flex flex-col justify-center items-center relative  ">
                            <DoughnutChartFour  /> 
                            <span className="w-[225px] h-[225px]  flex flex-col items-center justify-center absolute top-0 right-0 ">
                                <p className="text-3xl font-bold text-white">150</p>
                                <p className="text-sm text-sky-500">Pending Dispute</p>
                                
                            </span>
                        </span>

                        <span className="  flex flex-col justify-center items-center relative  ">
                            <DoughnutChartFour  /> 
                            <span className="w-[225px] h-[225px]  flex flex-col items-center justify-center absolute top-0 right-0 ">
                                <p className="text-3xl font-bold text-white">30</p>
                                <p className="text-sm text-sky-500">Resolved Dispute</p>
                                
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
                        <p className="text-sm font-medium text-white">Recent User</p>
                        <p className="text-sm font-medium text-sky-500"></p>
                    </span>
                    
                    <div className="w-full flex flex-col items-start justify-start gap-[15px]">

                        <span className="w-full h-[50px] mt-[15px] flex items-center justify-between bg-[#475569] px-[10px] rounded-[3px]">
                            <h4 className="text-sm text-white font-medium">User Id</h4>
                            <p className="text-sm text-white font-medium">Name</p>
                        </span>

                        <div className="w-full h-[440px] flex flex-col items-start justify-start overflow-y-auto">
                            <div className="w-full flex flex-col">

                                {[
                                    {name: "Nwok Deborah", user_id: "US0001"},
                                    {name: "Nwok Precious", user_id: "US0002"},
                                    {name: "Amos Babangida", user_id: "US0003"},
                                    {name: "Ibrahim Musa", user_id: "US0004"},
                                    {name: "Patient Andrew", user_id: "US0005"},
                                    {name: "Akin Peace", user_id: "US0006"},
                                    {name: "Ryan Zucks", user_id: "US0007"},
                                    {name: "Mill", user_id: "US0008"},
                                ].map((data:any, ind:number)=>{
                                    return(
                                        <span key={ind} className="w-full h-[50px] hover:bg-slate-800 flex items-center justify-between  px-[10px] rounded-[3px]">
                                            <p className="text-sm text-sky-500">{data.user_id}</p>
                                            <h4 className="text-sm text-white ">{data.name}</h4>
                                        </span>
                                    )
                                })}
                            </div>

                        </div>

                    </div>

                </div>

                <div className="w-full flex-1 min-h-[575px] flex flex-col items-start justify-start bg-slate-900 p-[25px] rounded-[5px] ">

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