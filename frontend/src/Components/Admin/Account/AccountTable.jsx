import React, { useState, useEffect } from 'react'
import { Card, Typography } from "@material-tailwind/react";
import { createColumnHelper } from '@tanstack/react-table';
import DataTable from '../../DataTables/tanstack/DataTable';


const AccountTable = ({ users, currentPage, totalPages }) => {
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor(row => row.employeeID, {
            id: 'employeeID',
            header: 'Employee ID',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.name.first, {
            id: 'firstName',
            header: 'First Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.name.last, {
            id: 'lastName',
            header: 'Last Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.name.middle, {
            id: 'middleName',
            header: 'Middle Name',
            cell: info => info.getValue()
        }),
        columnHelper.accessor(row => row.phone, {
            id: 'phone',
            header: 'Phone',
            cell: info => info.getValue()
        }),
        columnHelper.accessor(row => row.email, {
            id: 'email',
            header: 'Email',
            cell: info => info.getValue()
        }),
        columnHelper.accessor(row => row.role, {
            id: 'role',
            header: 'Role',
            cell: info => info.getValue()
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const id = row.original._id
                return (
                    <div className="flex gap-2">
                        <a href="#" className="text-blue-500">Edit</a>
                    </div>
                );
            },
        }),
    ];
    return (
        <div className="w-full h-full p-8">
            <DataTable data={users} columns={columns} pageSize={10} />
        </div>
    )
}

export default AccountTable