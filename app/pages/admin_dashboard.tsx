'use client'
import React, {useState, useEffect} from 'react'
import Admin_side_bar from '../component/admin_component/admin_side_bar'
import Dashboard from '../component/admin_component/dashboard'

const Admin_dashboard = () => {
    return (
        <div className="flex items-start justify-center w-full h-[100vh] ">
            <div className="bg-red-500 flex flex-row items-start justify-between h-full w-full">
                <div className="h-full w-[60px] bg-amber-500 flex items-start justify-center  ">
                    <Admin_side_bar />
                </div>

                <div className=" h-full flex flex-col items-center justify-start " style={{width: 'calc( 100vw - 60px )'}}>
                    <Dashboard />
                </div>
            </div>
        </div>
    )
}

export default Admin_dashboard