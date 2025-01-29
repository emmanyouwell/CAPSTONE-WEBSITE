import { Button, Typography } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react'
import donorRecords from '../../assets/image/donor-records.png'
import recipientRecords from '../../assets/image/recipient-records.png'
import schedules from '../../assets/image/calendar.png'
import inventories from '../../assets/image/inventory-and-metrics.png'
import accountManagement from '../../assets/image/account-management.png'
import announcements from '../../assets/image/announcement-creation.png'
import resources from '../../assets/image/resources-management.png'
import metrics from '../../assets/image/metrics.png'
const superAdminItems = [
    { id: '1', title: 'Donor Records', route: 'superadmin_donor_record', image:donorRecords },
    { id: '2', title: 'Recipient Records', route: 'superadmin_recipient_record', image: recipientRecords },
    { id: '3', title: 'Schedules', route: 'superadmin_schedules', image: schedules },
    { id: '4', title: 'Inventory', route: 'superadmin_inventories', image: inventories },
    { id: '5', title: 'Account Management', route: 'superadmin_account_management', image: accountManagement },
    { id: '6', title: 'Announcement Creation', image: announcements },
    { id: '7', title: 'Resources Management', route: 'superadmin_articles', image: resources },
    { id: '8', title: 'Metrics', route: 'superadmin_metrics', image: metrics },
];


const MenuGrid = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(superAdminItems);
    }, []);
    return (
        <div className="grid grid-cols-4 gap-4">
            {data && data.map((items) => (
                <div className="w-[152px] h-[146px] bg-secondary p-2.5 rounded-[20px] m-1.25 flex flex-col items-center justify-center flex-1">
                    <img src={items.image} alt="" className="h-[50px] w-[50px] object-contain mb-1.25" />
                    <Typography variant="lead" color="white" className="text-center font-sofia">{items.title}</Typography>
                </div>
            ))}
        </div>
    )
}

export default MenuGrid