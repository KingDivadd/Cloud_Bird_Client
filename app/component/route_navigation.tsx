'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import { get_auth_request } from '../api';

interface NavProps {
    nav: string;
    setNav: (nav: string)=>void
}

const Route_navigation = ({nav, setNav}: NavProps) => {
    const [alert, setAlert] = useState({message: '', type: ''})
    const [user_name, setUser_name] = useState('')
    const router = useRouter()

    useEffect(() => {
        get_user_data()
        const item = sessionStorage.getItem('nav')
        if (!item || !['dashhoard', 'credit-report', 'dispute-management','credit-analysis', 'tracking-and-monitoring', 'education-resources', 'billing-and-invoices', 'settings']) {
            setNav('dashboard')
        }else{
            setNav(item)
        }
    }, [])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_user_data() {
        try {
            const response = await get_auth_request('app/navigation')
                            
            if (response.status == 201 || response.status == 200){
                
                const name = `${response.data.user.first_name} ${response.data.user.last_name}`

                setUser_name(name)

            }else if (response.response.status == 402){
                showAlert('Session Expired Login again ', 'error')
            }
            else{
                showAlert(response.response.data.err, "error")
                return;
            }

        } catch (err:any) {
            
            showAlert('Something went worong, try again later ', 'error')
        }
    }

    function select_nav(item:string) {
        sessionStorage.setItem('nav', item)
        setNav(item)
    }

    return (
        <div className="w-full  px-[75px] flex flex-col justify-center items-center justify-center bg-slate-900 ">
            <div className="w-full h-[90px] flex items-center justify-between border-b border-slate-600">
                <span className="flex-1 flex items-center justify-start">
                    <p className="text-3xl font-semibold text-white">{user_name || "- -"}</p>
                </span>

                <div className="w-[400px]  h-full flex items-center justify-between">
                    <button className="px-[20px] h-[45px] rounded-[3px] bg-teal-600 hover:bg-teal-700 text-white text-sm ">Upload Document</button>

                    <button className="px-[20px] h-[45px] rounded-[3px] bg-blue-600 hover:bg-teal-700 text-white text-sm ">Message Us</button>
                </div>
            </div>

            <div className="w-full flex items-center  gap-[10px] h-[70px]  ">
                <span className={nav == "dashboard" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('dashboard')}}>
                    <p className="text-sm">My Dashboard</p>
                </span>

                <span className={nav == "credit-report" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('credit-report')}}>
                    <p className="text-sm">Credit Report </p>
                </span>

                <span className={nav == "dispute-management" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('dispute-management')}}>
                    <p className="text-sm">Dispute Management</p>
                </span>

                <span className={nav == "credit-analysis" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('credit-analysis')}}>
                    <p className="text-sm">Credit Analysis </p>
                </span>

                <span className={nav == "tracking-and-monitoring" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('tracking-and-monitoring')}}>
                    <p className="text-sm">Tracking and Monitoring </p>
                </span>

                <span className={nav == "billing-and-invoices" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('billing-and-invoices')}}>
                    <p className="text-sm">Billing and Invices </p>
                </span>

                <span className={nav == "billing-and-invoices" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('billing-and-invoices')}}>
                    <p className="text-sm">Settings </p>
                </span>
            </div>
            
            
        </div>
    )
}

export default Route_navigation