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
                    <div className="bg-white shadow-lg border border-primary-dark p-4 rounded-lg flex flex-col justify-between w-full max-w-sm h-96">
                        <img src={imageUrl} alt="" className="h-40 object-cover rounded-md" />

                        <Typography className="text-primary line-clamp-2 overflow-hidden text-base sm:text-lg md:text-xl mt-2 font-bold">
                            {announcement.title}
                        </Typography>

                        <Typography variant="small" className="italic">
                            Published on {formattedDate}
                        </Typography>

                        <Typography
                            variant="paragraph"
                            className="text-sm my-2 break-words"
                        >
                            {announcement.description}
                        </Typography>

                        <div className="flex justify-end items-center gap-4 mt-auto">
                            <Link to={`/announcements/${announcement._id}`} className="flex items-center gap-2 text-secondary">
                                <EyeIcon size={30} className="text-secondary" />
                                {!isAdminLocation && <span className="font-varela font-bold">View</span>}
                            </Link>
                            {isAdminLocation && (
                                <>
                                    <Link to={`/dashboard/edit-announcement/${announcement._id}`}>
                                        <Pencil size={30} className="text-secondary" />
                                    </Link>
                                    <Trash size={30} className="text-secondary cursor-pointer" onClick={() => handleDelete(announcement._id)} />
                                </>
                            )}
                        </div>
                    </div>

                )
            })}
        </>
    )
}

export default AnnouncementList