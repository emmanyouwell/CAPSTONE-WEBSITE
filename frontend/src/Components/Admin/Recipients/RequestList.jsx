import React from 'react'
import { formatDate } from '../../../utils/helper'
import { Typography } from '@material-tailwind/react'
const RequestList = ({ requests }) => {
    
    return (
        <article className="rounded-xl w-full border border-gray-70 p-4">
            <div className="flex items-center gap-4">
                <Typography color="black" variant="h2">Request History</Typography>
            </div>

            <ul className="mt-4 space-y-2">
                {requests.map((request, index) => (
                        <li key={index}>
                        <p className="block h-full rounded-lg border border-gray-500 p-4">
                            <strong className="font-medium text-black">Date: {formatDate(request.reqId.date)}</strong>
                            <p className="mt-1 text-xs font-medium text-gray-800">Requested Volume: {request.reqId.volume} mL/day</p>
                            <p className="mt-1 text-xs font-medium text-gray-800">Diagnosis: {request.reqId.diagnosis}</p>
                            <p className="mt-1 text-xs font-medium text-gray-800">Reason for request: {request.reqId.reason}</p>
                            <p className="mt-1 text-xs font-medium text-gray-800">Attending Doctor: {request.reqId.doctor}</p>
                        </p>
                        
                    </li>
                ))}



            </ul>
        </article>
    )
}

export default RequestList