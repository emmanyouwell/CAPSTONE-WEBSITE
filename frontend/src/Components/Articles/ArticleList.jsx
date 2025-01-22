import React from 'react'
import { Typography, Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
const ArticleList = ({ articles, IsLargeScreen }) => {

    return (
        <>
            {articles.map(article => {
                const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
                    weekday: 'short', // "Mon"
                    year: 'numeric', // "2025"
                    month: 'short', // "Jan"
                    day: 'numeric', // "21"
                });
                return (
                    <div className="max-h-96 bg-lightbg shadow-lg border border-primary-dark p-4 rounded-lg flex flex-col">
                        <img src={article.images[0].url} alt="" className="h-40 object-cover" />
                        <Typography variant={IsLargeScreen ? "h3" : "h4"} className="mt-2 text-primary">
                            {article.title}
                        </Typography>
                        <Typography variant="small" className="italic">
                            Published on {formattedDate}
                        </Typography>
                        <Typography variant="paragraph" className='overflow-hidden text-ellipsis line-clamp-2 my-2'>
                            {article.description}
                        </Typography>
                        <Link to={`/article/${article._id}`} className="w-full"><Button className="bg-secondary w-full">See more</Button></Link>
                    </div>
                )
            })}
        </>
    )
}

export default ArticleList