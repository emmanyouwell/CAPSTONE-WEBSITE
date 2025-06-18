import React, { useEffect, useState } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';
import { useDispatch, useSelector } from 'react-redux';
import { getAvailableMilk, getDispensedMilkPerMonth, getDonorsPerMonth, getMilkPerMonth, getPasteurizedMilkPerMonth, getPatientsPerMonth } from '../../../redux/actions/metricActions';
import { normalizeData } from '../../../utils/helper';
import Select from 'react-select';
// Styles
const styles = StyleSheet.create({
    page: {
        padding: 10,
        fontSize: 10,
        flexDirection: 'column',
    },
    table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    row: {
        flexDirection: 'row',
    },
    multiCol: {
        borderRightWidth: 1,
        borderBottomWidth: 1,
        flexDirection: 'column',
        width: '42.9%',
        height: 'auto'
    },
    innerCol: {
        flexDirection: 'row',
        width: '100%',

    },
    col: {
        borderRightWidth: 1,
        backgroundColor: '#f2f2f2',
        borderStyle: 'solid',
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    cell: {
        flex: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        padding: 5,
        textAlign: 'center',
        width: '12%',
    },
    colMonth: { width: '13%' },
    colWide: { width: '13%' },
    header: {

        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: '#eee',
        padding: 5
    },
    totalCol: {
        backgroundColor: '#f4cccc',
    },
    totalRow: {
        backgroundColor: '#fff200',
        fontWeight: 'bold',
    },
});

const MyDocument = ({ page1_data, page1_total, page2_data, page2_total }) => (
    <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
            <View style={styles.table}>
                {/* Header Row 1 */}
                <View style={styles.row}>
                    <Text style={[styles.cell, styles.colMonth, styles.header]} >MONTH</Text>



                    <View style={styles.multiCol}>
                        <Text style={[styles.col, styles.header, { borderRightWidth: 0, borderBottomWidth: 1 }]}>BREASTMILK DONORS</Text>
                        <View style={styles.innerCol}>
                            <Text style={[styles.col, styles.header, { flex: 1 }]}>Community</Text>
                            <Text style={[styles.col, styles.header, { flex: 1 }]}>Private</Text>
                            <Text style={[styles.col, styles.header, { borderRightWidth: 0, flex: 1 }]}>Total</Text>
                        </View>

                    </View>

                    <Text style={[styles.cell, styles.header]} hyphenationCallback={(word) => [word]}>INPATIENT RECIPIENT</Text>
                    <Text style={[styles.cell, styles.header]} hyphenationCallback={(word) => [word]}>OUTPATIENT RECIPIENT</Text>
                    <Text style={[styles.cell, styles.header]} hyphenationCallback={(word) => [word]}>TOTAL RECIPIENT</Text>
                </View>

                {/* Table Data */}
                {page1_data.map((row, index) => (
                    <View style={styles.row} key={index}>
                        <Text style={[styles.cell, styles.colMonth]}>{row[0]}</Text>
                        <Text style={styles.cell}>{row[1]}</Text>
                        <Text style={styles.cell}>{row[2]}</Text>
                        <Text style={[styles.cell, styles.totalCol]}>{row[3]}</Text>
                        <Text style={styles.cell}>{row[4]}</Text>
                        <Text style={styles.cell}>{row[5]}</Text>
                        <Text style={[styles.cell, styles.totalCol]}>{row[6]}</Text>
                    </View>
                ))}

                {/* Total Row */}
                <View style={[styles.row, styles.totalRow]}>
                    <Text style={[styles.cell, styles.colMonth]}>{page1_total[0]}</Text>
                    <Text style={styles.cell}>{page1_total[1]}</Text>
                    <Text style={styles.cell}>{page1_total[2]}</Text>
                    <Text style={styles.cell}>{page1_total[3]}</Text>
                    <Text style={styles.cell}>{page1_total[4]}</Text>
                    <Text style={styles.cell}>{page1_total[5]}</Text>
                    <Text style={styles.cell}>{page1_total[6]}</Text>
                </View>
            </View>
        </Page>
        <Page size="A4" orientation="landscape" style={styles.page}>
            <View style={styles.table}>
                {/* Header Row 1 */}
                <View style={styles.row}>
                    <Text style={[styles.cell, styles.colMonth, styles.header]} >MONTH</Text>



                    <View style={[styles.multiCol, { width: '37.5%' }]}>
                        <Text style={[styles.col, styles.header, { borderRightWidth: 0, borderBottomWidth: 1 }]}>BREASTMILK COLLECTED (Liter)</Text>
                        <View style={styles.innerCol}>
                            <Text style={[styles.col, styles.header, { flex: 1 }]}>Milk Letting</Text>
                            <Text style={[styles.col, styles.header, { flex: 1 }]}>Private</Text>
                            <Text style={[styles.col, styles.header, { borderRightWidth: 0, flex: 1 }]}>Total</Text>
                        </View>
                    </View>

                    <View style={[styles.multiCol, { width: '37.5%' }]}>
                        <Text style={[styles.col, styles.header, { borderRightWidth: 0, borderBottomWidth: 1 }]}>BREASTMILK DISPENSED (Liter)</Text>
                        <View style={styles.innerCol}>
                            <Text style={[styles.col, styles.header, { flex: 1 }]}>Inpatient</Text>
                            <Text style={[styles.col, styles.header, { flex: 1 }]}>Outpatient</Text>
                            <Text style={[styles.col, styles.header, { borderRightWidth: 0, flex: 1 }]}>Total</Text>
                        </View>
                    </View>

                    <Text style={[styles.cell, styles.header]} hyphenationCallback={(word) => [word]}>BREASTMILK PASTEURIZED (Liter)</Text>
                </View>

                {/* Table Data */}
                {page2_data.map((row, index) => (
                    <View style={styles.row} key={index}>
                        <Text style={[styles.cell, styles.colMonth]}>{row[0]}</Text>
                        <Text style={styles.cell}>{row[1]}</Text>
                        <Text style={styles.cell}>{row[2]}</Text>
                        <Text style={[styles.cell, styles.totalCol]}>{row[3]}</Text>
                        <Text style={styles.cell}>{row[4]}</Text>
                        <Text style={styles.cell}>{row[5]}</Text>
                        <Text style={[styles.cell, styles.totalCol]}>{row[6]}</Text>
                        <Text style={styles.cell}>{row[7]}</Text>
                    </View>
                ))}

                {/* Total Row */}
                <View style={[styles.row, styles.totalRow]}>
                    <Text style={[styles.cell, styles.colMonth]}>{page2_total[0]}</Text>
                    <Text style={styles.cell}>{page2_total[1]}</Text>
                    <Text style={styles.cell}>{page2_total[2]}</Text>
                    <Text style={styles.cell}>{page2_total[3]}</Text>
                    <Text style={styles.cell}>{page2_total[4]}</Text>
                    <Text style={styles.cell}>{page2_total[5]}</Text>
                    <Text style={styles.cell}>{page2_total[6]}</Text>
                    <Text style={styles.cell}>{page2_total[7]}</Text>
                </View>
            </View>
        </Page>
    </Document>
);
const DonorsPerMonth = () => {
    const dispatch = useDispatch();
    const { stats, available, monthlyDonors, patientHospital, donorLocation, volumePerLocation, expiring, dispensedMilk, monthlyPatients, monthlyRequests, pastPerMonth} = useSelector((state) => state.metrics);
    const [pdfUrl, setPdfUrl] = useState(null);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    // Data rows
    const months = [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
        'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];
    useEffect(() => {
        const generatePdf = async (page1_data, page1_total, page2_data, page2_total) => {
            const blob = await pdf(<MyDocument page1_data={page1_data} page1_total={page1_total} page2_data={page2_data} page2_total={page2_total} />).toBlob();
            setPdfUrl(URL.createObjectURL(blob));
        }
        if (monthlyDonors && monthlyPatients && stats && dispensedMilk && pastPerMonth) {
            const { page1_data, page1_total, page2_data, page2_total } = normalizeData(months, monthlyDonors, monthlyPatients, stats, dispensedMilk, pastPerMonth);

            generatePdf(page1_data, page1_total, page2_data, page2_total);
        }

    }, [monthlyDonors, monthlyPatients, stats, dispensedMilk, pastPerMonth])
    useEffect(() => {
        dispatch(getDonorsPerMonth());
        dispatch(getPatientsPerMonth());
        dispatch(getMilkPerMonth());
        dispatch(getDispensedMilkPerMonth());
        dispatch(getPasteurizedMilkPerMonth())
    }, [dispatch])
    
    return (
        <>
            {/* <Select
                className="w-full select-border-black"
                value={selectedDonor ? options.find(opt => opt.value._id === selectedDonor._id) : null}
                onChange={(selected) => { setSelectedDonor(selected.value) }}
                options={options}
                isSearchable
                formatOptionLabel={(option) =>
                (
                    <div className="flex flex-col text-lg">
                        <span className="font-semibold">
                            {option.value.user.name.first} {option.value.user.name.last} | {option.value.user.phone}
                        </span>
                        <span className="text-md">
                            {option.value.home_address.street}, {option.value.home_address.brgy}, {option.value.home_address.city}
                        </span>
                    </div>
                )
                }
            /> */}
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <div className="h-[80vh]">
                    {pdfUrl ? <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} /> : <p>Loading...</p>}
                </div>
            </Worker>
        </>
    )
}

export default DonorsPerMonth