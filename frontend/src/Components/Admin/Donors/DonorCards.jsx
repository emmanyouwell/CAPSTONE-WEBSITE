import { Button } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'
const DonorCards = ({ donor }) => {
    return (

        <div
            className="profile-card w-[300px] border border-secondary rounded-md overflow-hidden  relative cursor-pointer snap-start shrink-0 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group p-8"
        >

            <div className="headings *:text-center *:leading-4">
                <p className="text-xl font-varela font-semibold text-[#434955] mb-1">{`${donor.user.name.first} ${donor.user.name.last}`}</p>
                <p className="text-sm font-varela font-semibold text-[#434955]">{donor.donorType}</p>
            </div>
            <div className="w-full items-center justify-center flex">
                <ul
                    className="flex flex-col items-start gap-2 has-[:last]:border-b-0 *:inline-flex *:gap-2 *:items-center *:justify-center *:border-b-[1.5px] *:border-b-stone-700 *:border-dotted *:text-xs *:font-semibold *:text-[#434955] pb-3"
                >
                    <li>
                        <svg
                            id="phone"
                            viewBox="0 0 24 24"
                            className="fill-stone-700 group-hover:fill-secondary"
                            height="15"
                            width="15"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0 0h24v24H0V0z" fill="none"></path>
                            <path
                                d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"
                            ></path>
                        </svg>
                        <p>{donor.user.phone}</p>
                    </li>

                    <li>
                        <svg
                            id="map"
                            viewBox="0 0 16 16"
                            className="fill-stone-700 group-hover:fill-secondary"
                            height="15"
                            width="15"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 0C5.2 0 3 2.2 3 5s4 11 5 11 5-8.2 5-11-2.2-5-5-5zm0 8C6.3 8 5 6.7 5 5s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"
                                fill="#444"
                            ></path>
                        </svg>
                        <p>{`${donor.home_address.street}, ${donor.home_address.brgy}, ${donor.home_address.city}`}</p>
                    </li>
                    <li>Donations: </li>
                </ul>
            </div>
            <Link to={`/admin/donors/${donor._id}`} className="w-full"><Button className="w-full bg-secondary group-hover:transition-all group-hover:duration-300 transition-all duration-300">See information</Button></Link>
            

        </div>

    )
}

export default DonorCards