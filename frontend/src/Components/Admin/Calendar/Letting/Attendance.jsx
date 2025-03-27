import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'
import { finalizeSession, getLettingDetails } from '../../../../redux/actions/lettingActions';
import AttendanceTable from './AttendanceTable';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getUser } from '../../../../utils/helper';
import { Alert, Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, select, Select, Textarea, Typography } from '@material-tailwind/react';
import { ArrowLongLeftIcon, XMarkIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { recordPublicRecord } from '../../../../redux/actions/collectionActions';
import { toast } from 'react-toastify';
import { getUserDetails } from '../../../../redux/actions/userActions';
import { getFridges } from '../../../../redux/actions/fridgeActions';
import { addInventory } from '../../../../redux/actions/inventoryActions';

const Attendance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { lettingDetails, loading, error, success } = useSelector((state) => state.lettings);
  const { fridges } = useSelector((state) => state.fridges);
  const { userDetails } = useSelector((state) => state.users);
  const from = location.state?.from;
  const collectionId = location.state?.collectionId;
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const handleOpen = () => setOpen(!open);
  const handleChange = (e) => {
    setSelectedOption(e.target.value)
  }
  const openForm = () => {
    localStorage.setItem('redirectUrl', window.location.href);
    navigate('/new-donor-form')
  }

  useEffect(() => {
    console.log('dispatching getlettingdetails')
    dispatch(getLettingDetails(id));
    dispatch(getUserDetails());
    dispatch(getFridges());
  }, [dispatch, id])
  const unpasteurizedFridges = fridges ? fridges.filter((f) => f.fridgeType === 'Unpasteurized') : [];
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
  const submitFridge = () => {
    if (!selectedOption) {
      toast.error("Please select a fridge", { position: "bottom-right" });
      setOpen(false);
      return;
    }
    console.log('selected option: ', selectedOption)
    const data ={
      fridgeId: selectedOption,
      unpasteurizedDetails: {collectionId},
      userId: userDetails._id
    }
    dispatch(addInventory(data)).then(()=>{
      toast.success("Collection stored successfully", { position: "bottom-right" });
      setOpen(false);
    }).catch((error)=>{
      toast.error("Failed to store collection. Please try again.", { position: "bottom-right" });
      console.error(error);
      setOpen(false)
    })
    
  }
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
          </>) : <> {from === "RedirectDetails" ? <Link to={`/admin/collections`}>
            <div className="mb-4 h-10 w-max bg-gray-200 rounded-lg p-4 flex justify-start items-center text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer">
              <ArrowLongLeftIcon className="h-8 w-8" /> <span className="font-semibold text-md ml-2">Back</span>
            </div>
          </Link> : <Link to={`/admin/event/history`}>
            <div className="mb-4 h-10 w-max bg-gray-200 rounded-lg p-4 flex justify-start items-center text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer">
              <ArrowLongLeftIcon className="h-8 w-8" /> <span className="font-semibold text-md ml-2">Back</span>
            </div>
          </Link>}

            <div className="flex justify-center items-center gap-4">
              <Typography variant="h2">Total volume: {lettingDetails.totalVolume} ml</Typography>
              <HandThumbUpIcon onClick={handleOpen} className="h-10 w-10 font-semibold hover:text-green-500 hover:cursor-pointer" />
            </div>
            <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
              <DialogHeader className="relative m-0 block">
                <Typography variant="h4" color="blue-gray">
                  Choose Refrigerator
                </Typography>
                <Typography className="mt-1 font-normal text-gray-600">
                  Please select the fridge you would like to store the milk in.
                </Typography>
                <IconButton
                  size="sm"
                  variant="text"
                  className="!absolute right-3.5 top-3.5"
                  onClick={handleOpen}
                >
                  <XMarkIcon className="h-4 w-4 stroke-2" />
                </IconButton>
              </DialogHeader>
              <DialogBody>
                <div className="space-y-4">

                  {unpasteurizedFridges?.length > 0 && unpasteurizedFridges.map((fridge, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        id={fridge.name}
                        name={fridge.name}
                        value={fridge._id}
                        className="peer hidden"
                        required
                        checked={selectedOption === fridge._id}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor={fridge.name}
                        className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-900 ring-1 ring-transparent peer-checked:border-gray-900 peer-checked:ring-gray-900"
                      >
                        <div className="block">
                          <Typography className="font-semibold">
                            {fridge.name}
                          </Typography>
                          <Typography className="font-normal text-gray-600">
                            {fridge.fridgeType}
                          </Typography>
                        </div>
                      </label>
                    </div>
                  ))}


                </div>
              </DialogBody>
              <DialogFooter>
                <Button className="ml-auto" onClick={submitFridge}>
                  Select
                </Button>
              </DialogFooter>
            </Dialog>

          </>}

        </div>
        {lettingDetails && <AttendanceTable attendance={lettingDetails.attendance} lettingId={lettingDetails._id} />}

      </div>

    </>
  )
}

export default Attendance