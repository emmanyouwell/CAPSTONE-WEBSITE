import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getRequestDetails, updateVolumeRequested } from '../../../../redux/actions/requestActions';
import { Button, Card, CardBody, CardFooter, CardHeader, Carousel, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, Option, Select, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from '@material-tailwind/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { ArrowLongLeftIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'
import { getFridges } from '../../../../redux/actions/fridgeActions';
import { getInventories, reserveInventory } from '../../../../redux/actions/inventoryActions';
import { formatDate, getUser } from '../../../../utils/helper';
import placeholder from '../../../../assets/image/placeholder-image.webp'

const SingleRequest = () => {
    const dispatch = useDispatch();
    const { requestDetails } = useSelector(state => state.requests)
    const { fridges } = useSelector(state => state.fridges)
    const { id } = useParams();
    const navigate = useNavigate();
    const [ebm, setEbm] = useState([])
    useEffect(() => {
        // console.log("id: ", id)
        dispatch(getRequestDetails(id));
        dispatch(getFridges());
        dispatch(getInventories())
    }, [id])
    const { inventory } = useSelector(state => state.inventories)
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [openUpdateVolume, setOpenUpdateVolume] = useState(false);
    const [openFridge, setOpenFridge] = useState(false);
    const handleOpenFridge = () => {
        setOpenFridge(!openFridge);
    }
    const handleUpdateVolume = () => {
        setOpenUpdateVolume(!openUpdateVolume);
    }
    const handleOpen = (imgUrl) => {
        setSelectedImage(imgUrl);
        setOpen(true);
    };
    const formik = useFormik({
        initialValues: {
            volume: "",
            days: ""

        },
        validationSchema: Yup.object({
            volume: Yup.number().required('Volume is required').positive('Volume must be a positive number').integer('Volume must be an integer'),
            days: Yup.number().required('Days is required').positive('Days must be a positive number').integer('Days must be an integer')
        }),
        onSubmit: (values) => {
            console.log("values: ", values)
            const data = {
                id: requestDetails._id,
                volume: values.volume,
                days: values.days
            }
            dispatch(updateVolumeRequested(data)).then(() => {
                handleUpdateVolume();
                toast.success("Volume Updated")
            }).catch((err) => {
                console.log("error: ", err)
                toast.error("Error updating volume")
            })




        }
    })


    useEffect(() => {
        if (requestDetails) {
            formik.setFieldValue("volume", requestDetails.volumeRequested?.volume?.toString() || '')
            formik.setFieldValue("days", requestDetails.volumeRequested?.days?.toString() || '')
        }
    }, [requestDetails])
    const pasteurizedFridges = fridges ? fridges.filter((f) => f.fridgeType === 'Pasteurized') : [];
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedInventory, setSelectedInventory] = useState('');
    const [inventoryDetails, setInventoryDetails] = useState({});
    const [selectedVolume, setSelectedVolume] = useState(0);
    const [volume, setVolume] = useState(0);
    const [data, setData] = useState(() => ({
        start: "",
        end: ""
    }))
    const handleStart = (e) => {
        setFormError((prev) => ({
            ...prev,
            start: { status: false, message: "" }
        }))
        const selectedBottle = inventoryDetails.pasteurizedDetails.bottles.filter((b) => b.bottleNumber >= e.target.value && b.bottleNumber <= data.end);
        setVolume(Number(selectedBottle.length * inventoryDetails.pasteurizedDetails.bottleType))
        setData((prev) => ({
            ...prev,
            start: e.target.value
        }))

    }
    const handleEnd = (e) => {
        setFormError((prev) => ({
            ...prev,
            end: { status: false, message: "" }
        }))
        const selectedBottle = inventoryDetails.pasteurizedDetails.bottles.filter((b) => b.bottleNumber >= data.start && b.bottleNumber <= e.target.value);
        setVolume(Number(selectedBottle.length * inventoryDetails.pasteurizedDetails.bottleType))
        setData((prev) => ({
            ...prev,
            end: e.target.value
        }))
    }

    const [formError, setFormError] = useState(() => ({
        fridge: { status: false, message: "" },
        start: { status: false, message: "" },
        end: { status: false, message: "" },
        inventory: { status: false, message: "" },
        addEbm: { status: false, message: "" }
    }));
    const handleSubmit = (e) => {
        // e.preventDefault();
        // console.log("clicked: ")
        let startLimit = 0;
        let endLimit = 0;

        if (Object.keys(inventoryDetails).length > 0) {
            const availableBottles = inventoryDetails.pasteurizedDetails.bottles.filter((b) => b.status === 'Available')
            console.log("available: ", availableBottles);
            startLimit = Number(availableBottles[0].bottleNumber)
            endLimit = Number(availableBottles[availableBottles.length - 1].bottleNumber)
        }
        if (!selectedOption) {
            setFormError((prev) => ({
                ...prev,
                fridge: { status: true, message: "Please select a fridge" },
                inventory: { status: true, message: "Please select a fridge first" }
            }))
        }
        if (!selectedInventory) {
            setFormError((prev) => ({
                ...prev,
                inventory: { status: true, message: "Please select a batch" }
            }))
        }
        if (!data.start) {
            setFormError((prev) => ({
                ...prev,
                start: { status: true, message: "Please enter a starting bottle number" }
            }))
        }
        if (!data.end) {
            setFormError((prev) => ({
                ...prev,
                end: { status: true, message: "Please enter an ending bottle number" }
            }))
        }
        if (data.start < startLimit) {
            setFormError((prev) => ({
                ...prev,
                start: { status: true, message: `Starting bottle number should be greater than ${startLimit}` }
            }))
        }
        if (data.start > endLimit) {
            setFormError((prev) => ({
                ...prev,
                start: { status: true, message: `Starting bottle number should be less than ${endLimit}` }
            }))
        }
        if (data.end < startLimit) {
            setFormError((prev) => ({
                ...prev,
                end: { status: true, message: `Ending bottle number should be greater than ${startLimit}` }
            }))
        }
        if (data.end > endLimit) {
            setFormError((prev) => ({
                ...prev,
                end: { status: true, message: `Ending bottle number should be less than ${endLimit}` }
            }))
        }
        const ebmDetails = {
            invId: inventoryDetails._id,
            bottleType: inventoryDetails.pasteurizedDetails.bottleType,
            batch: inventoryDetails.pasteurizedDetails.batch,
            pool: inventoryDetails.pasteurizedDetails.pool,
            bottle: {
                start: data.start,
                end: data.end
            },
            volDischarge: Number(volume),
        }
        const updatedEbm = [...ebm, ebmDetails];
        setEbm(updatedEbm);
        const data2 = {
            id: requestDetails._id,
            ebmData: updatedEbm,
        }
        console.log("Data: ", data2);
        dispatch(reserveInventory(data2)).then(() => {
            toast.success("Bottles Reserved", { position: 'bottom-right' });
            handleOpenFridge();
            navigate('/dashboard/requests')
        }).catch((err) => console.log(err));

        setSelectedInventory('')
        setInventoryDetails({})
        setSelectedOption('')
        setData(() => ({
            start: "",
            end: ""
        }))
        setVolume(0)
        setSelectedVolume(0)
        setFormError(() => ({
            fridge: { status: false, message: "" },
            start: { status: false, message: "" },
            end: { status: false, message: "" },
            inventory: { status: false, message: "" },
            addEbm: { status: false, message: "" }
        }))
    }
    const handleChangeInventory = (e) => {
        setFormError((prev) => ({
            ...prev,
            inventory: { status: false, message: "" },
            start: { status: false, message: "" },
            end: { status: false, message: "" },
            addEbm: { status: false, message: "" }
        }))
        setData(() => ({
            start: "",
            end: ""
        }))
        setVolume(0)
        const details = filteredInventories.find((inv) => inv._id === e.target.value)
        const availableBottles = details.pasteurizedDetails.bottles.filter((b) => b.status === 'Available')
        // const totalVolume = availableBottles.length * details.pasteurizedDetails.bottleType;
        const requiredVolume = requestDetails.volumeRequested.volume * requestDetails.volumeRequested.days
        const remainingVolume = requiredVolume - selectedVolume;
        if (remainingVolume > 0) {
            const bottlesNeeded = Math.ceil(remainingVolume / details.pasteurizedDetails.bottleType);
            const bottlesToUse = availableBottles.slice(0, bottlesNeeded);
            const newStart = bottlesToUse[0].bottleNumber;
            const newEnd = bottlesToUse[bottlesToUse.length - 1].bottleNumber;
            const newVolume = bottlesToUse.length * details.pasteurizedDetails.bottleType;
            setData((prev) => ({
                start: newStart,
                end: newEnd
            }))
            setVolume(newVolume);
        }

        setInventoryDetails(details)
        setSelectedInventory(e.target.value)
    }
    const handleChange = (e) => {
        setFormError((prev) => ({
            ...prev,
            fridge: { status: false, message: "" }
        }))
        setSelectedOption(e.target.value)
    }
    const filteredInventories = inventory?.filter(
        (inv) =>
            inv.fridge &&
            inv.fridge._id === selectedOption &&
            inv.status !== "Unavailable"
    );
    const addEbm = () => {
        if (!selectedInventory) {
            setFormError((prev) => ({
                ...prev,
                addEbm: { status: true, message: "Please select a batch" }
            }))
            return;
        }
        const ebmDetails = {
            invId: inventoryDetails._id,
            bottleType: inventoryDetails.pasteurizedDetails.bottleType,
            batch: inventoryDetails.pasteurizedDetails.batch,
            pool: inventoryDetails.pasteurizedDetails.pool,
            bottle: {
                start: data.start,
                end: data.end
            },
            volDischarge: Number(selectedVolume),
        }
        setEbm((prev) => [...prev, ebmDetails])
        setSelectedInventory('')
        setData(() => ({
            start: "",
            end: ""
        }))
        console.log("ebmDetails: ", ebmDetails)
        setSelectedVolume((prev) => prev + Number(volume))
        setVolume(0);
        setInventoryDetails({})
        setSelectedInventory('');
    }
    // useEffect(() => {
    //     if (filteredInventories?.length > 0) {
    //         // console.log("filtered: ", filteredInventories)
    //     }
    // }, [filteredInventories])

    return (
        <div className="p-8">
            <div className="flex flex-col gap-4 justify-between items-center">
                <div className="font-parkinsans text-2xl text-center">{requestDetails.patient?.patientType} Request Details</div>
                <Tabs value="requestDetails" className="w-full">
                    <TabsHeader>
                        <Tab value="requestDetails" className=" text-secondary">
                            Request Details
                        </Tab>
                        <Tab value="attachments" className=" text-secondary">
                            Attachments
                        </Tab>
                    </TabsHeader>
                    <TabsBody className="h-[calc(100vh-8rem)]" animate={{ initial: { visibility: 'visible' }, mount: { visibility: 'visible' }, unmount: { visibility: 'hidden' } }}>
                        <TabPanel value="requestDetails" className="h-full">
                            <Card className='w-full border-l-8 border-accent-green' style={{ boderLeftWidth: '8px', borderColor: requestDetails && requestDetails.status === 'Pending' ? 'rgb(255 193 7)' : requestDetails && requestDetails.status === 'Approved' ? 'rgb(229 55 119)' : 'rgb(76 175 80)' }}>
                                <CardBody>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-parkinsans text-lg font-bold">Patient Name</span>
                                            <span className="font-parkinsans text-lg">{requestDetails.patient?.name}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-parkinsans text-lg font-bold">Department</span>
                                            <span className="font-parkinsans text-lg">{requestDetails.department ? requestDetails.department : '(Outpatient)'}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-parkinsans text-lg font-bold">Hospital</span>
                                            <span className="font-parkinsans text-lg">{requestDetails.hospital}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-parkinsans text-lg font-bold">Doctor</span>
                                            <span className="font-parkinsans text-lg">Dr. {requestDetails.doctor}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-parkinsans text-lg font-bold">Requested by</span>
                                            <span className="font-parkinsans text-lg">{`${requestDetails.requestedBy?.name?.first} ${requestDetails.requestedBy?.name?.last}`}</span>
                                        </div>
                                        <span className="flex items-center my-4">
                                            <span className="h-px flex-1 bg-gray-500"></span>
                                        </span>
                                        <div className="flex flex-col items-start justify-between">
                                            <span className="font-parkinsans text-lg font-bold">Diagnosis</span>
                                            <span className="font-parkinsans text-lg">{requestDetails.diagnosis}</span>
                                        </div>
                                        <div className="flex flex-col items-start justify-between">
                                            <span className="font-parkinsans text-lg font-bold">Reason</span>
                                            <span className="font-parkinsans text-lg text-justify">{requestDetails.reason}</span>
                                        </div>
                                        <div className="flex flex-col items-start justify-between">
                                            <span className="font-parkinsans text-lg font-bold">Volume Requested</span>
                                            <span className="font-parkinsans text-3xl text-secondary font-bold">{requestDetails.volumeRequested?.volume} ml / {requestDetails.volumeRequested?.days} days</span>
                                        </div>
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    {getUser()?.role === "Admin" || getUser?.role === "SuperAdmin" && requestDetails.status === 'Pending' ? <div className="w-full flex items-center justify-end gap-4">
                                        <Button onClick={handleUpdateVolume} color="deep-orange">Adjust Volume</Button>
                                        <Button color="green" onClick={handleOpenFridge}>Approve</Button>
                                    </div> : null}


                                </CardFooter>
                            </Card>

                        </TabPanel>
                        <TabPanel value="attachments" className="h-full">
                            <div className="font-parkinsans text-2xl text-center">Attachments</div>
                            <div className="grid grid-cols-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {requestDetails.images?.map((image, index) => (
                                    <Card
                                        key={index}
                                        className="mt-4 w-max mx-auto cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
                                        onClick={() => handleOpen(image.url)}
                                    >
                                        <img src={image.url} alt="prescription" className="w-72 h-52 object-cover" />
                                    </Card>
                                ))}
                            </div>
                        </TabPanel>
                    </TabsBody>
                </Tabs>


                <Dialog size="sm" open={openUpdateVolume} handler={handleUpdateVolume} className="p-4">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="w-full">
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                Enter New Volume
                            </Typography>
                            <Input
                                type="text"
                                label="Volume"
                                name="volume"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.volume}
                                error={formik.touched.volume && Boolean(formik.errors.volume)}
                            />
                            {formik.touched.volume && formik.errors.volume && (
                                <Typography color="red" variant="small">
                                    {formik.errors.volume}
                                </Typography>
                            )}
                        </div>
                        <div className="w-full">
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                Enter New Days
                            </Typography>
                            <Input
                                type="text"
                                label="Days"
                                name="days"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.days}
                                error={formik.touched.days && Boolean(formik.errors.days)}
                            />
                            {formik.touched.days && formik.errors.days && (
                                <Typography color="red" variant="small">
                                    {formik.errors.days}
                                </Typography>
                            )}
                        </div>
                        <div className="flex items-start justify-end pt-4">
                            <Button type="submit" color="deep-orange">
                                Update
                            </Button>
                        </div>

                    </form>
                </Dialog>
                <Dialog size="sm" open={openFridge} handler={handleOpenFridge} className="p-4">
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
                            onClick={handleOpenFridge}
                        >
                            <XMarkIcon className="h-4 w-4 stroke-2" />
                        </IconButton>
                    </DialogHeader>
                    <DialogBody>

                        <div className="space-y-4">

                            {pasteurizedFridges?.length > 0 && pasteurizedFridges.map((fridge, index) => (
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

                            {formError?.fridge?.status && <Typography color="red" variant="small">
                                {formError?.fridge?.message}
                            </Typography>}
                        </div>
                        <span className="flex items-center my-4">
                            <span className="h-px flex-1 bg-gray-500"></span>
                        </span>

                        <div className="flex items-stretch gap-4 max-w-screen-2xl overflow-x-auto whitespace-nowrap">
                            {filteredInventories?.length > 0 ? filteredInventories.map((inventory, index) => {
                                const bottles = inventory.pasteurizedDetails.bottles.filter((b) => b.status === 'Available')
                                // console.log("bottles: ", bottles)
                                return (
                                    <div key={index} className="min-w-max">
                                        <input
                                            type="radio"
                                            id={inventory.pasteurizedDetails.batch}
                                            name={inventory.pasteurizedDetails.batch}
                                            value={inventory._id}
                                            className="peer hidden"
                                            required
                                            checked={selectedInventory === inventory._id}
                                            onChange={handleChangeInventory}
                                            disabled={ebm.some((inv) => inv.invId === inventory._id) ? true : false}
                                        />
                                        <label
                                            htmlFor={inventory.pasteurizedDetails.batch}
                                            className={`block w-full cursor-pointer rounded-lg border border-gray-300 p-4 ${ebm.some((inv) => inv.invId === inventory._id) ? 'text-gray-500' : 'text-gray-900'} ring-1 ring-transparent peer-checked:border-gray-900 peer-checked:ring-gray-900`}
                                        >
                                            <div className="relative w-96 bg-white rounded-lg flex flex-col h-full">
                                                <div className="flex items-center justify-between">
                                                    <Typography variant="lead" className="font-varela font-bold">Batch #: {inventory.pasteurizedDetails.batch}</Typography>
                                                    <Typography variant="small" className={`${ebm.some((inv) => inv.invId === inventory._id) ? 'text-gray-500' : 'text-secondary '}font-varela font-bold`}>{inventory.pasteurizedDetails.bottleType} ml</Typography>
                                                </div>
                                                <Typography variant="lead" className="font-varela font-bold">Pool #: {inventory.pasteurizedDetails.pool}</Typography>
                                                <Typography variant="lead" className="font-varela font-bold">Bottle #: {`${bottles[0].bottleNumber} - ${bottles[bottles.length - 1].bottleNumber}`}</Typography>
                                                <Typography variant="small" className="font-varela ">Expiry Date: {formatDate(inventory.pasteurizedDetails.expiration)}</Typography>
                                                <Typography variant="small" className="font-varela ">Pasteurization Date: {formatDate(inventory.pasteurizedDetails.pasteurizationDate)}</Typography>
                                            </div>
                                        </label>
                                    </div>)
                            }) : <p>No fridge selected</p>}

                        </div>

                        {formError?.inventory?.status && <Typography color="red" variant="small">
                            {formError?.inventory?.message}
                        </Typography>}
                        <div className="space-y-4 mt-8">
                            <div className="w-full">
                                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                    Enter Starting Bottle Number
                                </Typography>
                                <Input
                                    type="text"
                                    label="Bottle Number"
                                    name="start"
                                    value={data.start}
                                    onChange={handleStart}
                                />
                                {formError.start?.status && (
                                    <Typography color="red" variant="small">
                                        {formError.start?.message}
                                    </Typography>
                                )}
                            </div>
                            <div className="w-full">
                                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                    Enter Ending Bottle Number
                                </Typography>
                                <Input
                                    type="text"
                                    label="Bottle Number"
                                    name="end"
                                    value={data.end}
                                    onChange={handleEnd}
                                />
                                {formError.end?.status && (
                                    <Typography color="red" variant="small">
                                        {formError.end?.message}
                                    </Typography>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-4 pt-4">
                            {formError.addEbm?.status && (
                                <Typography color="red" variant="small">
                                    {formError.addEbm?.message}
                                </Typography>
                            )}
                            <Button color="deep-orange" onClick={addEbm} disabled={volume + selectedVolume >= (requestDetails?.volumeRequested?.volume * requestDetails?.volumeRequested?.days)}>
                                Select More
                            </Button>

                        </div>

                        <Typography variant="h4" color="blue-gray" className="my-8 font-medium">
                            Requested Volume: {requestDetails?.volumeRequested?.volume} ml / {requestDetails?.volumeRequested?.days} days ({requestDetails?.volumeRequested?.volume * requestDetails?.volumeRequested?.days} ml)
                        </Typography>
                        <Typography variant="h4" color="blue-gray" className="font-medium">
                            Selected Volume: <span className={selectedVolume + volume >= (requestDetails?.volumeRequested?.volume * requestDetails?.volumeRequested?.days) ? "text-success" : ""} >{selectedVolume + volume} ml </span>
                        </Typography>
                    </DialogBody>
                    <DialogFooter>
                        <div className="flex items-start justify-end pt-4">
                            <Button color="deep-orange" onClick={handleSubmit}>
                                Reserve
                            </Button>
                        </div>
                    </DialogFooter>
                </Dialog>
                <Dialog size="xl" open={open} handler={() => setOpen(false)}>
                    <DialogBody>
                        {selectedImage ? (
                            <img src={selectedImage} alt="prescription" className="w-full h-[48rem] object-contain" />
                        ) : <img src={placeholder} alt="prescription" className="w-full h-[48rem] object-contain" />}
                    </DialogBody>
                </Dialog>

            </div >
        </div>
    )
}

export default SingleRequest