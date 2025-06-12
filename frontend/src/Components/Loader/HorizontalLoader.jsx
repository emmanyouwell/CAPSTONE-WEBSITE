import React from 'react'

const HorizontalLoader = () => {
    return (

        <div className="w-full gap-x-2 flex items-center mb-8">
            <div className="w-3 bg-[#d07697] animate-pulse h-3 rounded-full"></div>
            <div className="w-3 animate-pulse h-3 bg-[#dc5385] rounded-full"></div>
            <div className="w-3 h-3 animate-pulse bg-[#E53777] rounded-full"></div>
        </div>

    )
}

export default HorizontalLoader