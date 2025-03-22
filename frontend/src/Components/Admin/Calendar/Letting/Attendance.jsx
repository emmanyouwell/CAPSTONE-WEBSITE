import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { finalizeSession, getLettingDetails } from '../../../../redux/actions/lettingActions';
import AttendanceTable from './AttendanceTable';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getUser } from '../../../../utils/helper';
import { Alert, Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, Select, Textarea, Typography } from '@material-tailwind/react';
import { ArrowLongLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { recordPublicRecord } from '../../../../redux/actions/collectionActions';
import { toast } from 'react-toastify';
import { getUserDetails } from '../../../../redux/actions/userActions';
const Attendance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { lettingDetails, loading, error, success } = useSelector((state) => state.lettings);
  const { userDetails } = useSelector((state) => state.users);

  const openForm = () => {
    localStorage.setItem('redirectUrl', window.location.href);
    navigate('/new-donor-form')
  }

  useEffect(() => {
    console.log('dispatching getlettingdetails')
    dispatch(getLettingDetails(id));
    dispatch(getUserDetails());
  }, [dispatch, id])
  const handleSubmit = () => {
    const submit = () => {
      if (!userDetails || !id) {
        toast.error("Error: Missing required fields", { position: "bottom-right" });
        return;
      }

      const finalizeData = {
        adminId: userDetails._id,
        lettingId: id,
      };

      dispatch(finalizeSession(finalizeData))
        .then(() => {
          dispatch(recordPublicRecord({ lettingId: id })).then(() => {
            toast.success(`Milk Letting event has been finalized`, { position: "bottom-right" });
            navigate("/admin/event/schedules");
          });
        })
        .catch((error) => {
          toast.error("Failed to add fridge. Please try again.", { position: "bottom-right" });
          console.error(error);
        });
    };
    toast(
      <div>
        <span>Are you sure?</span>
        <Button
          className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
          onClick={() => submit()}
          size="md"
        >
          Confirm
        </Button>
      </div>,
      {

        style: { borderLeft: "4px solid #3498db" },
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
      }
    );
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-4 p-4 mt-4 h-full">
        <div className="flex w-full items-center justify-between gap-4">
          {lettingDetails && lettingDetails.status !== 'Done' ? (<>
            <div className='flex gap-4'>
              <Button className="bg-secondary" size="sm" onClick={openForm}>
                Create New Donor
              </Button>
              <Link to={`/admin/events/attendance/donations/${id}`}>
                <Button className="bg-secondary" size="sm">
                  Create New Attendance
                </Button>
              </Link>
            </div>

            <div>
              <Button size="sm" color="green" onClick={handleSubmit}>
                Finalize Attendance
              </Button>
            </div>
          </>) : <> <Link to={`/admin/event/history`}>
            <div className="mb-4 h-10 w-max bg-gray-200 rounded-lg p-4 flex justify-start items-center text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer">
              <ArrowLongLeftIcon className="h-8 w-8" /> <span className="font-semibold text-md ml-2">Back</span>
            </div>
          </Link>
          
          <Typography variant="h2">Total volume: {lettingDetails.totalVolume} ml</Typography>
          
          </>}

        </div>
        {lettingDetails && <AttendanceTable attendance={lettingDetails.attendance} />}

      </div>

    </>
  )
}

export default Attendance