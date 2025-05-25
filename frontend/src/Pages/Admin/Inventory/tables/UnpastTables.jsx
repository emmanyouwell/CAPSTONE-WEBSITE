import React, { useState, useEffect } from 'react'
import { Button, Card } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { getFridges } from '../../../../redux/actions/fridgeActions'
import { Link } from 'react-router-dom'
import { PencilIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { EyeIcon } from 'lucide-react'
import { createColumnHelper } from '@tanstack/react-table'
import { FooterWithLogo } from '../../../../Components/Footer'
import DataTable from '../../../../Components/DataTables/tanstack/DataTable'
const UnpastTables = ({ currentPage, totalPages, unpasteurizedFridges }) => {

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor(row => row.name, {
            id: 'fridgeName',
            header: 'Fridge Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.fridgeType, {
            id: 'fridgeType',
            header: 'Fridge Type',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.totalVolume, {
            id: 'totalVolume',
            header: 'Total Volume',
            cell: info => `${info.getValue()} ml`,
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const _id = row.original._id
                return (
                    <div className="flex gap-2">
                        <Link to={`/dashboard/inventory/fridge/unpasteurized/${_id}`}>
                            <Button className="bg-secondary"><EyeIcon className="h-5 w-5" /></Button>
                        </Link>
                    </div>
                );
            },
        }),
    ];
    return (
        <div className="w-full h-full">
            <DataTable data={unpasteurizedFridges} columns={columns} pageSize={10} />
        </div>
    )
}

export default UnpastTables