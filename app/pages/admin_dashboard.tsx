'use client'
import React, {useState, useEffect} from 'react'
import Admin_side_bar from '../component/admin_component/admin_side_bar'
import Dashboard from '../component/admin_component/dashboard'

const Admin_dashboard = () => {
    return (
        <div className="flex items-start justify-center w-full h-[100vh] ">
            <div className="bg-red-500 flex flex-row items-start justify-between h-full w-full">
                <div className="hidden sm:block h-full w-[60px] flex items-start justify-center  ">
                    <Admin_side_bar />
                </div>

                <div className=" h-full flex flex-col items-center justify-start " >
                    <Dashboard />
                </div>
            </div>
        </div>
    )
}

export default Admin_dashboard