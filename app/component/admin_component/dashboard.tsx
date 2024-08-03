'use client'
import React, {useState, useEffect} from 'react'
import Navigation from './navigation'
import Main_dashboard_area from './main_dashboard_area'


const Dashboard = () => {
    return (
        <div className="w-full flex items-start justify-center h-full bg-slate-900 ">
            <div className="w-full flex flex-col justify-start items-center">
                <Navigation />
                <Main_dashboard_area />
            </div>
        </div>
    )
}

export default Dashboard