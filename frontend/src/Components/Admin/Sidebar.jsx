import { ChevronDownIcon, ChevronFirst, ChevronLast } from 'lucide-react'
import React, { createContext, useContext, useState, Children, isValidElement, cloneElement, useMemo } from 'react'
import logo from '../../assets/image/TCHMB-logo.png'
import { Link } from 'react-router-dom'
import { useIsActive } from '../../utils/helper'
const SidebarContext = createContext()
import PropTypes from 'prop-types'
export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true)
    const value = useMemo(() => ({ expanded }), [expanded])
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

                <SidebarContext.Provider value={value}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

            </nav>
        </aside>
    )
}

export function SidebarItem({ icon, text, path, prefix, alert, children }) {
    const { expanded } = useContext(SidebarContext)
    const isActive = useIsActive(prefix)
    const hasChildren = Children.count(children) > 0;
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const itemContent = (
        <li
            onClick={toggleDropdown}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault(); // Prevent page scroll on Space
                    toggleDropdown();
                }
            }}
            tabIndex={0}
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
                ${isActive ? "bg-gradient-to-tr from-pink-200 to-pink-100 text-pink-800" : "hover:bg-pink-50 text-black"}
            `}
        >
            {icon}
            <span className={`overflow-hidden transition-all whitespace-nowrap ${expanded ? "w-52 ml-3" : "w-0"}`}>
                {text}
            </span>
            {/* Chevron icon */}
            {hasChildren && expanded && (
                <ChevronDownIcon
                    className={`ml-auto transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                    size={16}
                />
            )}
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-pink-400 ${expanded ? "" : "top-2"}`} />
            )}
            {!expanded && (
                <div
                    className={`w-max absolute left-full rounded-md px-2 py-1 ml-6
                    bg-pink-100 text-pink-800 text-sm invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-10`}
                >
                    {text}
                </div>
            )}
        </li>
    )

    return (
        <div>
            {hasChildren ? (
                <div>
                    {itemContent}
                    <ul className={`pl-8 mt-1 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                        {Children.map(children, (child) =>
                            isValidElement(child) ? cloneElement(child, { isNested: true }) : null
                        )}
                    </ul>
                </div>
            ) : (
                <Link to={path}>
                    {itemContent}
                </Link>
            )}
        </div>
    )
}

SidebarItem.propTypes = {
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    prefix: PropTypes.string,
    alert: PropTypes.bool,
    children: PropTypes.node
}
Sidebar.propTypes = {
    children: PropTypes.node.isRequired,
}
