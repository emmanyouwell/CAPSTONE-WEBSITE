import React, { useEffect } from 'react'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
const BagDetails = ({ bag }) => {


    return (
        <>
            <div className="relative w-96 p-4 bg-white rounded-lg shadow-md border flex flex-col h-full">
                {/* <div className="pr-4" style={{ position: 'absolute', right: '0' }}>
                    <Menu>
                        <MenuHandler>
                            <EllipsisVerticalIcon className="h-6 w-6 hover:cursor-pointer text-black hover:bg-gray-600/30 rounded-full" />
                        </MenuHandler>
                        <MenuList className="shadow-lg bg-secondary-light text-white min-w-max">
                            <MenuItem>Edit</MenuItem>
                            <MenuItem>Delete</MenuItem>
                        </MenuList>
                    </Menu>
                </div> */}

                <div className="flex items-center justify-center gap-4">
                    <div className="w-full">
                        {/* Title */}
                        <div className="mt-2">
                            <span className="font-parkinsans text-xl break-words whitespace-normal">Date Expressed: </span>
                            <p className="font-parkinsans text-xl break-words whitespace-normal">{new Date(bag.expressDate)
                                .toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true, // Ensures AM/PM format
                                })}</p>
                        </div>
                    </div>
                </div>
                <span className="flex items-center w-full my-4">
                    <span className="h-px flex-1 bg-black"></span>
                </span>
                {/* Description */}
                <div className="flex flex-col flex-grow mt-2">

                    <span className="font-parkinsans text-3xl text-secondary font-bold break-words whitespace-normal">{bag.volume} ml</span>
                </div>
            </div>


        </>
    )
}

export default BagDetails