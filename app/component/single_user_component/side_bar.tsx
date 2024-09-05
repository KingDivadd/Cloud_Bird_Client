'use client'
import { useRouter } from 'next/navigation';
import React, {useState, useEffect} from 'react'
import { TbSmartHome } from "react-icons/tb";
import { LiaUserEditSolid } from "react-icons/lia";
import { LuLogOut } from "react-icons/lu";
import { IoIosNotificationsOutline  } from "react-icons/io";
import { AiOutlineFileText, AiOutlineUserAdd } from 'react-icons/ai';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdGavel, MdPayment } from 'react-icons/md';
import { IoBarChartOutline, IoCalendarOutline } from 'react-icons/io5';
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { RiLogoutBoxFill } from "react-icons/ri";


interface SideRouteProps {
    side_route: string;
    setSide_route: (nav: string) => void;
}

const Side_bar = ({side_route, setSide_route}: SideRouteProps) => {
    const router = useRouter()

    useEffect(() => {
        const item = sessionStorage.getItem('side_route')
        if (!item || item == null || !['dashboard', 'user-management', 'leads', 'credit-report-management', 'credit-analysis', 'dispute-management', 'appointment-scheduling', 'billing-and-invoice', 'alerts-and-notification'].includes(item)){
            setSide_route('dashboard')
        }else{
            setSide_route(item)
        }
    }, [])

    function save_side_route(item:any) {
        sessionStorage.setItem('side_route', item)
        setSide_route(item)
    }

    return (
        <div className=" w-full h-full flex flex-col items-start justify-start bg-slate-900">
            <div className="w-full h-[70px] flex items-center justify-center font-semibold text-white ">CRS</div>

            <div className="w-full flex flex-col  items-center justify-start pt-[20px]" style={{height: 'calc( 100% - 140px )'}} >
                <span className="side-bar-item" >
                    <span className={side_route == "dashboard" ? "active-side-bar-item-icon" : "side-bar-item-icon"} onClick={()=> save_side_route('dashboard')} >
                        <TbSmartHome size={'100%'} />
                    </span>
                    <p className="text-sm side-bar-item-desc ">Dashboard</p>
                </span>

                <span className="side-bar-item">
                    <span className={side_route == "credit-report" ? "active-side-bar-item-icon" : "side-bar-item-icon"} onClick={()=> save_side_route('credit-report')} >
                        <AiOutlineFileText  size={'100%'} />
                    </span>
                    <p className="text-sm side-bar-item-desc ">Credit Report</p>
                </span>

                <span className="side-bar-item">
                    <span className={side_route == "dispute-management" ? "active-side-bar-item-icon" : "side-bar-item-icon"} onClick={()=> save_side_route('dispute-management')} >
                        <MdGavel size={'100%'} />
                    </span>
                    <p className="text-sm side-bar-item-desc ">Dispute Management</p>
                </span>

                <span className="side-bar-item">
                    <span className={side_route == "credit-analysis" ? "active-side-bar-item-icon" : "side-bar-item-icon"} onClick={()=> save_side_route('credit-analysis')} >
                        <IoBarChartOutline   size={'100%'} />
                    </span>
                    <p className="text-sm side-bar-item-desc ">Credit Analysis</p>
                </span>

                <span className="side-bar-item">
                    <span className={side_route == "tracking-and-monitoring" ? "active-side-bar-item-icon" : "side-bar-item-icon"} onClick={()=> save_side_route('tracking-and-monitoring')} >
                        <IoCalendarOutline size={'100%'} />
                    </span>
                    <p className="text-sm side-bar-item-desc ">Tracking & Monitoring</p>
                </span>

                <span className="side-bar-item">
                    <span className={side_route == "billing-and-invoice" ? "active-side-bar-item-icon" : "side-bar-item-icon"} onClick={()=> save_side_route('billing-and-invoice')} >
                        <LiaFileInvoiceSolid size={'100%'} />
                    </span>
                    <p className="text-sm side-bar-item-desc ">Billing & Invoicing</p>
                </span>

                <span className="side-bar-item">
                    <span className={side_route == "alerts-and-notification" ? "active-side-bar-item-icon" : "side-bar-item-icon"} onClick={()=> save_side_route('alerts-and-notification')} >
                        <IoIosNotificationsOutline  size={'100%'} />
                    </span>
                    <p className="text-sm side-bar-item-desc ">Alerts and Notification</p>
                </span>

            </div>

            <div className="w-full h-[70px]  flex items-center justify-center font-semibold text-white ">
                <span className="side-bar-item">
                    <span className={"side-bar-item-icon"}  onClick={()=> router.push('/auth/login')} >
                        <RiLogoutBoxFill size={'100%'} />
                    </span>
                    <p className="text-sm side-bar-item-desc ">Logout</p>
                </span>
            </div>

        </div>
    )
}

export default Side_bar