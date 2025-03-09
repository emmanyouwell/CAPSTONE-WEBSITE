import React, { useState, useEffect } from 'react'
import { Typography, Button, Input } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../../../redux/actions/articleActions';
import ArticleList from '../../../Components/Articles/ArticleList';
const Announcement = () => {
    const [IsLargeScreen, setIsLargeScreen] = useState(false);
    const dispatch = useDispatch();
    const { articles, loading, error } = useSelector((state) => state.articles);
    const [search, setSearch] = useState('');
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
        dispatch(getArticles());
    }, [dispatch])

    useEffect(() => {
        if (articles) {
            console.log(articles);
        }
    }, [articles])
    return (
        <>
            <section className="p-4">
                <div className="flex w-full items-center justify-start gap-4">
                    <div className="flex items-center justify-between gap-4 w-full mb-4">
                        <div className="flex items-center gap-4">
                            <div className="relative flex w-full gap-2 md:w-max">
                                <Input
                                    type="search"
                                    color="gray"
                                    label="Search for announcements..."
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
                            <div className="w-max">
                                <Button onClick={handleReset} className='bg-secondary w-max' size="sm">Delete filters</Button>
                            </div>
                        </div>
                        <Link to="/admin/account/create-admin" className="w-max">
                            <Button className="bg-secondary" size="sm">
                                Create New Announcements
                            </Button>
                        </Link>

                    </div>


                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    <ArticleList articles={articles} isLargeScreen={IsLargeScreen} />

                </div>
            </section>
        </>
    )
}

export default Announcement