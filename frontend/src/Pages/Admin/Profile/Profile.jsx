import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../../redux/actions/userActions';
import { Chip, Typography } from '@material-tailwind/react';

const Profile = () => {
    const dispatch = useDispatch();
    const { userDetails} = useSelector(state => state.users);
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])
    return (
        <section className="w-full p-4">

            <div className=" w-full h-full p-4">
                <div className="flex flex-col h-max gap-10">
                    <div className="w-full flex flex-col gap-4">
                        <Typography color="black" variant="h1">{userDetails && <div className='flex items-center gap-4'>{userDetails.name.first} {userDetails.name.last} <Chip color="blue-gray" value={userDetails.role}/></div>}</Typography>
                        <div className="flow-root">
                            <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Employee ID</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{userDetails && userDetails.employeeID}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Email</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{userDetails && userDetails.email}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Phone</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{userDetails && userDetails.phone}</dd>
                                </div>

                               
                            </dl>
                        </div>
                    </div>
                   

                </div>


            </div>


        </section>
    )
}

export default Profile