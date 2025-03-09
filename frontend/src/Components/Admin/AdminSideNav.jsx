import React, { useState, useEffect } from 'react'
import { Typography, List, ListItem, ListItemPrefix } from '@material-tailwind/react'
import {
    PresentationChartBarIcon,
    UserCircleIcon,
    CalendarIcon,
    ArchiveBoxIcon,
    UsersIcon,
    MegaphoneIcon,
    NewspaperIcon,
    HeartIcon,
    Bars3Icon
} from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';
import logo from '../../assets/image/TCHMB-logo.png'
const superAdminItems = [
    { id: '1', title: 'Donor Records', route: '/admin/donors', icon: <HeartIcon className="h-5 w-5" /> },
    { id: '2', title: 'Recipient Records', route: '/admin/recipients', icon: <UserCircleIcon className="h-5 w-5" /> },
    { id: '3', title: 'Schedules', route: '/admin/schedules', icon: <CalendarIcon className="h-5 w-5" /> },
    { id: '4', title: 'Inventory', route: 'superadmin_inventories', icon: <ArchiveBoxIcon className="h-5 w-5" /> },
    { id: '5', title: 'Account Management', route: '/admin/account', icon: <UsersIcon className="h-5 w-5" /> },
    { id: '6', title: 'Announcement Creation', route:'/admin/announcement', icon: <MegaphoneIcon className="h-5 w-5" /> },
    { id: '7', title: 'Resources Management', route: '/admin/resources', icon: <NewspaperIcon className="h-5 w-5" /> },
    { id: '8', title: 'Metrics', route: 'superadmin_metrics', icon: <PresentationChartBarIcon className="h-5 w-5" /> },
];
const AdminSideNav = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        setData(superAdminItems);
    }, [])
    return (
        <>
            <div className="absolute left-0 top-0 lg:static z-50 h-[calc(100vh-2rem)] bg-white w-full max-w-[20rem] border py-4">
                <div className="flex flex-col items-center">
                    <Link to="/" className="flex flex-col justify-center items-center" onClick={() => setPageTitle('Dashboard')}>
                    <img src={logo} alt="logo" className="h-24 w-24"/>
                    <Typography variant="h2" className="mb-2 text-primary font-parkinsans">TCHMB PORTAL</Typography></Link>
                    <List className="w-full">
                        {data.map((items) => (
                            <Link to={items.route} key={items.id}>
                                <ListItem className="text-primary">
                                    <ListItemPrefix className="text-primary">
                                        {items.icon && items.icon}

                                    </ListItemPrefix>
                                    {items.title}
                                </ListItem>
                            </Link>
                        ))}

                    </List>
                </div>
            </div>
        </>
    )
}

export default AdminSideNav