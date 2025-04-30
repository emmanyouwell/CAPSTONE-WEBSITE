import React, { useState, useRef, useEffect } from 'react'
import DataTable from 'datatables.net-react'
import DT from 'datatables.net-bs5'
DataTable.use(DT);
const RequestDataTable = () => {
    const tableRef = useRef(null)

    const columns = [
        { title: 'Date', data: 'date' },
        { title: 'Patient Name', data: 'patientName' },
        { title: 'Patient Type', data: 'patientType' },
        { title: 'Requested Volume', data: 'requestedVolume' },
        { title: 'Days', data: 'days' },
        { title: 'Prescribed by', data: 'prescribedBy' },
        { title: 'Status', data: 'status' },
        { title: 'Action', data: null, orderable: false, searchable: false }
    ]
    return (
        <div>
            <DataTable
                ref={tableRef}
                data={[]}
                columns={columns}
                options={{
                    paging: true,
                    searching: true,
                    ordering: true,
                    order: [[0, 'desc']],
                    pageLength: 10,
                    lengthMenu: [5, 10, 25, 50],
                }}
            />

        </div>
    )
}

export default RequestDataTable