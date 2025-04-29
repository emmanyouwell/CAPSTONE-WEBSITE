import React, { useState, useEffect } from 'react'
import { Typography, Button } from '@material-tailwind/react';
import { Link, useLocation } from 'react-router-dom';
import placeholder from '../../assets/image/placeholder-image.webp'

const ArticleList = ({ articles, IsLargeScreen, handleDelete }) => {
    
    const location = useLocation();
    const isAdminLocation = location.pathname.includes('dashboard');
    useEffect(()=>{
        if (articles){
            console.log(articles);
        }
    },[articles])
    return (
        <>
            {articles.map(article => {
                const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
                    weekday: 'short', // "Mon"
                    year: 'numeric', // "2025"
                    month: 'short', // "Jan"
                    day: 'numeric', // "21"
                });
                const imageUrl =  (article?.content) ? article.content.match(/<img[^>]+src="([^">]+)"/) ? article.content.match(/<img[^>]+src="([^">]+)"/)[1] : placeholder : null;
                // const imageUrl = placeholder;
                return (
                    <div className=" bg-white shadow-lg border border-primary-dark p-4 rounded-lg flex flex-col justify-between">
                        <img src={imageUrl} alt="" className="h-40 object-cover" />
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
                        {isAdminLocation && <div className='flex justify-evenly items-center gap-4'>
                            <Link to={`/dashboard/edit-article/${article._id}`} className="w-full"><Button className="bg-primary w-full mt-2">Edit</Button></Link>
                            <Button className="bg-danger w-full mt-2" onClick={()=>handleDelete(article._id)}>Delete</Button>
                        </div>}
                    </div>
                )
            })}
        </>
    )
}

export default ArticleList