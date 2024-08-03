
'use client'
import React, {useState, useEffect} from 'react'
import Admin_dashboard from '../pages/admin_dashboard'

import { useRouter } from 'next/navigation'

const Dashboard = () => {
    const router = useRouter()
    const [userRole, setUserRole] = useState('admin')

    useEffect(() => {
        const user_role = localStorage.getItem('user_role')
        if (!user_role || user_role == null || !['ADMIN', 'CLIENT', 'CLIENT_MANAGER', 'TEAM_MEMBER', 'AFFILIATE'].includes(user_role) ){
            router.push('/auth/login')
        }else{
            setUserRole(user_role)
        }
    }, [])

    return (
        <div className="">
            {userRole === 'ADMIN' && <Admin_dashboard />  }

        </div>
    )
}

export default Dashboard