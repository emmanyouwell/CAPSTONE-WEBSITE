import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';
const localizer = momentLocalizer(moment);
import { useDispatch } from 'react-redux';
import { getEventDetails } from '../../../redux/actions/eventActions';
// Custom agenda component
const CustomAgenda = ({ event }) => (
    <>
        <tr>
            <td>{event.title}<br></br>- {event.description} </td>
        </tr>
        {event.totalVolume &&
            <tr>
                <td>- Total Volume: {event.totalVolume} ml</td>
            </tr>}
        {event.bags &&
            <tr>
                <td>- Total Milk Bags: {event.bags.length} pcs.</td>
            </tr>
        }

    </>
);
const CustomEvent = ({ event }) => {
    return (
        <div className="bg-secondary border-lg">

            <p>{event.title}</p>
        </div>
    )
}
const ScheduleComponent = ({ events, type }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [items, setItems] = useState([]);

    const handleOpen = async (event, type) => {
        if (type === "events") {
            navigate(`/admin/events/${event.id}`);
        }
        else if (type === "pickup") {
            navigate(`/admin/schedules/${event.id}`);
        }
    };
    useEffect(() => {
        if (type === "events") {
            const result = events.map((event) => { return { title: event.title, description: event.description, start: new Date(event.eventDetails.start), end: new Date(event.eventDetails.end), id: event._id, status: event.eventStatus } });
            setItems(result);
        }
        else if (type === "pickup") {
            const result = events.map((event) => { return { start: new Date(event.dates), end: new Date(event.dates), title: `${event.donorDetails.donorId.user.name.first} ${event.donorDetails.donorId.user.name.middle} ${event.donorDetails.donorId.user.name.last}`, id: event._id, description: event.address, donorDetails: { name: `${event.donorDetails.donorId.user.name.first} ${event.donorDetails.donorId.user.name.middle.last} ${event.donorDetails.donorId.user.name.last}`, email: event.donorDetails.donorId.user.email, phone: event.donorDetails.donorId.user.phone }, totalVolume: event.totalVolume, status: event.status, bags: event.donorDetails.bags } });
            setItems(result);
        }

    }, [events, type])

    useEffect(() => {
        console.log(items);
    }, [items]);


    return (
        <>

            <div style={{ height: 500 }} className="mb-8">
                <Calendar
                    localizer={localizer}
                    events={items}
                    startAccessor="start"
                    endAccessor="end"
                    views={['month', 'agenda']}
                    defaultView="month"
                    components={
                        {
                            agenda: {
                                event: CustomAgenda
                            }
                        }
                    }
                    onSelectEvent={event => { handleOpen(event, type) }}
                    eventPropGetter={(event) => {
                        console.log("Event Data:", event); // Debugging: Check event properties

                        let backgroundColor = 'blue'; // Default color

                        // Ensure event has a status property
                        if (event.status) {
                            if (type === "events") {
                                if (event.status === 'Not-Due') backgroundColor = '#7A7A7A';
                                else if (event.status === 'On-Going') backgroundColor = '#E53777';
                                else if (event.status === 'Done') backgroundColor = '#4CAF50';
                            }
                            else if (type === "pickup") {
                                if (event.status === 'Pending') backgroundColor = '#7A7A7A';
                                else if (event.status === 'Approved') backgroundColor = '#E53777';
                                else if (event.status === 'Completed') backgroundColor = '#4CAF50';
                            }
                        }
                        return {
                            style: {
                                backgroundColor,
                                color: 'white', // Text color
                                borderRadius: '5px',
                                padding: '5px',
                            },
                        };
                    }}
                />
            </div>

        </>
    )
}

export default ScheduleComponent