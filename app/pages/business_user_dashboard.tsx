'use client'
import React, {useState, useEffect} from 'react'

import Dashboard from "../component/business_user_component/dashboard"

import Route_navigation from '../component/route_navigation'
import App_navigation from '../component/app_navigation'
import Welcome_navigation from '../component/welcome_navigation'


const Business_User_dashboard = () => {
    const [side_route, setSide_route] = useState('')
    const [nav, setNav] = useState('')

    useEffect(() => {
        console.log(nav)
    }, [nav])

    return (
        <div className="bg-slate-700 flex items-start justify-center w-full min-h-[100vh] overflow-y-auto ">
            <div className="flex flex-col items-start justify-between h-full w-full ">
                    <App_navigation />
                    <Welcome_navigation />
                    <Route_navigation nav={nav} setNav={setNav} />

                    {nav === "dashboard" && <Dashboard />}

            </div>
        </div>
    )
}

export default Business_User_dashboard