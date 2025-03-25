import React, { useState } from 'react'
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
    ClockIcon
} from 'lucide-react'

const superAdminItems = [
    { title: "Donor Records", route: "/admin/donors", icon: <HeartIcon size={20} />, category: "Records" },
    { title: "Recipient Records", route: "/admin/recipients", icon: <UserCircleIcon size={20} />, category: "Records" },

    { title: "Event Schedules", route: "/admin/event/schedules", icon: <CalendarIcon size={20} />, category: "Schedules" },
    { title: "Pick-up Schedules", route: "/admin/pickup/schedules", icon: <ClockIcon size={20} />, category: "Schedules" },

    { title: "Collections", route: "/admin/collections", icon: <Boxes size={20} />, category: "Inventory" },

    { title: "Account Management", route: "/admin/account", icon: <UsersIcon size={20} />, category: "Management" },
    { title: "Announcement Creation", route: "/admin/announcement", icon: <MegaphoneIcon size={20} />, category: "Management" },
    { title: "Resources Management", route: "/admin/resources", icon: <NewspaperIcon size={20} />, category: "Management" },

    { title: "Metrics", route: "/superadmin_metrics", icon: <BarChart3 size={20} />, category: "Analytics" },
];
const SidebarComponent = ({ userDetails }) => {
    const groupedItems = superAdminItems.reduce((acc, item) => {
        acc[item.category] = acc[item.category] || [];
        acc[item.category].push(item);
        return acc;
    }, {});
    return (
        <main>
            <Sidebar userDetails={userDetails}>
                <SidebarItem
                    icon={<LayoutDashboard size={20} />}
                    text="Dashboard"
                    alert
                />
                {Object.entries(groupedItems).map(([category, items], index) => (
                    <div key={category}>
                        {/* {index !== 0 && } */}
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