import React from 'react'
import EventDetails from './EventDetails'
import { Badge, Chip } from '@material-tailwind/react'

const UpcomingEvents = ({ events }) => {
    return (
        <>
            <span className="flex items-center w-full mb-4">
                <span className="pr-2 font-dm text-3xl text-primary">Upcoming Events</span>
                <Chip value={events?.length} color="pink" className="rounded-full mr-4"/>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <div className="flex items-stretch gap-4 w-full overflow-x-auto whitespace-nowrap p-4">
                {events.length > 0 ? events.map((event, index) => (
                    <EventDetails key={index} event={event} />
                )) : <span className="text-gray-500">No upcoming events</span>}
            </div>

        </>
    )
}

export default UpcomingEvents