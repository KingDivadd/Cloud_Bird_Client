'use client'
import React, {useState, useEffect} from 'react'

import Dashboard from "../component/admin_user_component/dashboard"

import Route_navigation from '../component/route_navigation'
import App_navigation from '../component/app_navigation'
import Welcome_navigation from '../component/welcome_navigation'


const Single_User_dashboard = () => {
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

            </div>
        </div>
    )
}

export default Single_User_dashboard