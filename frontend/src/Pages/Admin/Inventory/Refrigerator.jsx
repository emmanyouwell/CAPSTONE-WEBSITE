import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFridges } from '../../../redux/actions/fridgeActions'
const Refrigerator = () => {
    const dispatch = useDispatch()
    const { fridges, loading, error } = useSelector(state => state.fridges)
    useEffect(() => {
        dispatch(getFridges())
    }, [dispatch])
    const pasteurizedFridges = fridges ? fridges.filter((f) => f.fridgeType === 'Pasteurized') : [];
    const unpasteurizedFridges = fridges ? fridges.filter((f) => f.fridgeType === 'Unpasteurized') : [];
    return (
        <section className="flex flex-col justify-center w-full p-4">
            <div className="font-parkinsans text-2xl text-center">Available Refrigerators</div>
            <div className="flex items-start justify-center gap-4">
                <div className="w-full">
                    <div className="font-parkinsans text-lg my-4">Unpasteurized Refrigerator</div>
                    <div className="flex flex-col items-center justify-center w-full gap-4">
                        {unpasteurizedFridges && unpasteurizedFridges.map((fridge, index) => (
                            <div key={index} className="p-8 bg-secondary w-full rounded-lg flex justify-between items-center">
                                <span className="font-parkinsans text-xl text-white">{fridge.name}</span>
                                <span className="font-parkinsans text-sm text-white">{fridge.fridgeType}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full">
                    <div className="font-parkinsans text-lg my-4">Pasteurized Refrigerator</div>
                    <div className="flex flex-col items-center justify-center w-full gap-4">
                        {pasteurizedFridges && pasteurizedFridges.map((fridge, index) => (
                            <div key={index} className="p-8 bg-secondary w-full rounded-lg flex justify-between items-center">
                                <span className="font-parkinsans text-xl text-white">{fridge.name}</span>
                                <span className="font-parkinsans text-sm text-white">{fridge.fridgeType}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </section>
    )
}

export default Refrigerator