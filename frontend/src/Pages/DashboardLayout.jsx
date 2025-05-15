import React, { useState, useEffect } from 'react'
import SidebarComponent from '../Components/Admin/SidebarComponent'
import { ComplexNavbar } from '../Components/Admin/AdminNavbar'
import { Outlet, useLocation } from 'react-router-dom'
import { getUser } from '../utils/helper'
import TemplateScriptsLoader from '../Components/TemplateScriptsLoader'

const DashboardLayout = () => {
    const location = useLocation()
    const [userDetails, setUserDetails] = useState({});
    useEffect(() => {
        if (getUser()) {
            setUserDetails({
                name: `${getUser().name.first} ${getUser().name.last}`,
                email: getUser().email,
                role: getUser().role,
            })
        }
    }, [location.pathname])
    const [isNavOpen, setIsNavOpen] = useState(false)
    return (
        <>
            {/* <TemplateScriptsLoader/> */}
            <div className="flex w-[100%] flex-1 items-stretch ">
                <div className="min-h-[calc(100vh-2rem)] w-[100%] flex items-stretch">
                    <SidebarComponent userDetails={userDetails} />
                    <div className="flex flex-1 items-stretch basis-[100%] flex-col p-0">
                        <ComplexNavbar setIsNavOpen={setIsNavOpen} />
                        <div className="flex flex-1 flex-col items-stretch justify-between ">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout