import React from 'react'
import EventDetails from './EventDetails'

const UpcomingEvents = ({ events }) => {
    return (
        <>
            <span className="flex items-center w-full mb-4">
                <span className="pr-6 font-dm text-3xl text-primary">Upcoming Events</span>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <div className="flex items-stretch gap-4 w-full overflow-x-auto whitespace-nowrap p-4">
                {events.map((event, index) => (
                    <EventDetails key={index} event={event} />
                ))}
            </div>

        </>
    )
}

export default UpcomingEvents