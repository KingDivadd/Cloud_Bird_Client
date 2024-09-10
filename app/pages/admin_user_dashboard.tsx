'use client'
import React, {useState, useEffect} from 'react'

import Dashboard from "../component/admin_user_component/dashboard"
import User_management from "../component/admin_user_component/user_management"
import Profile_management from "../component/business_user_component/profile_management"
import Route_navigation from '../component/route_navigation'
import App_navigation from '../component/app_navigation'
import Welcome_navigation from '../component/welcome_navigation'



const Admin_User_dashboard = () => {
    const [side_route, setSide_route] = useState('')
    const [nav, setNav] = useState('')

    useEffect(() => {
        console.log(nav)
    }, [nav])

    return (
        <div className="bg-slate-700 flex items-start justify-center w-full min-h-[100vh] overflow-y-auto ">
            <div className="flex flex-col items-start justify-between h-full w-full ">
                {/* <div className="hidden sm:block h-full w-[70px] flex items-start justify-center  ">
                    <Side_bar side_route={side_route} setSide_route={setSide_route} />
                </div> */}

                    <App_navigation />
                    <Welcome_navigation />
                    <Route_navigation nav={nav} setNav={setNav} />

                    {nav === "dashboard" && <Dashboard />}
                    {nav === "profile-management" && <Profile_management />}
                    {nav === "user-management" && <User_management />}

            </div>
        </div>
    )
}

export default Admin_User_dashboard