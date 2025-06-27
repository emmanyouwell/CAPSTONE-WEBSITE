import React from 'react'
import { IconButton } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { EyeIcon, SquarePenIcon } from 'lucide-react'
import { createColumnHelper } from '@tanstack/react-table'
import DataTable from '../../../../Components/DataTables/tanstack/DataTable'


const UnpastTables = ({ unpasteurizedFridges, handleEdit }) => {



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
                            <IconButton className="text-secondary rounded-full" variant="text"><EyeIcon size={25} /></IconButton>
                        </Link>
                        <IconButton className="text-secondary rounded-full" variant="text" onClick={() => handleEdit(_id)}><SquarePenIcon size={22} /></IconButton>
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