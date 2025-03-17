import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSchedules } from '../../../redux/actions/scheduleActions'

import { Typography } from '@material-tailwind/react'
import ScheduleComponent from '../../../Components/Admin/Calendar/Calendar'
import { AddEvent } from '../../../Components/Admin/Calendar/AddEvent'

const PickUpSchedule = () => {
    const dispatch = useDispatch();
    const { schedules, loading, error } = useSelector((state) => state.schedules);
    useEffect(() => {
        dispatch(getAllSchedules());
    }, [dispatch])

    useEffect(()=>{
        if (schedules) {
            console.log(schedules);
        }
    },[schedules])
    return (
        <div className="w-full p-4">
           

            {schedules && <ScheduleComponent events={schedules} type="pickup" />}
            <div className="flex flex-col">
                <Typography variant="h2">Legend</Typography>
                <div className="flex items-center">
                    <div className="w-5 h-5 bg-[#FFC107]"></div>
                    <Typography className="ml-2" variant="lead">Pending</Typography>
                </div>
                <div className="flex items-center">
                    <div className="w-5 h-5 bg-[#E53777]"></div>
                    <Typography className="ml-2" variant="lead">Approved</Typography>
                </div>
                <div className="flex items-center">
                    <div className="w-5 h-5 bg-[#4CAF50]"></div>
                    <Typography className="ml-2" variant="lead">Completed</Typography>
                </div>

            </div>
        </div>

    )
}

export default PickUpSchedule