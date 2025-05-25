import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubmissions, updateDonor } from '../../../redux/actions/donorActions';
import { Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { CheckCheck, EyeIcon } from 'lucide-react';
import { formatDate } from '../../../utils/helper';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { resetUpdate } from '../../../redux/slices/donorSlice';
import { createColumnHelper } from '@tanstack/react-table';
import DataTable from '../../../Components/DataTables/tanstack/DataTable';


const Submissions = () => {
    const dispatch = useDispatch();
    const { submissions, isUpdated, loading } = useSelector((state) => state.donors);
    useEffect(() => {
        dispatch(getSubmissions());
        if (isUpdated) {
            dispatch(resetUpdate())
        }
    }, [dispatch, isUpdated])
    const eligibilityOptions = ['Eligible', 'Not Eligible'];
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [id, setId] = useState('');
    const handleOpen = (id) => {
        setOpen(!open)
        setId(id);
    };
    const handleChange = (e) => {
        setSelectedOption(e.target.value)
    }
    const submit = () => {
        console.log("Selected option: ", selectedOption);
        console.log("ID: ", id);
        const data = {
            id: id,
            eligibility: selectedOption,
            verified: true
        }
        dispatch(updateDonor(data)).then(() => {
            toast.success("Eligibility updated successfully", { position: "bottom-right" });
            setOpen(!open);
        });

    }
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor(row => `${row.user.name.first} ${row.user.name.last}`, {
            id: 'name',
            header: 'Donor Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.eligibility, {
            id: 'eligibility',
            header: 'Eligibility',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => `${formatDate(row.lastSubmissionDate)}`, {
            id: 'lastSubmissionDate',
            header: 'Submission Date',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.submissionID, {
            id: 'submissionID',
            header: 'Submission ID',
            cell: info => info.getValue()
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const submissionID = row.original.submissionID;
                const _id = row.original._id;
                return (
                    <div className="flex gap-2">
                        <a target="_blank" href={`https://script.google.com/macros/s/AKfycbzoZwYmUu_dJK-JLOTGgHEhc0p_V-Sh2hPpv0ud4eybG6xER9IVDNbFEtuWH7a9KzyS/exec?submissionId=${submissionID}`}>
                            <Button className="bg-secondary"><EyeIcon className="h-5 w-5" /></Button>
                        </a>

                        <Button className="bg-success" onClick={() => handleOpen(_id)}><CheckCheck className="h-5 w-5" /></Button>
                    </div>
                );
            },
        }),
    ];
    return (
        <div className="w-full h-full p-4">
            <DataTable data={submissions} columns={columns} pageSize={10}/>
            <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
                <DialogHeader className="relative m-0 block">
                    <Typography variant="h4" color="blue-gray">
                        Enter Eligibility
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

                        {eligibilityOptions?.length > 0 && eligibilityOptions.map((type, index) => (
                            <div key={index}>
                                <input
                                    type="radio"
                                    id={type}
                                    name={type}
                                    value={type}
                                    className="peer hidden"
                                    required
                                    checked={selectedOption === type}
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor={type}
                                    className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-900 ring-1 ring-transparent peer-checked:border-gray-900 peer-checked:ring-gray-900"
                                >
                                    <div className="block">
                                        <Typography className="font-semibold">
                                            {type}
                                        </Typography>

                                    </div>
                                </label>
                            </div>
                        ))}


                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button className="ml-auto" onClick={submit}>
                        Select
                    </Button>
                </DialogFooter>
            </Dialog>

        </div>
    )
}

export default Submissions