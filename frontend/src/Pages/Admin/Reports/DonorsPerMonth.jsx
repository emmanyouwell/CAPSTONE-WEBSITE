import React, { useEffect, useState } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
    }
})

const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>Monthly Donor Metrics</Text>
            </View>
            <View style={styles.section}>
                <Text>Total Donors: 35</Text>
                <Text>Eligible: 22</Text>
                <Text>Ineligible: 13</Text>
            </View>
        </Page>
    </Document>
)

const DonorsPerMonth = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    useEffect(()=>{
        const generatePdf = async () => {
            const blob = await pdf(<MyDocument/>).toBlob();
            setPdfUrl(URL.createObjectURL(blob));
        }
        generatePdf();
    },[])
    return (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <div className="h-[80vh]">
               {pdfUrl ? <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} /> : <p>Loading...</p>}
            </div>
        </Worker>
    )
}

export default DonorsPerMonth