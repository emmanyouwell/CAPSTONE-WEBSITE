import { ChevronLeftIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { ChevronFirst, ChevronLast, MoreVertical } from 'lucide-react'
import React, { createContext, useContext, useState } from 'react'
import logo from '../../assets/image/TCHMB-logo.png'
import { Link, useLocation } from 'react-router-dom'
import { useIsActive } from '../../utils/helper'
const SidebarContext = createContext()
export default function Sidebar({ children, userDetails }) {
    const [expanded, setExpanded] = useState(true)
    return (
        <aside className="h-[100vh]">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img src={logo} alt="TCHMB Logo" className={`overflow-hidden transition-all ${expanded ? "w-10" : "w-0"}`} />
                    <Link className={`font-parkinsans font-semibold text-secondary text-xl overflow-hidden transition-all whitespace-nowrap ${expanded ? "w-100" : "w-0"}`} to="/">
                        <span>TCHMB Portal</span></Link>
                    <button onClick={() => setExpanded(curr => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

            </nav>
        </aside>
    )
}

export function SidebarItem({ icon, text, path, prefix, alert }) {
    const { expanded } = useContext(SidebarContext)
    const location = useLocation();  // Get current URL
    const isActive = useIsActive(prefix)


    return (
        <Link to={path}>
            <li className={`
            relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${isActive ? "bg-gradient-to-tr from-pink-200 to-pink-100 text-pink-800" : "hover:bg-pink-50 text-gray-600 "}
        `}>
                {icon}
                <span className={`overflow-hidden transition-all whitespace-nowrap ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
                {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-pink-400 ${expanded ? "" : "top-2"}`} />}
                {!expanded && <div className={`w-max absolute left-full rounded-md px-2 py-1 ml-6
                bg-pink-100 text-pink-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-10`}>{text}</div>}
            </li>
        </Link>
    )
}




