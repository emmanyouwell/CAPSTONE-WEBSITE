import React from 'react'
import AdminSideNav from '../../Components/Admin/AdminSideNav'
import MenuGrid from '../../Components/Admin/MenuGrid'
import StickyNavbar from '../../Components/Navbar'
import { ComplexNavbar } from '../../Components/Admin/AdminNavbar'
import { Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import { BanknotesIcon } from '@heroicons/react/24/solid'


const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-2  gap-4 w-full p-4 bg-blue-500">
        <div className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <span className="text-2xl font-medium text-gray-900">Available Pasteurized Milk</span>
          <div>
            <p>
              <span className="text-2xl font-medium text-gray-900"> $404.32 </span>

              <span className="text-xs text-gray-500"> from $240.94 </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <span className="text-2xl font-medium text-gray-900">Pasteurize Soon</span>
          <div>
            <p>
              <span className="text-2xl font-medium text-gray-900"> $404.32 </span>

              <span className="text-xs text-gray-500"> from $240.94 </span>
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <span className="text-2xl font-medium text-gray-900">Total Donors</span>
          <div>
            <p>
              <span className="text-2xl font-medium text-gray-900"> $404.32 </span>

              <span className="text-xs text-gray-500"> from $240.94 </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <span className="text-2xl font-medium text-gray-900">Total Recipients</span>
          <div>
            <p>
              <span className="text-2xl font-medium text-gray-900"> $404.32 </span>

              <span className="text-xs text-gray-500"> from $240.94 </span>
            </p>
          </div>
        </div>




      </div>
    </>
  )
}

export default Dashboard