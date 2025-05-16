import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMilkPerMonth,getVolumePerLocation, getDispensedMilkPerMonth, getDonorsPerMonth, getPatientsPerMonth, getRequestsPerMonth, getAvailableMilk, getExpiringMilk } from '../../redux/actions/metricActions'
import { LifebuoyIcon, UserIcon } from '@heroicons/react/24/solid'

import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar, Pie } from 'react-chartjs-2';
import { Accordion, AccordionHeader, AccordionBody, Card, CardHeader, Typography } from '@material-tailwind/react';
import { formatNumber } from '../../utils/helper'
import { milkCollectedChartData, milkDonatedPerBarangay, monthlyDispensedMilkChartData, monthlyDonorsChartData, monthlyPatientsChartData } from '../../data/metricsData';

// Register required components
ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);


function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, available, monthlyDonors, volumePerLocation, expiring, dispensedMilk, monthlyPatients, monthlyRequests } = useSelector((state) => state.metrics);

  useEffect(() => {
    dispatch(getMilkPerMonth());
    dispatch(getDispensedMilkPerMonth());
    dispatch(getDonorsPerMonth());
    dispatch(getPatientsPerMonth());
    dispatch(getRequestsPerMonth());
    dispatch(getAvailableMilk());
    dispatch(getExpiringMilk());
    dispatch(getVolumePerLocation());
  }, [dispatch])

  const {data: statsData, options: statsOptions} = milkCollectedChartData(stats);
  const {data: donorData, options: donorOptions} = monthlyDonorsChartData(monthlyDonors);
  const {data: patientData, options: patientOptions} = monthlyPatientsChartData(monthlyPatients);
  const {data: dispensedData, options: dispensedOptions} = monthlyDispensedMilkChartData(dispensedMilk);
  const {data: volumeLocationData, options: volumeLocationOptions} = milkDonatedPerBarangay(volumePerLocation);
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <>
      <div className="h-[calc(100vh-4rem)] overflow-y-auto w-full">
        <div className="min-h-fit grid grid-cols-2 gap-4 w-full p-4">
          <div className="col-span-2 flex justify-between items-center gap-4 rounded-lg border border-secondary bg-white p-6">
            <span className="text-2xl font-parkinsans font-medium text-gray-900">Available Pasteurized Milk</span>
            <div>
              <span className="text-5xl font-parkinsans font-bold text-gray-900">{available ? available.toLocaleString() : '0'}</span>
              <span className="text-lg font-semibold text-secondary"> ml </span>
            </div>
          </div>
          <div className="col-span-2 flex justify-between items-center gap-4 rounded-lg border border-secondary bg-white p-6">
            <span className="text-2xl font-parkinsans font-medium text-gray-900">Total Milk Released</span>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-parkinsansfont-medium text-gray-900"> {dispensedMilk?.total?.total ? dispensedMilk?.total?.total.toLocaleString() : '0'} </span>
              <span className="text-lg font-semibold text-secondary">ml</span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4 rounded-lg border border-secondary bg-white p-6">
            <span className="text-2xl font-parkinsans font-medium text-gray-900">Total Milk Collected</span>
            <div>
              <p>
                <span className="text-4xl font-parkinsans font-medium text-gray-900"> {stats?.total?.total ? stats?.total?.total.toLocaleString() : '0'} </span>

                <span className="text-lg font-semibold text-secondary"> ml </span>
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4 rounded-lg border border-secondary bg-white p-6">
            <span className="text-2xl font-parkinsans font-medium text-gray-900">Pasteurize Soon</span>
            <div>
              <p>
                <span className="text-4xl font-parkinsans font-medium text-gray-900"> {expiring ? expiring.toLocaleString() : '0'} </span>

                <span className="text-lg font-semibold text-secondary"> ml </span>
              </p>
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-3 gap-4">
            <div className="flex justify-between items-center gap-4 rounded-lg border border-secondary bg-white p-6">
              <span className="text-2xl font-parkinsans font-medium text-gray-900">Total Donors</span>
              <div className="flex items-center gap-2">

                <span className="text-4xl font-parkinsans font-medium text-gray-900"> {monthlyDonors?.total?.total ? monthlyDonors?.total?.total.toLocaleString() : '0'} </span>

                <span className="text-lg text-gray-500"><UserIcon className="text-secondary w-8 h-8" /> </span>

              </div>
            </div>
            <div className="flex justify-between items-center gap-4 rounded-lg border border-secondary bg-white p-6">
              <span className="text-2xl font-parkinsans font-medium text-gray-900">Total Recipients</span>
              <div className="flex items-center gap-2">

                <span className="text-4xl font-parkinsans font-medium text-gray-900"> {monthlyPatients?.total?.total ? monthlyPatients?.total?.total.toLocaleString() : '0'} </span>

                <span className="text-lg text-gray-500"><UserIcon className="text-secondary w-8 h-8" /> </span>

              </div>
            </div>
            <div className="flex justify-between items-center gap-4 rounded-lg border border-secondary bg-white p-6">
              <span className="text-2xl font-parkinsans font-medium text-gray-900">Total Requests</span>
              <div className="flex items-center gap-2">

                <span className="text-4xl font-parkinsans font-medium text-gray-900"> {monthlyRequests?.total?.total ? monthlyRequests?.total?.total.toLocaleString() : '0'} </span>

                <span className="text-lg text-gray-500"><LifebuoyIcon className="text-secondary w-8 h-8" /> </span>

              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
            <AccordionHeader onClick={() => handleOpen(1)}>Milk Metrics</AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-2 gap-4 min-h-fit w-full p-4">
                <Card className="p-4 border shadow-lg">
                  <CardHeader shadow={false} floated={false}>
                    <Typography variant="h5" color="blue-gray">Milk Collected Per Month {stats && stats.total ? `(${formatNumber(stats.total.total)} ml)` : '(0 ml)'}</Typography>
                  </CardHeader>
                  <Bar data={statsData} options={statsOptions} />
                </Card>
                <Card className="p-4 border shadow-lg">
                  <CardHeader shadow={false} floated={false}>
                    <Typography variant="h5" color="blue-gray">Dispensed Milk Per Month {dispensedMilk && dispensedMilk.total ? `(${formatNumber(dispensedMilk.total.total)} ml)` : '(0 ml)'}</Typography>
                  </CardHeader>
                  <Bar data={dispensedData} options={dispensedOptions} />
                </Card>
                 <Card className="p-4 border shadow-lg">
                  <CardHeader shadow={false} floated={false}>
                    <Typography variant="h5" color="blue-gray">Collected Milk Per Barangay {volumePerLocation && volumePerLocation.total ? `(${formatNumber(volumePerLocation.total)} ml)` : '(0 ml)'}</Typography>
                  </CardHeader>
                  <Pie data={volumeLocationData} options={volumeLocationOptions}/>
                </Card>
              </div>
            </AccordionBody>
          </Accordion>

          <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
            <AccordionHeader onClick={() => handleOpen(2)}>Donor Metrics</AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-2 gap-4 min-h-fit w-full p-4">
                <Card className="p-4 border shadow-lg">
                  <CardHeader shadow={false} floated={false}>
                    <Typography variant="h5" color="blue-gray">Donors Per Month {monthlyDonors && monthlyDonors.total ? `(${formatNumber(monthlyDonors.total?.total)})` : '(0)'}</Typography>
                  </CardHeader>
                  <Bar data={donorData} options={donorOptions} />
                </Card>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
            <AccordionHeader onClick={() => handleOpen(3)}>Patient Metrics</AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-2 gap-4 min-h-fit w-full p-4">
                <Card className="p-4 border shadow-lg">
                  <CardHeader shadow={false} floated={false}>
                    <Typography variant="h5" color="blue-gray">Patients Per Month {monthlyPatients && monthlyPatients.total ? `(${formatNumber(monthlyPatients.total.total)})` : '(0)'}</Typography>
                  </CardHeader>
                  <Bar data={patientData} options={patientOptions} />
                </Card>
              </div>
            </AccordionBody>
          </Accordion>


        </div>
      </div>
    </>
  )
}

export default Dashboard