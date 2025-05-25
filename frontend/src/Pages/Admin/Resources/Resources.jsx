import React, { useState, useEffect } from 'react'
import { Typography, Button, Input } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { MagnifyingGlassIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArticle, getArticles } from '../../../redux/actions/articleActions';
import ArticleList from '../../../Components/Articles/ArticleList';
import { resetDelete } from '../../../redux/slices/articleSlice';
import { createColumnHelper } from '@tanstack/react-table';
import DataTable from '../../../Components/DataTables/tanstack/DataTable';
import { formatDate } from '../../../utils/helper';
import { EyeIcon, Pencil, SquarePenIcon, Trash } from 'lucide-react';
const Resources = () => {
    const [IsLargeScreen, setIsLargeScreen] = useState(false);
    const dispatch = useDispatch();
    const { articles, isDeleted, loading, error } = useSelector((state) => state.articles);
    const [search, setSearch] = useState('');


    const handleDelete = (id) => {
        dispatch(deleteArticle(id));
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
        dispatch(getArticles());
    }, [dispatch])

    useEffect(() => {
        if (isDeleted) {
            console.log("deleted");
            dispatch(resetDelete());
            dispatch(getArticles());
        }
    }, [isDeleted, dispatch])
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor(row => row.title, {
            id: 'title',
            header: 'Title',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.description, {
            id: 'description',
            header: 'Description',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => formatDate(row.createdAt), {
            id: 'createdAt',
            header: 'Date Published',
            cell: info => info.getValue(),
        }),

        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const article = row.original
                return (
                    <div className="flex items-center gap-2">
                        <Link to={`/article/${article._id}`} className="flex items-center gap-2 text-secondary"><EyeIcon size={30} /></Link>
                        <Link to={`/dashboard/edit-article/${article._id}`}><SquarePenIcon size={25} className="text-secondary" /></Link>
                        <Trash size={25} className="text-secondary cursor-pointer" onClick={() => handleDelete(article._id)} />
                    </div>
                );
            },
        }),
    ];
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
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-max">
                                <Button onClick={handleReset} className='bg-secondary w-max' size="sm">Delete filters</Button>
                            </div>
                            <Link to="/dashboard/resources/create" className="w-max">
                                <Button className="bg-secondary" size="sm">
                                    Create New Article
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <DataTable data={articles} columns={columns} pageSize={10} />
            </section>
        </>
    )
}

export default Resources