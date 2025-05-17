// chartDataUtils.js

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
                backgroundColor: '#336699',
            },
            {
                label: 'Private',
                data: privateData,
                backgroundColor: '#F06395',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
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
                backgroundColor: '#336699',
            },
            {
                label: 'Private',
                data: privateData,
                backgroundColor: '#F06395',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
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
                backgroundColor: '#336699',
            },
            {
                label: 'Outpatient',
                data: outpatientData,
                backgroundColor: '#F06395',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
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
                backgroundColor: '#336699'
            },
            {
                label: 'Outpatient',
                data: outpatientData,
                backgroundColor: '#F06395'
            }
        ]
    };

    // Optional config
    const options = {
        responsive: true,
        plugins: {
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

    const labels = entries.map(([location]) => location);
    const dataValues = entries.map(([, volume]) => volume);

    const data = {
        labels,
        datasets: [
            {
                label: 'Volume',
                data: dataValues,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                    '#9966FF', '#FF9F40', '#FF6384', '#36A2EB',
                    '#C9CBCF', '#7FCDCD', '#DE6B6B',
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            datalabels: {
                color: '#fff',
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
                        return `Volume: ${value.toLocaleString()} ml`;
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
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                    '#9966FF', '#FF9F40', '#FF6384', '#36A2EB',
                    '#C9CBCF', '#7FCDCD', '#DE6B6B',
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            datalabels: {
                color: '#fff',
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
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                    '#9966FF', '#FF9F40', '#FF6384', '#36A2EB',
                    '#C9CBCF', '#7FCDCD', '#DE6B6B',
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            datalabels: {
                color: '#fff',
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