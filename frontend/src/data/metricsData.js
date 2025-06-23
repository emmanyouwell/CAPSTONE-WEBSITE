// chartDataUtils.js

import { toTitleCase } from "../utils/helper";

export function milkCollectedChartData(stats) {
    const months = Object.keys(stats).filter((key) => key !== 'total');
    const communityData = months.map((month) => stats[month].community);
    const privateData = months.map((month) => stats[month].private);

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Community',
                data: communityData,
                borderColor: 'rgba(51, 102, 153, 1)',
                backgroundColor: 'rgba(51, 102, 153, 0.5)',
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false
            },
            {
                label: 'Private',
                data: privateData,
                borderColor: 'rgba(240, 99, 149, 1)',
                backgroundColor: 'rgba(240, 99, 149, 0.5)',
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            datalabels: {
                color: "#000"
            },
            legend: { position: 'top' },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label(context) {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y || 0;
                        return `${label}: ${value.toLocaleString()} ml`;
                    },
                },
            },
        },
    };

    return { data, options };
}

export function monthlyDonorsChartData(monthlyDonors) {
    const months = Object.keys(monthlyDonors).filter((key) => key !== 'total');
    const communityData = months.map((month) => monthlyDonors[month].community);
    const privateData = months.map((month) => monthlyDonors[month].private);

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Community',
                data: communityData,
                borderColor: 'rgba(51, 102, 153, 1)',
                backgroundColor: 'rgba(51, 102, 153, 0.5)',
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false
            },
            {
                label: 'Private',
                data: privateData,
                borderColor: 'rgba(240, 99, 149, 1)',
                backgroundColor: 'rgba(240, 99, 149, 0.5)',
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            datalabels: {
                color: '#000'
            },
            legend: { position: 'top' },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label(context) {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y || 0;
                        return `${label}: ${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return { data, options };
}

// You can create similar functions for patients, dispensedMilk, etc.
// For example:

export function monthlyPatientsChartData(monthlyPatients) {
    const months = Object.keys(monthlyPatients).filter((key) => key !== 'total');
    const inpatientData = months.map((month) => monthlyPatients[month].inpatient);
    const outpatientData = months.map((month) => monthlyPatients[month].outpatient);

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Inpatient',
                data: inpatientData,
                borderColor: 'rgba(51, 102, 153, 1)',
                backgroundColor: 'rgba(51, 102, 153, 0.5)',
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false
            },
            {
                label: 'Outpatient',
                data: outpatientData,
                borderColor: 'rgba(240, 99, 149, 1)',
                backgroundColor: 'rgba(240, 99, 149, 0.5)',
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            datalabels: {
                color: "#000"
            },
            legend: { position: 'top' },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label(context) {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y || 0;
                        return `${label}: ${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return { data, options };
}

export function monthlyDispensedMilkChartData(dispensedMilk) {

    const months = Object.keys(dispensedMilk).filter((key) => key !== 'total');
    const inpatientData = months.map((month) => dispensedMilk[month].inpatient);
    const outpatientData = months.map((month) => dispensedMilk[month].outpatient);
    const data = {
        labels: months,
        datasets: [
            {
                label: 'Inpatient',
                data: inpatientData,
                borderColor: 'rgba(51, 102, 153, 1)',
                backgroundColor: 'rgba(51, 102, 153, 0.5)',
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false
            },
            {
                label: 'Outpatient',
                data: outpatientData,
                borderColor: 'rgba(240, 99, 149, 1)',
                backgroundColor: 'rgba(240, 99, 149, 0.5)',
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false
            }
        ]
    };

    // Optional config
    const options = {
        responsive: true,
        plugins: {
            datalabels: {
                color: "#000"
            },
            legend: { position: 'top' },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y || 0;
                        return `${label}: ${value.toLocaleString()} ml`;
                    }
                }
            }
        }
    };

    return { data, options }
}


