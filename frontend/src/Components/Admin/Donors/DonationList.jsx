import React from 'react'
import { formatDate } from '../../../utils/helper'
import { Typography } from '@material-tailwind/react'
const DonationList = ({ donations }) => {
    
    return (
        <article className="rounded-xl w-full border border-gray-70 p-4">
            <div className="flex items-center gap-4">
                <Typography color="black" variant="h2">Donation History</Typography>
            </div>

            <ul className="mt-4 space-y-2">
                {donations.map((donation, index) => (
                    <li>
                        <p className="block h-full rounded-lg border border-gray-500 p-4">
                            <strong className="font-medium text-black">Date: {formatDate(donation.invId.unpasteurizedDetails.expressDate)}</strong>
                            <p className="mt-1 text-xs font-medium text-gray-800">Total Volume: {donation.invId.unpasteurizedDetails.volume} mL</p>
                            <p className="mt-1 text-xs font-medium text-gray-800">Bags: {donation.invId.unpasteurizedDetails.quantity} pcs.</p>
                        </p>
                        
                    </li>
                ))}



            </ul>
        </article>
    )
}

export default DonationList