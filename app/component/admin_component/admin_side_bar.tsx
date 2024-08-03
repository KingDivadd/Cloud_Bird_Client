'use client'
import { useRouter } from 'next/navigation';
import React, {useState, useEffect} from 'react'
import { TbSmartHome } from "react-icons/tb";
import { LiaUserEditSolid } from "react-icons/lia";
import { LuLogOut } from "react-icons/lu";

const Admin_side_bar = () => {
    const router = useRouter()
    const [side_route, setSide_route] = useState('')

    useEffect(() => {
        const item = sessionStorage.getItem('side_route')
        if (!item || item == null || !['dashboard', 'user-management'].includes(item)){
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
        <div className="w-full h-full flex flex-col items-start justify-start bg-[#000000]">
            <div className="w-full h-[70px] flex items-center justify-center font-semibold text-white ">CRS</div>

            <div className="w-full flex flex-col  items-center justify-start pt-[20px]" style={{height: 'calc( 100% - 140px )'}} >
                <span className="side-bar-item" >
                    <span className={side_route == "dashboard" ? "active-side-bar-item-icon" : "side-bar-item-icon"} onClick={()=> save_side_route('dashboard')} >
                        <TbSmartHome size={'100%'} />
                    </span>
                    <p className="text-sm side-bar-item-desc ">Dashboard</p>
                </span>

                <span className="side-bar-item">
                    <span className={side_route == "user-management" ? "active-side-bar-item-icon" : "side-bar-item-icon"} onClick={()=> save_side_route('user-management')} >
                        <LiaUserEditSolid size={'100%'} />
                    </span>
                    <p className="text-sm side-bar-item-desc ">User Management</p>
                </span>

            </div>

            <div className="w-full h-[70px]  flex items-center justify-center font-semibold text-white ">
                <span className="side-bar-item">
                    <span className={"side-bar-item-icon"} style={{transform: 'rotate(180deg)'}} onClick={()=> router.push('/auth/login')} >
                        <LuLogOut size={'100%'} />
                    </span>
                    <p className="text-sm side-bar-item-desc ">Logout</p>
                </span>
            </div>

        </div>
    )
}

export default Admin_side_bar