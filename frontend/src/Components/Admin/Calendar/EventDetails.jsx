import React, { useEffect } from 'react'
import grand from '../../../assets/image/grand.png'
import regular from '../../../assets/image/regular.png'
import info from '../../../assets/image/information.png'
import { Chip } from '@material-tailwind/react'
const EventDetails = ({ event }) => {
    const formattedDate = (date) => {
        const options = {
            year: 'numeric', // "2025"
            month: 'short', // "Jan"
            day: 'numeric', // "21"
        };

        const timeOptions = {
            hour: '2-digit', // "08"
            minute: '2-digit', // "30"

            hour12: true, // Use 12-hour format (AM/PM), set to false for 24-hour format
        };

        return `${new Date(date).toLocaleDateString('en-US', options)} ${new Date(date).toLocaleTimeString('en-US', timeOptions)}`;
    };

    return (
        <>
            <div className="w-96 p-4 bg-white rounded-lg shadow-md border flex flex-col h-100">
                <div className="flex items-center justify-center gap-4">
                    <div className="w-full h-auto bg-secondary rounded-lg flex justify-center items-center">
                        {event.eventType === "Grand Milk Letting" ? (
                            <img src={grand} alt="grand milk letting" />
                        ) : event.eventType === "Regular Milk Letting" ? (
                            <img src={regular} alt="regular milk letting" />
                        ) : (
                            <img src={regular} alt="other information" />
                        )}
                    </div>
                    <div className="w-full">
                        {/* Title */}
                        <div className="mt-2">
                            <span className="font-dm text-xl break-words whitespace-normal">{event.activity}</span>
                        </div>

                        {/* Start & End Date Chips */}
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Chip value={`Date: ${formattedDate(event.actDetails.date)}`} className="w-full px-2 py-1 text-xs bg-secondary" />
                            
                        </div>
                    </div>
                </div>



                <span className="flex items-center w-full my-4">

                    <span className="h-px flex-1 bg-black"></span>
                </span>
                {/* Description */}
                <div className="flex flex-col flex-grow mt-2">
                    <span className="font-poppins text-lg break-words whitespace-normal">📍 {event.venue}</span>
                </div>
            </div>


        </>
    )
}

export default EventDetails