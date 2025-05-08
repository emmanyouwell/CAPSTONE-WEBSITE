import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getRequests } from '../../../redux/actions/requestActions';

import StaffRequest from './StaffRequest';
import { Button, Card, CardBody, CardHeader, Dialog, DialogBody, DialogFooter, DialogHeader, Input, ListItem, List, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from '@material-tailwind/react';
import { CheckCheck } from 'lucide-react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { getRecipients } from '../../../redux/actions/recipientActions';
const StaffRequestView = () => {
    const dispatch = useDispatch();
    const { request, loading, error } = useSelector(state => state.requests)
    const { loading: loadingPatients, recipients } = useSelector(state => state.recipients)
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    useEffect(() => {
        dispatch(getRequests())
    }, [dispatch])
    const inpatient = request ? request.filter((r) => r.patient?.patientType === 'Inpatient' && r.status !== "Done") : [];
    const outpatient = request ? request.filter((r) => r.patient?.patientType === 'Outpatient' && r.status !== "Done") : [];

    // const handleSubmit = () => {
    //     const { patient, location, diagnosis, reason, doctor, volume, days } =
    //         formData;
    //     const patientType = outPatient ? 'Outpatient' : 'Inpatient';
    //     if (
    //         !patient ||
    //         !location ||
    //         !diagnosis ||
    //         !reason ||
    //         !doctor ||
    //         !volume ||
    //         !days
    //     ) {
    //         Alert.alert("Error", "Please fill out all fields.");
    //         return;
    //     }

    //     const requestedBy = staff ? staff : userDetails?._id;

    //     const requestData = {
    //         date: moment().format("YYYY-MM-DD"),
    //         patient,
    //         patientType,
    //         location,
    //         diagnosis,
    //         reason,
    //         doctor,
    //         requestedBy,
    //         volumeRequested: { volume: Number(volume), days: Number(days) },
    //         images,
    //     };

    //     dispatch(addRequest(requestData))
    //         .then((res) => {
    //             if (devices) {
    //                 for (const device of devices) {
    //                     if (
    //                         (device.token && device.user.role === "Admin") ||
    //                         device.user.role === "SuperAdmin"
    //                     ) {
    //                         const notifData = {
    //                             token: device.token,
    //                             title: "New Request for Milk",
    //                             body: `A nurse issued a new request for milk with the volume of ${res.payload.request.volumeRequested.volume} mL per day for ${res.payload.request.volumeRequested.days} days. Open TCHMB Portal App to see more details`,
    //                         };
    //                         dispatch(sendNotification(notifData))
    //                             .then((response) => {
    //                                 console.log(
    //                                     "Notification Status: ",
    //                                     response.payload.data.status
    //                                 );
    //                             })
    //                             .catch((error) => {
    //                                 console.error("Error sending notification:", error);
    //                                 Alert.alert("Error", "Sending Notification");
    //                             });
    //                     }
    //                 }
    //             }
    //             Alert.alert("Success", "Request added successfully!");
    //             navigation.navigate("superadmin_dashboard");
    //         })
    //         .catch((error) => {
    //             console.error("Error adding request:", error);
    //             Alert.alert("Error", "Failed to add request.");
    //         });
    // };


    const handleSelect = (patient) => {
        setSelectedPatient(patient); // Update state with selected donor

    };
    const handleTextChange = (e) => {
        setSearch(e.target.value);
        setSelectedPatient(null)
        dispatch(getRecipients({ search: e.target.value, page: 1, pageSize: 100 }))
    }

    const searchPatient = () => {
        dispatch(getRecipients({ search: search, page: 1, pageSize: 100 }))
    }

    const handleOpen = () => setOpen((cur) => !cur);
    return (
        <>
            <div className="p-8">
                <div className="flex items-center justify-end mb-4">
                    <Button color="green" onClick={handleOpen}>
                        Add Request
                    </Button>
                </div>

                <Tabs value="Inpatient">
                    <TabsHeader>
                        <Tab value="Inpatient" className=" text-secondary">
                            Inpatient
                        </Tab>
                        <Tab value="Outpatient" className=" text-secondary">
                            Outpatient
                        </Tab>
                    </TabsHeader>
                    <TabsBody className="h-[calc(100vh-8rem)]" animate={{ initial: { opacity: 1 }, mount: { opacity: 1 }, unmount: { opacity: 1 } }}>
                        <TabPanel value="Inpatient" className="h-full">

                            <StaffRequest requests={inpatient} />
                        </TabPanel>
                        <TabPanel value="Outpatient" className="h-full">
                            <StaffRequest requests={outpatient} />
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </div>

            <Dialog open={open} handler={handleOpen} size="sm" dismiss={{ outsidePress: false }} className="overflow-hidden">

                <DialogBody className="h-[42rem] overflow-scroll">
                    <div className="w-full mx-auto flex flex-col justify-center items-center gap-4">
                        <Card className='w-full p-4 mx-auto mb-4' shadow={false}>
                            <CardHeader floated={false} shadow={false}>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    Request Milk
                                </Typography>
                                <Typography color="gray" className="font-normal">
                                    Select a patient to request milk for
                                </Typography>
                            </CardHeader>
                            <CardBody >
                                <Typography variant="h6" color="blue-gray">
                                    Search for a Patient
                                </Typography>
                                <div className="w-100 max-w-screen-lg">
                                    <div className="mb-1 flex flex-col gap-4">
                                        <div className="flex flex-col">
                                            <div className="relative flex w-full gap-2">
                                                <Input
                                                    label="Search"
                                                    onChange={handleTextChange}
                                                    className="sticky top-0"
                                                    onKeyDown={(e) => e.key === 'Enter' && searchPatient()}
                                                />
                                                <MagnifyingGlassIcon className="h-8 w-8 !absolute right-1 top-1 rounded text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer" onClick={searchPatient} />

                                            </div>
                                            {!selectedPatient && <List className="w-full list-wrapper">
                                                {loadingPatients ? <p>Loading...</p> : recipients && recipients.map((d, index) => (
                                                    <ListItem key={index}
                                                        className="border-b-2"
                                                        onClick={() => handleSelect(d)} >{`${d.name} | ${d.home_address.street} ${d.home_address.brgy} ${d.home_address.city} | ${d.phone}`}</ListItem>
                                                ))}
                                            </List>}
                                        </div>


                                        {selectedPatient && (<Typography variant="h6" color="blue-gray" className="mb-2">
                                            {selectedPatient.name}
                                        </Typography>)}
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Department
                                        </Typography>
                                        <Input
                                            size="lg"
                                            placeholder="Department"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Diagnosis
                                        </Typography>
                                        <Input
                                            size="lg"
                                            placeholder="Diagnosis"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Reason
                                        </Typography>
                                        <Input
                                            size="lg"
                                            placeholder="Reason"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Doctor
                                        </Typography>
                                        <Input
                                            size="lg"
                                            placeholder="Doctor"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Volume
                                        </Typography>
                                        <Input
                                            size="lg"
                                            placeholder="Volume (ml)"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Days
                                        </Typography>
                                        <Input
                                            size="lg"
                                            placeholder="Days"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                    </div>

                                </div>



                            </CardBody>
                        </Card>

                    </div>







                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                        Close
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default StaffRequestView