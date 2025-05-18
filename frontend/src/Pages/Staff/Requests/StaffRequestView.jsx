import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addRequest, getRequests } from '../../../redux/actions/requestActions';

import StaffRequest from './StaffRequest';
import { Button, Card, CardBody, CardHeader, Dialog, DialogBody, DialogFooter, DialogHeader, Input, ListItem, List, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from '@material-tailwind/react';
import { CheckCheck } from 'lucide-react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { getRecipients } from '../../../redux/actions/recipientActions';
import { getUser } from '../../../utils/helper';
import { toast } from 'react-toastify';
import { getDevices, sendNotification } from '../../../redux/actions/notifActions';
const StaffRequestView = () => {
    const dispatch = useDispatch();
    const { request, loading, error } = useSelector(state => state.requests)
    const { loading: loadingPatients, recipients } = useSelector(state => state.recipients)
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const { devices } = useSelector(state => state.devices)
    useEffect(() => {
        dispatch(getDevices())
        dispatch(getRequests())
    }, [dispatch])
    const inpatient = request ? request.filter((r) => r.patient?.patientType === 'Inpatient' && r.status !== "Done") : [];
    const outpatient = request ? request.filter((r) => r.patient?.patientType === 'Outpatient' && r.status !== "Done") : [];
    const [formData, setFormData] = useState(() => ({
        patient: '',
        location: '',
        diagnosis: '',
        reason: '',
        doctor: '',
        volume: '',
        days: '',
        images: []
    }));
    const handleSubmit = () => {
        const { patient, location, diagnosis, reason, doctor, volume, days, images } =
            formData;
        const patientType = selectedPatient?.patientType || formData.patient?.patientType;
        if (
            !patient ||
            !location ||
            !diagnosis ||
            !reason ||
            !doctor ||
            !volume ||
            !days
        ) {
            setOpen(false);
            toast.error("Please fill in all fields", {
                position: "top-right",
            });
            return;
        }

        const requestedBy = getUser()?._id;
        const requestData = {
            date: new Date().toISOString().split('T')[0],
            patient,
            patientType,
            location,
            diagnosis,
            reason,
            doctor,
            requestedBy,
            type: patientType,
            volumeRequested: { volume: Number(volume), days: Number(days) },
            images,
        };

        dispatch(addRequest(requestData))
            .then((res) => {
                if (devices) {
                    for (const device of devices) {
                        if (
                            (device.token && device.user.role === "Admin") ||
                            device.user.role === "SuperAdmin"
                        ) {
                            const notifData = {
                                token: device.token,
                                title: "New Request for Milk",
                                body: `A nurse issued a new request for milk with the volume of ${res.payload.request.volumeRequested.volume} mL per day for ${res.payload.request.volumeRequested.days} days. Open TCHMB Portal App to see more details`,
                            };
                            dispatch(sendNotification(notifData))
                                .then((response) => {
                                    console.log(
                                        "Notification Status: ",
                                        response.payload.data.status
                                    );
                                })
                                .catch((error) => {
                                    console.error("Error sending notification:", error);
                                    Alert.alert("Error", "Sending Notification");
                                });
                        }
                    }
                }
                toast.success("Request added successfully!", { position: "top-right" });
                setOpen(false);
                setFormData({
                    patient: '',
                    department: '',
                    diagnosis: '',
                    reason: '',
                    doctor: '',
                    volume: '',
                    days: '',
                    images: [],
                });
                setSelectedPatient(null);
                setSearch('');
            })
            .catch((error) => {
                console.error("Error adding request:", error);
                toast.error("Error", "Failed to add request.");
                setOpen(false);
            });
    };

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);

        const toBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });

        const base64Files = await Promise.all(files.map(toBase64));

        setFormData((prevFormData) => ({
            ...prevFormData,
            images: [...prevFormData.images, ...base64Files],
        }));
    }
    const handleSelect = (patient) => {
        setSelectedPatient(patient); // Update state with selected donor
        setFormData({ ...formData, patient: patient });

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
                                                    value={selectedPatient ? `${selectedPatient.name} (${selectedPatient.patientType})` : search}
                                                    onKeyDown={(e) => e.key === 'Enter' && searchPatient()}
                                                />
                                                <MagnifyingGlassIcon className="h-8 w-8 !absolute right-1 top-1 rounded text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer" onClick={searchPatient} />

                                            </div>
                                            {!selectedPatient && <List className="w-full list-wrapper">
                                                {loadingPatients ? <p>Loading...</p> : recipients && recipients.map((d, index) => (
                                                    <ListItem key={index}
                                                        className="border-b-2"
                                                        onClick={() => handleSelect(d)} >{`${d.name} | ${d.patientType} | ${d.home_address.street} ${d.home_address.brgy} ${d.home_address.city} | ${d.phone}`}</ListItem>
                                                ))}
                                            </List>}
                                        </div>
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Department / Hospital
                                        </Typography>
                                        <Input
                                            size="lg"
                                            placeholder="Department"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                                            value={formData.diagnosis}
                                            onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
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
                                            value={formData.reason}
                                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
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
                                            value={formData.doctor}
                                            onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
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
                                            value={formData.volume}
                                            onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
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
                                            value={formData.days}
                                            onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Attachments
                                        </Typography>
                                        <Input
                                            type="file"
                                            size="lg"
                                            placeholder="Days"
                                            onChange={handleImageChange}
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            multiple
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                            accept=".jpg, .jpeg, .png"
                                        />
                                    </div>

                                </div>



                            </CardBody>
                        </Card>

                    </div>







                </DialogBody>
                <DialogFooter>
                    <Button color="green" onClick={handleSubmit} className="mr-1">
                        Submit
                    </Button>
                    <Button color="red" onClick={handleOpen} className="mr-1">
                        Close
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default StaffRequestView