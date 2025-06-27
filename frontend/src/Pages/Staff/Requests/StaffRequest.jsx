import React from 'react'
import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/24/solid'
import { EyeIcon } from 'lucide-react'
import { formatDate } from '../../../utils/helper'
import { deleteRequest } from '../../../redux/actions/requestActions'
import { toast } from 'react-toastify'
import { createColumnHelper } from '@tanstack/react-table'
import DataTable from '../../../Components/DataTables/tanstack/DataTable'
const StaffRequest = ({ setRefresh, requests }) => {
    const handleDelete = (id) => {
        dispatch(deleteRequest(id)).then(() => {
            toast.success("Request deleted successfully", { position: 'bottom-right' });
            setRefresh(true);
        })
    }
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
                        {request.status === "Canceled" ? <div className="flex gap-4 items-center">
                            <Link to={`/dashboard/request/${request._id}`}>
                                <Button className="bg-secondary" size="sm"><EyeIcon className="h-5 w-5" /></Button>
                            </Link>
                            <Button className="bg-secondary" size="sm"><TrashIcon className="h-5 w-5" onClick={() => handleDelete(request._id)} /></Button>
                        </div> :
                            <Link to={`/dashboard/request/${request._id}`}>
                                <Button className="bg-secondary" size="sm"><EyeIcon className="h-5 w-5" /></Button>
                            </Link>}
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