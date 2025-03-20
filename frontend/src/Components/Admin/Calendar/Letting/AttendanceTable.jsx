import { Card } from '@material-tailwind/react'
import React from 'react'

const AttendanceTable = ({attendance, currentPage, totalPages}) => {
    const getTotalVolume = (bags) => {
        return bags.reduce((acc, bag) => acc + bag.volume, 0)
    }
    return (
        <div className="w-full h-full">
            <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th className="border-b p-4">No.</th>
                            <th className="border-b p-4">Last Breast Milk Donation / New Donor</th>
                            <th className="border-b p-4">Total Volume of Breast Milk</th>
                            <th className="border-b p-4">Name</th>
                            <th className="border-b p-4">Complete Address</th>
                            <th className="border-b p-4">Phone</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {attendance && attendance.map((attendees, index) => (
                            <tr key={attendees._id}>
                                <td className="p-4">{index+1}</td>
                                <td className="p-4">{name && name.first}</td>
                                <td className="p-4">{getTotalVolume(attendees.bags)} ml</td>
                                <td className="p-4">{`${attendees.donor.user.name.first} ${attendees.donor.user.name.middle} ${attendees.donor.user.name.last}`}</td>
                                <td className="p-4">{`${attendees.donor.home_address.street} ${attendees.donor.home_address.brgy} ${attendees.donor.home_address.city}`}</td>
                                <td className="p-4">{attendees.donor.user.phone}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            {/* Pagination Controls */}
            <div className="flex justify-center space-x-2 mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default AttendanceTable