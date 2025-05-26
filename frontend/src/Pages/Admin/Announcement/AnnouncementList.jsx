import React, { useState, useEffect } from 'react'
import { Typography, Button } from '@material-tailwind/react';
import { Link, useLocation } from 'react-router-dom';
import placeholder from '../../../assets/image/placeholder-image.webp'
import { EyeIcon, Pencil, Trash } from 'lucide-react';
const AnnouncementList = ({ announcements, IsLargeScreen, handleDelete }) => {

    const location = useLocation();
    const isAdminLocation = location.pathname.includes('dashboard');
    useEffect(() => {
        if (announcements) {
            console.log(announcements);
        }
    }, [announcements])
    return (
        <>
            {announcements.map(announcement => {
                const formattedDate = new Date(announcement.createdAt).toLocaleDateString('en-US', {
                    weekday: 'short', // "Mon"
                    year: 'numeric', // "2025"
                    month: 'short', // "Jan"
                    day: 'numeric', // "21"
                });
                const imageUrl = (announcement?.content) ? announcement.content.match(/<img[^>]+src="([^">]+)"/) ? announcement.content.match(/<img[^>]+src="([^">]+)"/)[1] : placeholder : null;
                // const imageUrl = placeholder;
                return (
                    <div className=" bg-white shadow-lg border border-primary-dark p-4 rounded-lg flex flex-col justify-between w-96">
                        <img src={imageUrl} alt="" className="h-40 object-cover" />
                        <Typography variant={IsLargeScreen ? "h3" : "h4"} className="mt-2 text-primary">
                            {announcement.title}
                        </Typography>
                        <Typography variant="small" className="italic">
                            Published on {formattedDate}
                        </Typography>
                        <Typography variant="paragraph" className='overflow-hidden text-ellipsis line-clamp-2 my-2'>
                            {announcement.description}
                        </Typography>
                        <div className="flex justify-end items-center gap-4">

                            <Link to={`/announcements/${announcement._id}`} className="flex items-center gap-2 text-secondary"><EyeIcon size={30} className="text-secondary btn btn-outline" />{!isAdminLocation && <span className="font-varela font-bold">View</span>}</Link>
                            {isAdminLocation &&
                                (<>
                                    <Link to={`/dashboard/edit-announcement/${announcement._id}`} className=""><Pencil size={30} className="text-secondary" /></Link>
                                    <Trash size={30} className="text-secondary cursor-pointer" onClick={() => handleDelete(article._id)} />
                                </>)}
                        </div>

                    </div>
                )
            })}
        </>
    )
}

export default AnnouncementList