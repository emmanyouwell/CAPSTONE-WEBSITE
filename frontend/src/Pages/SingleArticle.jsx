import React, { useState, useEffect } from 'react'
import StickyNavbar from '../Components/Navbar'
import { Typography, Button } from '@material-tailwind/react'
import { Link, useParams } from 'react-router-dom'
import RelatedArticles from '../Components/RelatedArticles'
import Announcement from '../Components/Announcements'
import { useDispatch, useSelector } from 'react-redux';
import { getArticleDetails, getArticles } from '../redux/actions/articleActions'
import ArticleList from '../Components/Articles/ArticleList'
const SingleArticle = () => {
    const dispatch = useDispatch();
    const { articles, articleDetails, loading, error } = useSelector((state) => state.articles);
    const { id } = useParams();
    const [IsLargeScreen, setIsLargeScreen] = useState(false);
    const [combinedHTML, setCombinedHTML] = useState('');
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
        if (articleDetails) {
            const extraHTML = `<small class="font-parkinsans text-primary italic">Published on ${formattedDate}</small>`;
            setCombinedHTML(articleDetails.content + extraHTML);
        }
    }, [articleDetails])
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
                className="p-4 bg-lightbg flex flex-col lg:flex-row justify-between"
            >
                <div className="w-full">
                   
                    <div className="article-content" dangerouslySetInnerHTML={{ __html: combinedHTML }} />

                </div>
                <div className="h-full">

                    <Typography variant="h2" className="text-center font-parkinsans">Other Articles</Typography>
                    <div className="flex flex-col gap-4 h-full overflow-y-auto">
                        <ArticleList articles={articles} isLargeScreen={IsLargeScreen} />
                    </div>
                </div>

            </section>


        </>
    )
}

export default SingleArticle