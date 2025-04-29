import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getRequests } from '../../../../redux/actions/requestActions';
import RequestCardComponent from './RequestCardComponent';
import RequestTable from './RequestTable';
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react';
const RequestView = () => {
    const dispatch = useDispatch();
    const { request, loading, error } = useSelector(state => state.requests)
    useEffect(() => {
        dispatch(getRequests())
    }, [dispatch])
    const inpatient = request ? request.filter((r) => r.patient?.patientType === 'Inpatient' && r.status !== "Done") : [];
    const outpatient = request ? request.filter((r) => r.patient?.patientType === 'Outpatient' && r.status !== "Done") : [];

    return (
        <div className="p-8">
            <Tabs value="Inpatient">
                <TabsHeader>
                    <Tab value="Inpatient" className=" text-secondary">
                        Inpatient
                    </Tab>
                    <Tab value="Outpatient" className=" text-secondary">
                        Outpatient
                    </Tab>
                </TabsHeader>
                <TabsBody animate={{initial: {opacity: 1}, mount: {opacity: 1}, unmount: {opacity: 1}}}>
                    <TabPanel value="Inpatient" className="h-full">
                        <RequestTable requests={inpatient} />
                    </TabPanel>
                    <TabPanel value="Outpatient" className="h-full">
                        <RequestTable requests={outpatient} />
                    </TabPanel>
                </TabsBody>
            </Tabs>



        </div>
    )
}

export default RequestView