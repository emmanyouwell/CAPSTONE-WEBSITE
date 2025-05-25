import React, { useState, useEffect } from 'react'
import { Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Typography } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { PencilIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { EyeIcon, CheckCheck } from 'lucide-react'
import { formatDate, getUser } from '../../../utils/helper'
import { inpatientDispense, outpatientDispense } from '../../../redux/actions/requestActions'
import { toast } from 'react-toastify'
import { createColumnHelper } from '@tanstack/react-table'
import DataTable from '../../../Components/DataTables/tanstack/DataTable'
const StaffRequest = ({ requests }) => {
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor(row => formatDate(row.date), {
            id: 'date',
            header: 'Date',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.patient.name, {
            id: 'name',
            header: 'Patient Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.patient.patientType, {
            id: 'type',
            header: 'Patient Type',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.volumeRequested.volume, {
            id: 'volumeRequested',
            header: 'Requested Volume',
            cell: info => info.getValue()
        }),
        columnHelper.accessor(row => row.volumeRequested.days, {
            id: 'days',
            header: 'Days',
            cell: info => info.getValue()
        }),
        columnHelper.accessor(row => row.doctor, {
            id: 'prescribedBy',
            header: 'Prescribed By',
            cell: info => info.getValue()
        }),
        columnHelper.accessor(row => row.status, {
            id: 'status',
            header: 'Status',
            cell: info => info.getValue()
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const request = row.original
                return (
                    <div className="flex gap-2">
                        <Link to={`/dashboard/request/${request._id}`}>
                            <Button className="bg-secondary"><EyeIcon className="h-5 w-5" /></Button>
                        </Link>
                    </div>
                );
            },
        }),
    ];
    return (
        <>

            <div className="w-full h-full">
                <DataTable data={requests} columns={columns} pageSize={10} />
            </div>
        </>
    )
}

export default StaffRequest