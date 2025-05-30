import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addRequest, getRequests } from '../../../../redux/actions/requestActions';
import RequestCardComponent from './RequestCardComponent';
import RequestTable from './RequestTable';
import { Button, Card, CardBody, CardHeader, Drawer, Input, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from '@material-tailwind/react';
import { getDevices, sendNotification } from '../../../../redux/actions/notifActions';
import { getRecipients } from '../../../../redux/actions/recipientActions';
import { toast } from 'react-toastify';
import { getUser } from '../../../../utils/helper';
import Select from 'react-select'
import Loader from '../../../../Components/Loader/Loader';
const RequestView = () => {
    const dispatch = useDispatch();
    const { request, loading, error } = useSelector(state => state.requests)
    const { loading: loadingPatients, recipients } = useSelector(state => state.recipients)
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedOption, setSelectedOption] = useState('All');
    const { devices } = useSelector(state => state.devices)
    useEffect(() => {
        dispatch(getDevices())
        dispatch(getRequests())
        dispatch(getRecipients({ search: search }));
    }, [dispatch])
    const inpatient = request ? request.filter((r) => r.patient?.patientType === 'Inpatient' && r.status !== "Done") : [];
    const outpatient = request ? request.filter((r) => r.patient?.patientType === 'Outpatient' && r.status !== "Done") : [];
    const handleOpen = () => {
        setOpen(!open);
    }
    const options = [
        ...recipients.map((patient) => ({
            value: patient, label: `${patient.name} | ${patient.patientType} | ${patient.phone} | ${patient.home_address.street}, ${patient.home_address.brgy}, ${patient.home_address.city}`, patient
        }))
    ];

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
        console.log("Submission: ", formData)
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

            toast.error("Please fill in all fields", {
                position: "bottom-right",
            });
            return;
        }
        if (isNaN(volume)) {
            toast.error("Invalid Volume")
            return;
        }
        if (isNaN(days)) {
            toast.error("Invalid Days")
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
                toast.success("Request added successfully!", { position: "bottom-right" });
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
                toast.error("Error", "Failed to add request.", { position: "bottom-right" });
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
    return (
        <div className="p-4">
            <Tabs value="Inpatient">
                <Button color="pink" size="sm" className="mb-2" variant="outlined" onClick={handleOpen}>
                    Add Request
                </Button>
                <TabsHeader>
                    <Tab value="Inpatient" className=" text-secondary">
                        Inpatient
                    </Tab>
                    <Tab value="Outpatient" className=" text-secondary">
                        Outpatient
                    </Tab>
                </TabsHeader>
                <TabsBody className="h-[calc(100vh-8rem)]" animate={{ initial: { opacity: 1 }, mount: { opacity: 1 }, unmount: { opacity: 0 } }}>
                    <TabPanel value="Inpatient" className="h-full">

                        <RequestTable requests={inpatient} />
                    </TabPanel>
                    <TabPanel value="Outpatient" className="h-full">
                        <RequestTable requests={outpatient} />
                    </TabPanel>
                </TabsBody>
            </Tabs>
            <Drawer open={open} onClose={handleOpen} size={500} className="p-4" dismiss={{ outsidePress: false }}>
                <div className="overflow-y-auto h-[calc(100vh-5rem)] pr-2 space-y-4">
                    <Card className='w-full mx-auto mb-4' shadow={false}>
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
                                            <Select
                                                className="w-full select-border-black"
                                                value={options.find(opt => opt.value === selectedPatient)}
                                                onChange={(selected) => { setFormData({ ...formData, patient: selected.value._id }); setSelectedPatient(selected.value) }}
                                                options={options}
                                                isSearchable
                                                formatOptionLabel={(option) =>
                                                ((
                                                    <div className="flex flex-col text-sm">
                                                        <span className="font-semibold">{option.value.name} ({option.value.patientType})</span>
                                                        <span className="text-xs">
                                                            {option.value.home_address.street}, {option.value.home_address.brgy}, {option.value.home_address.city} | {option.value.phone}
                                                        </span>
                                                    </div>
                                                ))
                                                }
                                            />
                                        </div>
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
                <div className="flex items-center justify-center w-full gap-4">
                    {loading ? <Loader /> : <>
                        <Button color="pink" onClick={handleSubmit} fullWidth>
                            Submit
                        </Button>
                        <Button color="black" onClick={handleOpen} fullWidth>
                            Close
                        </Button>
                    </>}
                </div>

            </Drawer>


        </div>
    )
}

export default RequestView