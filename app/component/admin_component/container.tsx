'use client'
import React, {useState, useEffect} from 'react'
import Route_navigation from '../route_navigation'
import Main_dashboard_area from './main_dashboard_area'
import User_management from './user_management'
import Leads_page from './leads_page'
import Credit_report_management from './credit_report_management'
import Credit_analysis from './credit_analysis'
import Dispute_managment from './dispute_managment'
import Appointment_and_scheduling from './appointment_and_scheduling'
import Billing_and_invoicing from './billing_and_invoicing'
import Alert_and_notification from './alert_and_notification'



const Dashboard = () => {
    return (
        <div className="w-full flex items-start justify-center h-full bg-slate-900 ">
            <div className="w-full flex flex-col justify-start items-center">
                <Route_navigation />
                <Main_dashboard_area />
            </div>
        </div>
    )
}

export default Dashboard

export const UserManagement = () => {
    return (
        <div className="w-full flex items-start justify-center h-full bg-slate-900 ">
            <div className="w-full flex flex-col justify-start items-center">
                <Route_navigation />
                <User_management />
            </div>
        </div>
    )
}

export const Leads = () => {
    return (
        <div className="w-full flex items-start justify-center h-full bg-slate-900 ">
            <div className="w-full flex flex-col justify-start items-center">
                <Route_navigation />
                <Leads_page />
            </div>
        </div>
    )
}

export const Credit_Report_Management = () => {
    return (
        <div className="w-full flex items-start justify-center h-full bg-slate-900 ">
            <div className="w-full flex flex-col justify-start items-center">
                <Route_navigation />
                <Credit_report_management />
            </div>
        </div>
    )
}

export const Credit_Analysis = () => {
    return (
        <div className="w-full flex items-start justify-center h-full bg-slate-900 ">
            <div className="w-full flex flex-col justify-start items-center">
                <Route_navigation />
                <Credit_analysis />
            </div>
        </div>
    )
}

export const Dispute_Management = () => {
    return (
        <div className="w-full flex items-start justify-center h-full bg-slate-900 ">
            <div className="w-full flex flex-col justify-start items-center">
                <Route_navigation />
                <Dispute_managment />
            </div>
        </div>
    )
}

export const Appointment_And_Scheduling = () => {
    return (
        <div className="w-full flex items-start justify-center h-full bg-slate-900 ">
            <div className="w-full flex flex-col justify-start items-center">
                <Route_navigation />
                <Appointment_and_scheduling />
            </div>
        </div>
    )
}

export const Billing_And_Invoicing = () => {
    return (
        <div className="w-full flex items-start justify-center h-full bg-slate-900 ">
            <div className="w-full flex flex-col justify-start items-center">
                <Route_navigation />
                <Billing_and_invoicing />
            </div>
        </div>
    )
}


export const Alert_and_Notification = () => {
    return (
        <div className="w-full flex items-start justify-center h-full bg-slate-900 ">
            <div className="w-full flex flex-col justify-start items-center">
                <Route_navigation />
                <Alert_and_notification />
            </div>
        </div>
    )
}