export function milkDonatedPerBarangay(volumePerLocation) {
    const entries = Object.entries(volumePerLocation).filter(([key]) => key !== 'total');

    const locations = entries.map(([location]) => location);
    const labels = locations.map(toTitleCase)
    const dataValues = entries.map(([, volume]) => volume);

    const data = {
        labels,
        datasets: [
            {
                label: 'Volume',
                data: dataValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',  // #FF6384
                    'rgba(54, 162, 235, 0.5)',  // #36A2EB
                    'rgba(255, 206, 86, 0.5)',  // #FFCE56
                    'rgba(75, 192, 192, 0.5)',  // #4BC0C0
                    'rgba(153, 102, 255, 0.5)', // #9966FF
                    'rgba(255, 159, 64, 0.5)',  // #FF9F40
                    'rgba(255, 99, 132, 0.5)',  // #FF6384 (again)
                    'rgba(54, 162, 235, 0.5)',  // #36A2EB (again)
                    'rgba(201, 203, 207, 0.5)', // #C9CBCF
                    'rgba(127, 205, 205, 0.5)', // #7FCDCD
                    'rgba(222, 107, 107, 0.5)'  // #DE6B6B
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                color: '#000',
                font: {
                    weight: 'semibold',
                    size: 14,
                },
                anchor: 'end',
                align: 'start',
                clamp: true,
                formatter: (value, context) => {
                    let label = context.chart.data.labels[context.dataIndex] || '';
                    label = label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
                    return `${label}\n${value} ml`;
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const value = tooltipItem.raw || 0;
                        return `Volume: ${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return { data, options }

}


export function donorsPerBarangay(donorLocation) {
    const entries = Object.entries(donorLocation).filter(([key]) => key !== 'total');

    const labels = entries.map(([location]) => location);
    const dataValues = entries.map(([, volume]) => volume);

    const data = {
        labels,
        datasets: [
            {
                label: 'Volume',
                data: dataValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',  // #FF6384
                    'rgba(54, 162, 235, 0.5)',  // #36A2EB
                    'rgba(255, 206, 86, 0.5)',  // #FFCE56
                    'rgba(75, 192, 192, 0.5)',  // #4BC0C0
                    'rgba(153, 102, 255, 0.5)', // #9966FF
                    'rgba(255, 159, 64, 0.5)',  // #FF9F40
                    'rgba(255, 99, 132, 0.5)',  // #FF6384 (again)
                    'rgba(54, 162, 235, 0.5)',  // #36A2EB (again)
                    'rgba(201, 203, 207, 0.5)', // #C9CBCF
                    'rgba(127, 205, 205, 0.5)', // #7FCDCD
                    'rgba(222, 107, 107, 0.5)'  // #DE6B6B
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                color: '#000',
                font: {
                    weight: 'semibold',
                    size: 14,
                },
                anchor: 'end',
                align: 'start',
                clamp: true,
                formatter: (value, context) => {
                    let label = context.chart.data.labels[context.dataIndex] || '';
                    label = label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
                    return `${label}\n${value}`;
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const value = tooltipItem.raw || 0;
                        return `Donors: ${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return { data, options }

}


export function patientPerHospital(patientHospital) {
    const entries = Object.entries(patientHospital).filter(([key]) => key !== 'total');

    const labels = entries.map(([location]) => location);
    const dataValues = entries.map(([, volume]) => volume);

    const data = {
        labels,
        datasets: [
            {
                label: 'Volume',
                data: dataValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',  // #FF6384
                    'rgba(54, 162, 235, 0.5)',  // #36A2EB
                    'rgba(255, 206, 86, 0.5)',  // #FFCE56
                    'rgba(75, 192, 192, 0.5)',  // #4BC0C0
                    'rgba(153, 102, 255, 0.5)', // #9966FF
                    'rgba(255, 159, 64, 0.5)',  // #FF9F40
                    'rgba(255, 99, 132, 0.5)',  // #FF6384 (again)
                    'rgba(54, 162, 235, 0.5)',  // #36A2EB (again)
                    'rgba(201, 203, 207, 0.5)', // #C9CBCF
                    'rgba(127, 205, 205, 0.5)', // #7FCDCD
                    'rgba(222, 107, 107, 0.5)'  // #DE6B6B
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                color: '#000',
                font: {
                    weight: 'semibold',
                    size: 14,
                },
                anchor: 'end',
                align: 'start',
                clamp: true,
                formatter: (value, context) => {
                    let label = context.chart.data.labels[context.dataIndex] || '';
                    label = label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
                    return `${label}\n${value}`;
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const value = tooltipItem.raw || 0;
                        return `Patients: ${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return { data, options }

}

export function donationHistory(volumeByDate) {
    if (!volumeByDate || typeof volumeByDate !== 'object') {
        return { data: null, options: null };
    }

    const labels = Object.keys(volumeByDate);
    const dataPoints = Object.values(volumeByDate);

    const data = {
        labels,
        datasets: [
            {
                label: 'Total Volume',
                data: dataPoints,
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                tension: 0.3,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: 'white' },
            },
            title: {
                display: true,
                text: 'Milk Letting Volume by Date',
                color: 'white',
            },
        },
        scales: {
            x: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
            },
            y: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
            },
        },
    };

    return { data, options };
}

export function donorAgeDemographic(donorAge) {
    const labels = Object.keys(donorAge).filter(key => key !== 'total');
    const dataCounts = labels.map(age => donorAge[age]);
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Number of Donors',
                data: dataCounts,
                borderColor: 'rgba(240, 99, 149, 1)',
                backgroundColor: 'rgba(240, 99, 149, 0.5)',
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            datalabels: {
                color: "#000"
            },
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Donors: ${context.formattedValue}`;
                    }
                }
            },
            title: {
                display: true,
                text: 'Donor Age Distribution'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Age'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Donors'
                }
            }
        }
    };


    return { data, options }
}