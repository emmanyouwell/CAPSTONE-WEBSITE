import React, { useState, useEffect } from 'react'
import Sidebar, { SidebarItem } from './Sidebar'
import {
    LifeBuoy,
    Receipt,
    Boxes,
    Package,
    UserCircle,
    BarChart3,
    LayoutDashboard,
    Settings,
    HeartIcon,
    UserCircleIcon,
    CalendarIcon,
    UsersIcon,
    MegaphoneIcon,
    NewspaperIcon,
    ClockIcon,
    Box,
    PackageOpenIcon,
    PlusCircleIcon
} from 'lucide-react'
import { useLocation } from 'react-router-dom';

const superAdminItems = [
    { title: "Donor Records", route: "/dashboard/donors", icon: <HeartIcon size={20} />, category: "Records" },
    { title: "Recipient Records", route: "/dashboard/recipients", icon: <UserCircleIcon size={20} />, category: "Records" },

    { title: "Event Schedules", route: "/dashboard/event/schedules", icon: <CalendarIcon size={20} />, category: "Schedules" },
    { title: "Pick-up Schedules", route: "/dashboard/pickup/schedules", icon: <ClockIcon size={20} />, category: "Schedules" },

    { title: "Collections", route: "/dashboard/collections", icon: <Boxes size={20} />, category: "Inventory" },
    { title: "Refrigerators", route: "/dashboard/inventory/refrigerator", icon: <Box size={20} />, category: "Inventory" },

    { title: "Requests", route: "/dashboard/requests", icon: <PackageOpenIcon size={20} />, category: "Inventory" },

    { title: "Account Management", route: "/dashboard/account", icon: <UsersIcon size={20} />, category: "Management" },
    { title: "Announcement Creation", route: "/dashboard/announcement", icon: <MegaphoneIcon size={20} />, category: "Management" },
    { title: "Resources Management", route: "/dashboard/resources", icon: <NewspaperIcon size={20} />, category: "Management" },


];

const staffItems = [
    { title: "Recipient Records", route: "/dashboard/recipients", icon: <UserCircleIcon size={20} />, category: "Records" },
    { title: "Request", route: "/dashboard/staff/requests", icon: <LifeBuoy size={20} />, category: "Records" },
]
const SidebarComponent = ({ userDetails }) => {


    const sidebarItems =
        userDetails?.role === "Admin" || userDetails?.role === "SuperAdmin"
            ? superAdminItems
            : userDetails?.role === "Staff"
                ? staffItems
                : [];

    const groupedItems = sidebarItems.reduce((acc, item) => {
        if (!item.category) return acc;
        acc[item.category] = acc[item.category] || [];
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <main>
            <Sidebar userDetails={userDetails}>
                {userDetails && (userDetails?.role === "Admin" || userDetails?.role === "SuperAdmin") &&
                    <SidebarItem
                        icon={<LayoutDashboard size={20} />}
                        text="Dashboard"
                        path="/dashboard"
                        alert
                    />
                }

                {Object.entries(groupedItems).map(([category, items], index) => (
                    <div key={category}>

                        <span className="flex items-center">

                            <span className="h-px flex-1 bg-gray-400"></span>

                        </span>
                        {items.map((item) => (
                            <SidebarItem
                                key={item.route}
                                icon={item.icon}
                                text={item.title}
                                path={item.route}
                            />
                        ))}
                    </div>
                ))}

                <span className="flex items-center">

                    <span className="h-px flex-1 bg-gray-400"></span>

                </span>

            </Sidebar>
        </main>
    )
}

export default SidebarComponent