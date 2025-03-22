import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLettings } from '../../../../redux/actions/lettingActions'
import { Button, Card } from '@material-tailwind/react';
import { ArrowLongLeftIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const History = () => {
    const dispatch = useDispatch();
    const { lettings } = useSelector((state) => state.lettings);
    useEffect(() => {
        dispatch(getLettings());
    }, [dispatch])

    const filteredLettings = lettings.filter(
        (lets) => lets.status && lets.status === 'Done'
    );
    return (
        <div className='p-8'>
            <Link to={`/admin/event/schedules`}>
                <div className="mb-4 h-10 w-max bg-gray-200 rounded-lg p-4 flex justify-start items-center text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer">
                    <ArrowLongLeftIcon className="h-8 w-8" /> <span className="font-semibold text-md ml-2">Back</span>
                </div>
            </Link>
            <div className="w-1/2 mx-auto flex flex-col justify-center items-center gap-4">
                <div className="font-parkinsans text-2xl text-center">Event History</div>
                {filteredLettings.length > 0 && filteredLettings.map((lets, index) => (
                    <Card className='w-full border-l-8 border-secondary p-4 mx-auto mb-4 flex justify-between items-center flex-row'>
                        <div>
                            <div className="font-parkinsans text-2xl font-bold text-secondary">{lets.activity}</div>
                            <div className="font-parkinsans text-md">Venue: {lets.venue}</div>
                            <div className="font-parkinsans text-md">Status: {lets.status}</div>
                            <div className="font-parkinsans text-md">{` Date: ${new Date(lets.actDetails.start).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}`}</div>
                            <div className="font-parkinsans text-md">{`Time: ${new Date(lets.actDetails.start).toLocaleString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true, // Ensures AM/PM format
                            })} - ${new Date(lets.actDetails.end).toLocaleString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true, // Ensures AM/PM format
                            })}`}</div>

                            <div className="font-parkinsans text-md">Donors: {lets.attendance.length}</div>
                        </div>
                        <Link to={`/admin/events/attendance/${lets._id}`}>
                            <Button className="bg-secondary"><EyeIcon className="h-5 w-5" /></Button>
                        </Link>
                    </Card>))}

            </div>

        </div>
    )
}

export default History