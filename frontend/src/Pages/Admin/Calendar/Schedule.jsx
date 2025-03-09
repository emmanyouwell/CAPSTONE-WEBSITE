import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../../../redux/actions/eventActions'

import { Typography } from '@material-tailwind/react'
import ScheduleComponent from '../../../Components/Admin/Calendar/Calendar'
import { AddEvent } from '../../../Components/Admin/Calendar/AddEvent'

const Schedule = () => {
    const dispatch = useDispatch();
    const { events, loading, error } = useSelector((state) => state.events);
    useEffect(() => {
        dispatch(getEvents({ upcoming: false }));
    }, [dispatch])

    useEffect(()=>{
        if (events) {
            console.log(events);
        }
    },[events])
    return (
        <div className="w-full p-4">
            <div className="flex items-center gap-4 mb-4">
                <AddEvent />
            </div>

            {events && <ScheduleComponent events={events} />}
            <div className="flex flex-col">
                <Typography variant="h2">Legend</Typography>
                <div className="flex items-center">
                    <div className="w-5 h-5 bg-neutral-dark"></div>
                    <Typography className="ml-2" variant="lead">Not-Due</Typography>
                </div>
                <div className="flex items-center">
                    <div className="w-5 h-5 bg-secondary"></div>
                    <Typography className="ml-2" variant="lead">On-Going</Typography>
                </div>
                <div className="flex items-center">
                    <div className="w-5 h-5 bg-success"></div>
                    <Typography className="ml-2" variant="lead">Done</Typography>
                </div>

            </div>
        </div>

    )
}

export default Schedule