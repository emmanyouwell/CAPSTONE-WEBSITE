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
    <tr>
        <td>{event.title}<br></br>- {event.description} </td>

    </tr>
);
const CustomEvent = ({ event }) => {
    return (
        <div className="bg-secondary border-lg">

            <p>{event.title}</p>
        </div>
    )
}
const ScheduleComponent = ({ events }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [items, setItems] = useState([]);

    const handleOpen = async (event) => {
        navigate(`/admin/events/${event.id}`);

    };
    useEffect(() => {
        const result = events.map((event) => { return { title: event.title, description: event.description, start: new Date(event.eventDetails.start), end: new Date(event.eventDetails.end), id: event._id, status: event.eventStatus} });
        setItems(result);
    }, [events])

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
                    onSelectEvent={event => { handleOpen(event) }}
                    eventPropGetter={(event) => {
                        console.log("Event Data:", event); // Debugging: Check event properties

                        let backgroundColor = 'blue'; // Default color

                        // Ensure event has a status property
                        if (event.status) {
                            if (event.status === 'Not-Due') backgroundColor = '#7A7A7A';
                            else if (event.status === 'On-Going') backgroundColor = '#E53777';
                            else if (event.status === 'Done') backgroundColor = '#4CAF50';
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