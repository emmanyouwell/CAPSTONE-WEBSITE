import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMilkPerMonth, getDispensedMilkPerMonth, getDonorsPerMonth, getPatientsPerMonth, getRequestsPerMonth, getAvailableMilk, getExpiringMilk } from '../../redux/actions/metricActions'


import { UserIcon } from '@heroicons/react/24/solid'

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, available, monthlyDonors, expiring, dispensedMilk, monthlyPatients, monthlyRequests } = useSelector((state) => state.metrics);
  useEffect(() => {
    dispatch(getMilkPerMonth());
    dispatch(getDispensedMilkPerMonth());
    dispatch(getDonorsPerMonth());
    dispatch(getPatientsPerMonth());
    dispatch(getRequestsPerMonth());
    dispatch(getAvailableMilk());
    dispatch(getExpiringMilk());
  }, [dispatch])
  return (
    <>
      <div className="grid grid-cols-2 gap-4 w-full p-4">
        <div className="col-span-2 flex justify-between items-center gap-4 rounded-lg border border-secondary bg-white p-6">
          <span className="text-2xl font-medium text-gray-900">Available Pasteurized Milk</span>
          <div>
            <span className="text-5xl font-medium text-gray-900"> {available} </span>
            <span className="text-lg text-gray-500"> ml </span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4 rounded-lg border border-secondary bg-white p-6">
          <span className="text-2xl font-medium text-gray-900">Total Milk Collected</span>
          <div>
            <p>
              <span className="text-5xl font-medium text-gray-900"> {stats?.total?.total} </span>

              <span className="text-lg text-gray-500"> ml </span>
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4 rounded-lg border border-secondary bg-white p-6">
          <span className="text-2xl font-medium text-gray-900">Pasteurize Soon</span>
          <div>
            <p>
              <span className="text-5xl font-medium text-gray-900"> {expiring} </span>

              <span className="text-lg text-gray-500"> ml </span>
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4 rounded-lg border border-secondary bg-white p-6">
          <span className="text-2xl font-medium text-gray-900">Total Donors</span>
          <div className="flex items-baseline gap-2">

            <span className="text-5xl font-medium text-gray-900"> {monthlyDonors?.total?.total} </span>

            <span className="text-lg text-gray-500"><UserIcon color="black" className="w-8 h-8"/> </span>

          </div>
        </div>
        <div className="flex justify-between items-center gap-4 rounded-lg border border-secondary bg-white p-6">
          <span className="text-2xl font-medium text-gray-900">Total Recipients</span>
          <div className="flex items-baseline gap-2">

            <span className="text-5xl font-medium text-gray-900"> {monthlyPatients?.total?.total} </span>

            <span className="text-lg text-gray-500"><UserIcon color="black" className="w-8 h-8"/> </span>

          </div>
        </div>

      </div>
    </>
  )
}

export default Dashboard