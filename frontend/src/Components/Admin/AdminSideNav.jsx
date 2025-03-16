import React, { useState, useEffect } from 'react'
import {
    Typography, List, ListItem, ListItemPrefix, Accordion,
    AccordionHeader,
    AccordionBody,
} from '@material-tailwind/react'
import {
    ChevronDownIcon,
    PresentationChartBarIcon,
    UserCircleIcon,
    CalendarIcon,
    ArchiveBoxIcon,
    UsersIcon,
    MegaphoneIcon,
    NewspaperIcon,
    HeartIcon,
    Bars3Icon,
    Squares2X2Icon,
    ChevronRightIcon
} from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';
import logo from '../../assets/image/TCHMB-logo.png'
const superAdminItems = [
    { id: '1', title: 'Donor Records', route: '/admin/donors', icon: <HeartIcon className="h-5 w-5" /> },
    { id: '2', title: 'Recipient Records', route: '/admin/recipients', icon: <UserCircleIcon className="h-5 w-5" /> },
    { id: '3', title: 'Schedules', route: '/admin/schedules', icon: <CalendarIcon className="h-5 w-5" /> },
    { id: '4', title: 'Inventory', route: '/admin/inventory', icon: <ArchiveBoxIcon className="h-5 w-5" /> },
    { id: '5', title: 'Account Management', route: '/admin/account', icon: <UsersIcon className="h-5 w-5" /> },
    { id: '6', title: 'Announcement Creation', route: '/admin/announcement', icon: <MegaphoneIcon className="h-5 w-5" /> },
    { id: '7', title: 'Resources Management', route: '/admin/resources', icon: <NewspaperIcon className="h-5 w-5" /> },
    { id: '8', title: 'Metrics', route: 'superadmin_metrics', icon: <PresentationChartBarIcon className="h-5 w-5" /> },
];
const AdminSideNav = () => {
    const [data, setData] = useState([])
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    useEffect(() => {
        setData(superAdminItems);
    }, [])
    return (
        <>
            <div className="absolute left-0 top-0 lg:static z-50 h-[calc(100vh-2rem)] bg-white w-full max-w-[20rem] border py-4">
                <div className="flex flex-col items-center">
                    <Link to="/" className="flex flex-col justify-center items-center" onClick={() => setPageTitle('Dashboard')}>
                        <img src={logo} alt="logo" className="h-24 w-24" />
                        <Typography variant="h2" className="mb-2 text-primary font-parkinsans">TCHMB PORTAL</Typography></Link>
                    <List className="w-full">
                        {data.map((items) => (
                            <>{items.title === 'Inventory' ? <Accordion
                                open={open === 1}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                                    />
                                }
                                key={items.id}
                            >
                                <ListItem className="p-0 text-primary" selected={open === 1}>
                                    <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                                        <ListItemPrefix className="text-primary">
                                            {items.icon}
                                        </ListItemPrefix>
                                        <Typography className="text-primary mr-auto font-normal">
                                            {items.title}
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="py-1">
                                    <List className="p-0">
                                        <Link to="/admin/inventory/refrigerator">
                                            <ListItem>

                                                <ListItemPrefix>
                                                    <Squares2X2Icon strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                Refrigerator Inventory
                                            </ListItem>
                                        </Link>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <Squares2X2Icon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            Equipment Inventory
                                        </ListItem>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <Squares2X2Icon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            Milk Letting Inventory
                                        </ListItem>
                                    </List>
                                </AccordionBody>
                            </Accordion> : items.title === 'Schedules' ? <>
                                <Accordion
                                    open={open === 2}
                                    icon={
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                                        />
                                    }
                                    key={items.id}
                                >
                                    <ListItem className="p-0 text-primary" selected={open === 2}>
                                        <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                                            <ListItemPrefix className="text-primary">
                                                {items.icon}
                                            </ListItemPrefix>
                                            <Typography className="text-primary mr-auto font-normal">
                                                {items.title}
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>
                                    <AccordionBody className="py-1">
                                        <List className="p-0">
                                            <Link to="/admin/pickup/schedules">
                                                <ListItem>

                                                    <ListItemPrefix>
                                                        <Squares2X2Icon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Pick-up Schedules
                                                </ListItem>
                                            </Link>
                                            <Link to="/admin/event/schedules">
                                                <ListItem>
                                                    <ListItemPrefix>
                                                        <Squares2X2Icon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Event Schedules
                                                </ListItem>
                                            </Link>
                                        </List>
                                    </AccordionBody>
                                </Accordion></> : <Link to={items.route} key={items.id}>
                                <ListItem className="text-primary">
                                    <ListItemPrefix className="text-primary">
                                        {items.icon && items.icon}

                                    </ListItemPrefix>
                                    {items.title}
                                </ListItem>
                            </Link>}</>
                        ))}

                    </List>
                </div>
            </div>
        </>
    )
}

export default AdminSideNav