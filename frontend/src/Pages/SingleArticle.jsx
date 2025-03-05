import React, { useState, useEffect } from 'react'
import StickyNavbar from '../Components/Navbar'
import { Typography, Button } from '@material-tailwind/react'
import { Link, useParams } from 'react-router-dom'
import RelatedArticles from '../Components/RelatedArticles'
import Announcement from '../Components/Announcements'
import { useDispatch, useSelector } from 'react-redux';
import { getArticleDetails, getArticles } from '../redux/actions/articleActions'
const SingleArticle = () => {
    const dispatch = useDispatch();
    const { articles, articleDetails, loading, error } = useSelector((state) => state.articles);
    const { id } = useParams();
    const [IsLargeScreen, setIsLargeScreen] = useState(false);
    const formattedDate = new Date(articleDetails.createdAt).toLocaleDateString('en-US', {
        weekday: 'short', // "Mon"
        year: 'numeric', // "2025"
        month: 'short', // "Jan"
        day: 'numeric', // "21"
    });
    useEffect(() => {
        dispatch(getArticleDetails(id));
        dispatch(getArticles());
    }, [dispatch, id]);


    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768); // Tailwind's md breakpoint is 768px
        };

        // Set initial screen size and add event listener
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])
    return (
        <>
            <StickyNavbar />
            <section
                className="p-4 bg-lightbg"

            >
                <div className="flex flex-col lg:flex-row text-center text-light h-auto">


                    <div className="flex flex-col col-span-4 items-center px-4">
                        <Typography variant="h1" className="text-4xl font-bold text-primary text-center">
                            {articleDetails.title}
                        </Typography>

                        <Typography variant="small" className="italic text-gray-600 mt-2">
                            Published on {formattedDate}
                        </Typography>

                        {articleDetails?.images?.length > 0 && (
                            <img
                                src={articleDetails.images[0].url}
                                alt="image of a mother breastfeeding"
                                className="h-96 max-w-full object-cover mt-4 rounded-lg shadow-md mb-8"
                            />
                        )}

                        <div className="prose lg:prose-lg text-gray-800 text-left w-[75%]">
                            <div dangerouslySetInnerHTML={{ __html: articleDetails.description }} />
                        </div>

                    </div>

                    <div className="flex flex-col gap-4 items-center">
                        <RelatedArticles articles={articles} />
                        <Announcement />
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleArticle