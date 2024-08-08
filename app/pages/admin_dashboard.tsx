'use client'
import React, {useState, useEffect} from 'react'
import Admin_side_bar from '../component/admin_component/admin_side_bar'
import Dashboard, { Alert_and_Notification, Appointment_And_Scheduling, Billing_And_Invoicing, Credit_Analysis, Credit_Report_Management, Dispute_Management, Leads, UserManagement } from '../component/admin_component/container'

const Admin_dashboard = () => {
    const [side_route, setSide_route] = useState('')

    return (
        <div className="bg-slate-700 flex items-start justify-center w-full h-[100vh] ">
            <div className="flex flex-row items-start justify-between h-full w-full">
                <div className="hidden sm:block h-full w-[60px] flex items-start justify-center  ">
                    <Admin_side_bar side_route={side_route} setSide_route={setSide_route} />
                </div>

                <div className="w-full h-full flex flex-col items-center justify-start " >
                    {side_route == 'dashboard' && <Dashboard />}
                    {side_route == 'user-management' && <UserManagement />}
                    {side_route == 'leads' && <Leads />}
                    {side_route == 'credit-report-management' && <Credit_Report_Management />}
                    {side_route == 'credit-analysis' && <Credit_Analysis />}
                    {side_route == 'dispute-management' && <Dispute_Management />}
                    {side_route == 'appointment-scheduling' && <Appointment_And_Scheduling />}
                    {side_route == 'billing-and-invoice' && <Billing_And_Invoicing />}
                    {side_route == 'alerts-and-notification' && <Alert_and_Notification />}

                </div>
            </div>
        </div>
    )
}

export default Admin_dashboard