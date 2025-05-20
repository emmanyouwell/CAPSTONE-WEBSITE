import React, { useState, useEffect } from 'react'
import { Typography, Button, Input } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArticle, getArticles } from '../../../redux/actions/articleActions';
import ArticleList from '../../../Components/Articles/ArticleList';
import { resetDelete } from '../../../redux/slices/articleSlice';
import { deleteAnnouncement, getAnnouncement } from '../../../redux/actions/announcementActions';
const Announcement = () => {
    const [IsLargeScreen, setIsLargeScreen] = useState(false);
    const dispatch = useDispatch();
    const {announcements,isDeleted, loading, error} = useSelector((state)=> state.announcements)
    const [search, setSearch] = useState('');


    const handleDelete = (id) => {
        dispatch(deleteAnnouncement(id));
    }
    const handleReset = () => {
        setSearch('');
    }
    const handleTextChange = (e) => {
        setSearch(e.target.value);
    }
    const handleSubmit = () => {

    }
    useEffect(() => {

        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768); // Tailwind's md breakpoint is 768px
        };

        // Set initial screen size and add event listener
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])

    useEffect(() => {
        dispatch(getAnnouncement());
    }, [dispatch])

    useEffect(() => {
        if (isDeleted) {
            console.log("deleted");
            dispatch(resetDelete());
            dispatch(getAnnouncement());
        }
    }, [isDeleted, dispatch])
    return (
        <>
            <section className="p-4">
                <div className="flex w-full items-center justify-start gap-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full mb-4">
                        <div className="flex justify-center items-center gap-4">
                            <div className="relative flex w-full gap-2 md:w-max">
                                <Input
                                    type="search"
                                    color="gray"
                                    label="Search for articles..."
                                    className="pr-10"
                                    onChange={handleTextChange}
                                    containerProps={{
                                        className: "min-w-[288px]",
                                    }}
                                />
                                <MagnifyingGlassIcon className="h-8 w-8 !absolute right-1 top-1 rounded text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer" onClick={handleSubmit} />

                            </div>
                            {/* <div className="w-max">
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
                            </div> */}

                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-max">
                                <Button onClick={handleReset} className='bg-secondary w-max' size="sm">Delete filters</Button>
                            </div>
                            <Link to="/dashboard/announcement/create" className="w-max">
                                <Button className="bg-secondary" size="sm">
                                    Create New Announcement
                                </Button>
                            </Link>
                        </div>


                    </div>


                </div>
                <div className="grid grid-cols-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    <ArticleList articles={announcements} isLargeScreen={IsLargeScreen} handleDelete={handleDelete} />

                </div>
            </section>
        </>
    )
}

export default Announcement