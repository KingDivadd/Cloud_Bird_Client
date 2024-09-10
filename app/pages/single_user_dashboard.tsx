'use client'
import React, {useState, useEffect} from 'react'

import Dashboard from "../component/single_user_component/dashboard"
import User_manag from "../component/single_user_component/user_manag"

import Route_navigation from '../component/route_navigation'
import App_navigation from '../component/app_navigation'
import Welcome_navigation from '../component/welcome_navigation'


const Single_User_dashboard = () => {
    const [side_route, setSide_route] = useState('')
    const [nav, setNav] = useState('')


    return (
        <div className="bg-slate-700 flex items-start justify-center w-full min-h-[100vh] overflow-y-auto ">
            <div className="flex flex-col items-start justify-between h-full w-full ">
                    <App_navigation />
                    <Welcome_navigation />
                    <Route_navigation nav={nav} setNav={setNav} />

                    {nav === "dashboard" && <Dashboard />}
                    {nav === "user-manag" && <User_manag />}

            </div>
        </div>
    )
}

export default Single_User_dashboard