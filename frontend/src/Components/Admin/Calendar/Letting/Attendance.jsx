import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getLettingDetails } from '../../../../redux/actions/lettingActions';
import AttendanceTable from './AttendanceTable';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getUser } from '../../../../utils/helper';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, Select, Textarea, Typography } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
const Attendance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { lettingDetails, loading, error, success } = useSelector((state) => state.lettings);


  const openForm = () => {
    localStorage.setItem('redirectUrl', window.location.href);
    navigate('/new-donor-form')
  }

  useEffect(() => {
    console.log('dispatching getlettingdetails')
    dispatch(getLettingDetails(id));
  }, [dispatch, id])

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-4 p-4 mt-4 h-full">
        <div className="flex w-full items-center justify-start gap-4">

          <Button className="bg-secondary" size="sm" onClick={openForm}>
            Create New Donor
          </Button>
          <Link to={`/admin/events/attendance/donations/${id}`}>
            <Button className="bg-secondary" size="sm" onClick={openForm}>
              Create New Attendance
            </Button>
          </Link>

        </div>
        {lettingDetails && <AttendanceTable attendance={lettingDetails.attendance} />}

      </div>

    </>
  )
}

export default Attendance