import { createColumnHelper } from '@tanstack/react-table';
import React from 'react'
import DataTable from '../../../Components/DataTables/tanstack/DataTable';
import { Link } from 'react-router-dom';
import { EyeIcon } from 'lucide-react';
import { Button, IconButton } from '@material-tailwind/react';

const Archive = () => {
    const data = [
        {
            section: "Announcements",
            route: '/dashboard/archive/announcements'
        },
        {
            section: "Resources",
            route: '/dashboard/archive/resources'
        }
    ]
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor(row => row.section, {
            id: 'section',
            header: 'Section',
            cell: info => info.getValue(),
        }),

        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                return (
                    <div className="flex gap-2">
                        <Link to={row.original.route}>
                           <IconButton variant="text" className="text-secondary rounded-full"><EyeIcon size={25} /></IconButton>
                        </Link>
                    </div>
                );
            },
        }),
    ];
    return (
        <DataTable data={data} columns={columns} pageSize={10} height="h-[calc(70vh-8rem)]" />
    )
}

export default Archive