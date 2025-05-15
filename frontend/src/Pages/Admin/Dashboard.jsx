import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMilkPerMonth, getDispensedMilkPerMonth, getDonorsPerMonth, getPatientsPerMonth, getRequestsPerMonth, getAvailableMilk, getExpiringMilk } from '../../redux/actions/metricActions'
import { LifebuoyIcon, UserIcon } from '@heroicons/react/24/solid'
import { BriefcaseMedical } from 'lucide-react'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, CardHeader, Typography } from '@material-tailwind/react';

// Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
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

  const months = Object.keys(stats).filter((key) => key !== 'total');
  const communityData = months.map((month) => stats[month].community);
  const privateData = months.map((month) => stats[month].private);

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Community',
        data: communityData,
        backgroundColor: '#336699'
      },
      {
        label: 'Private',
        data: privateData,
        backgroundColor: '#F06395'
      }
    ]
  };

  // Optional config
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label}: ${value.toLocaleString()} ml`;
          }
        }
      }
    }
  };
  const months2 = Object.keys(monthlyDonors).filter((key) => key !== 'total');
  const communityData2 = months2.map((month) => monthlyDonors[month].community);
  const privateData2 = months2.map((month) => monthlyDonors[month].private);
  const data2 = {
    labels: months,
    datasets: [
      {
        label: 'Community',
        data: communityData2,
        backgroundColor: '#336699'
      },
      {
        label: 'Private',
        data: privateData2,
        backgroundColor: '#F06395'
      }
    ]
  };

  // Optional config
  const options2 = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label}: ${value.toLocaleString()}`;
          }
        }
      }
    }
  };
  const months3 = Object.keys(monthlyPatients).filter((key) => key !== 'total');
  const inpatientData = months3.map((month) => monthlyPatients[month].inpatient);
  const outpatientData = months3.map((month) => monthlyPatients[month].outpatient);
  const data3 = {
    labels: months,
    datasets: [
      {
        label: 'Inpatient',
        data: inpatientData,
        backgroundColor: '#336699'
      },
      {
        label: 'Outpatient',
        data: outpatientData,
        backgroundColor: '#F06395'
      }
    ]
  };

  // Optional config
  const options3 = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label}: ${value.toLocaleString()}`;
          }
        }
      }
    }
  };

  const months4 = Object.keys(dispensedMilk).filter((key) => key !== 'total');
  const inpatientData2 = months4.map((month) => dispensedMilk[month].inpatient);
  const outpatientData2 = months4.map((month) => dispensedMilk[month].outpatient);
  const data4 = {
    labels: months,
    datasets: [
      {
        label: 'Inpatient',
        data: inpatientData2,
        backgroundColor: '#336699'
      },
      {
        label: 'Outpatient',
        data: outpatientData2,
        backgroundColor: '#F06395'
      }
    ]
  };

  // Optional config
  const options4 = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label}: ${value.toLocaleString()} ml`;
          }
        }
      }
    }
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

                <span className="text-4xl font-parkinsansfont-medium text-gray-900"> {monthlyPatients?.total?.total ? monthlyPatients?.total?.total.toLocaleString() : '0'} </span>

                <span className="text-lg text-gray-500"><UserIcon className="text-secondary w-8 h-8" /> </span>

              </div>
            </div>
            <div className="flex justify-between items-center gap-4 rounded-lg border border-secondary bg-white p-6">
              <span className="text-2xl font-parkinsans font-medium text-gray-900">Total Requests</span>
              <div className="flex items-center gap-2">

                <span className="text-4xl font-parkinsansfont-medium text-gray-900"> {monthlyRequests?.total?.total ? monthlyRequests?.total?.total.toLocaleString() : '0'} </span>

                <span className="text-lg text-gray-500"><LifebuoyIcon className="text-secondary w-8 h-8" /> </span>

              </div>
            </div>
          </div>



          <Card className="p-4 border shadow-lg">
            <CardHeader shadow={false} floated={false}>
              <Typography variant="h5" color="blue-gray">Milk Collected Per Month</Typography>
            </CardHeader>
            <Bar data={data} options={options} />
          </Card>
          <Card className="p-4 border shadow-lg">
            <CardHeader shadow={false} floated={false}>
              <Typography variant="h5" color="blue-gray">Donors Per Month</Typography>
            </CardHeader>
            <Bar data={data2} options={options2} />
          </Card>
          <Card className="p-4 border shadow-lg">
            <CardHeader shadow={false} floated={false}>
              <Typography variant="h5" color="blue-gray">Patients Per Month</Typography>
            </CardHeader>
            <Bar data={data3} options={options3} />
          </Card>
          <Card className="p-4 border shadow-lg">
            <CardHeader shadow={false} floated={false}>
              <Typography variant="h5" color="blue-gray">Dispensed Milk Per Month</Typography>
            </CardHeader>
            <Bar data={data4} options={options4} />
          </Card>
        </div>
      </div>
    </>
  )
}

export default Dashboard