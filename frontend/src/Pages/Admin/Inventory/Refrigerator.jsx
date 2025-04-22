import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFridges } from '../../../redux/actions/fridgeActions'
import { Link } from 'react-router-dom'
import UnpastTables from './tables/UnpastTables'
import PastTables from './tables/PastTables'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
const Refrigerator = () => {
    const dispatch = useDispatch()
    const { fridges, loading, error } = useSelector(state => state.fridges)
    useEffect(() => {
        dispatch(getFridges())
    }, [dispatch])
    const pasteurizedFridges = fridges ? fridges.filter((f) => f.fridgeType === 'Pasteurized') : [];
    const unpasteurizedFridges = fridges ? fridges.filter((f) => f.fridgeType === 'Unpasteurized') : [];
    return (
        <div className="p-8">
            <Tabs value="Unpasteurized">
                <TabsHeader>
                    <Tab value="Unpasteurized" className="text-secondary">
                        Unpasteurized
                    </Tab>
                    <Tab value="Pasteurized" className="text-secondary">
                        Pasteurized
                    </Tab>
                </TabsHeader>
                <TabsBody animate={false}>
                    <TabPanel value="Unpasteurized" className="h-full">
                        <UnpastTables unpasteurizedFridges={unpasteurizedFridges} />
                    </TabPanel>
                    <TabPanel value="Pasteurized" className="h-full">
                        <PastTables pasteurizedFridges={pasteurizedFridges} />
                    </TabPanel>
                </TabsBody>
            </Tabs>

        </div>
    )
}

export default Refrigerator