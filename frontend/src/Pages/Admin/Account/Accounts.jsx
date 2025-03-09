import React, { useState, useEffect } from 'react'
import { Button, Typography, Select, Option, Input } from '@material-tailwind/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import admin from '../../../assets/image/admin-icon.png';
import staff from '../../../assets/image/staff-icon.png';
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import AccountTable from '../../../Components/Admin/Account/AccountTable';
const sortTypes = [
    "First Name (Desc)",
    "First Name (Asc)",
    "Last Name (Desc)",
    "Last Name (Asc)",
    "ID (Desc)",
    "ID (Asc)"
]
const roleTypes = [
    "Admin",
    "Staff"
]
const Accounts = () => {
    const dispatch = useDispatch();
    const { users, totalPages, pageSize } = useSelector(state => state.users);
    const [search, setSearch] = useState('');
    const [role, setRole] = useState('');
    const [roleType, setRoletype] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [sort, setSort] = useState('');

    const handleRole = (value) => {
        if (value === "Admin") {
            setRole("Admin");
            setRoletype("Admin");
        }
        else if (value === "Staff") {
            setRole("Staff");
            setRoletype("Staff");
        }
    }

    const handleSort = (value) => {
        setSort(value);
        if (value === "First Name (Desc)") {
            setSortBy("firstName");
            setSortOrder("desc");
        } else if (value === "First Name (Asc)") {
            setSortBy("firstName");
            setSortOrder("asc");
        } else if (value === "Last Name (Desc)") {
            setSortBy("lastName");
            setSortOrder("desc");
        } else if (value === "Last Name (Asc)") {
            setSortBy("lastName");
            setSortOrder("asc");
        } else if (value === "ID (Desc)") {
            setSortBy("employeeID");
            setSortOrder("desc");
        } else if (value === "ID (Asc)") {
            setSortBy("employeeID");
            setSortOrder("asc");
        }
    }
    const handleReset = () => {
        setSearch('');
        setRole('');
        setSortOrder('');
        setSortBy('');
        setSort('');
        setRoletype('');
        setCurrentPage(1);
    }
    const handleTextChange = (e) => {
        setSearch(e.target.value);
    }
    const handleSubmit = () => {
        setCurrentPage(0);
        dispatch(getAllUsers({ search: search }));
    }
    useEffect(() => {
        console.log("Getting all users");
        dispatch(getAllUsers({ search: search, page: currentPage, pageSize: pageSize, sortBy: sortBy, order: sortOrder, role: roleType }));
    }, [dispatch, search, currentPage, sortBy, sortOrder, roleType])
    return (
        <div className="flex flex-col items-center justify-center w-full gap-4 p-4 mt-4 h-full">
            <div className="flex w-full items-center justify-start gap-4">
                <div className="flex items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-4">
                        <div className="relative flex w-full gap-2 md:w-max">
                            <Input
                                type="search"
                                color="gray"
                                label="Search for employees..."
                                className="pr-10"
                                onChange={handleTextChange}
                                containerProps={{
                                    className: "min-w-[288px]",
                                }}
                            />
                            <MagnifyingGlassIcon className="h-8 w-8 !absolute right-1 top-1 rounded text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer" onClick={handleSubmit} />

                        </div>
                        <div className="w-max">
                            <Select label="Sort by" color="pink" variant="standard" value={sort} onChange={(value) => handleSort(value)}>
                                {sortTypes.map((types, index) => (
                                    <Option key={index} value={types}>{types}</Option>
                                ))}
                            </Select>
                        </div>
                        <div className="w-max">
                            <Select label="Role" color="pink" variant="standard" value={role} onChange={(value) => handleRole(value)}>
                                {roleTypes.map((types, index) => (
                                    <Option key={index} value={types}>{types}</Option>
                                ))}
                            </Select>
                        </div>
                        <div className="w-max">
                            <Button onClick={handleReset} className='bg-secondary w-max' size="sm">Delete filters</Button>
                        </div>
                    </div>
                    <Link to="/admin/account/create-admin" className="w-max">
                        <Button className="bg-secondary" size="sm">
                            Create New Account
                        </Button>
                    </Link>

                </div>


            </div>
            {users && <AccountTable users={users} currentPage={currentPage} totalPages={totalPages} />}

        </div>

    )
}

export default Accounts