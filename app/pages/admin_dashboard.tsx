'use client'
import React, {useState, useEffect} from 'react'
import Admin_side_bar from '../component/admin_component/admin_side_bar'
import Dashboard, { UserManagement } from '../component/admin_component/container'

const Admin_dashboard = () => {
    const [side_route, setSide_route] = useState('')

    useEffect(() => {
    console.log(side_route);
    
    }, [side_route])

    return (
        <div className="bg-slate-700 flex items-start justify-center w-full h-[100vh] ">
            <div className="flex flex-row items-start justify-between h-full w-full">
                <div className="hidden sm:block h-full w-[60px] flex items-start justify-center  ">
                    <Admin_side_bar side_route={side_route} setSide_route={setSide_route} />
                </div>

                <div className="w-full h-full flex flex-col items-center justify-start " >
                    {side_route == 'dashboard' && <Dashboard />}
                    {side_route == 'user-management' && <UserManagement />}
                </div>
            </div>
        </div>
    )
}

export default Admin_dashboard