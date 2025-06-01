import { toast } from 'react-toastify';
import { useLocation } from "react-router-dom";
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import React from 'react';
export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {

        sessionStorage.setItem('user', JSON.stringify(data.user));
    }
    next();
};

// access user name from session storage
export const getUser = () => {
    if (typeof window !== 'undefined') {
        if (sessionStorage.getItem('user')) {
            return JSON.parse(sessionStorage.getItem('user'));
        } else {
            return false;
        }
    }
};

// remove token from session storage
export const logout = (reason) => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('user');
        sessionStorage.setItem('reason', reason)
        window.location.href = '/login';
    }
};

export const errMsg = (message = '') => toast.error(message, {
    position: "bottom-right"
});
export const successMsg = (message = '') => toast.success(message, {
    position: "bottom-right"
});


export const formatDate = (date, type = "full") => {
    if (type === "full") {
        return new Date(date).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
    }
    if (type === "short") {
        return new Date(date).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
    if (type === "time") {
        return new Date(date).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
    }

}
export const formatDateRange = (startDate, endDate) => {
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: '2-digit', hour12: true };
    const optionsShortDate = { month: 'short', day: 'numeric', year: 'numeric' };

    const start = new Date(startDate);
    const end = new Date(endDate);

    const formattedStartDate = start.toLocaleDateString('en-US', optionsDate);
    const formattedEndDate = end.toLocaleDateString('en-US', optionsDate);
    const formattedStartTime = start.toLocaleTimeString('en-US', optionsTime);
    const formattedEndTime = end.toLocaleTimeString('en-US', optionsTime);
    const formattedShortStartDate = start.toLocaleDateString('en-US', optionsShortDate);
    const formattedShortEndDate = end.toLocaleDateString('en-US', optionsShortDate);

    if (formattedStartDate === formattedEndDate) {
        return `${formattedStartDate} at ${formattedStartTime} - ${formattedEndTime}`;
    } else {
        return `${formattedShortStartDate} at ${formattedStartTime} - ${formattedShortEndDate} at ${formattedEndTime}`;
    }
};

export const formatNumber = (num) => {
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    } else {
        return num.toString();
    }
}



export const useIsActive = (path) => {
    const location = useLocation();
    const pathname = location.pathname.toLowerCase();

    const subPath = pathname.replace(/^\/dashboard\/?/, '').split('/')[0] || '';

    const base = path.toLowerCase().replace(/^\//, '');

    if (pathname === '/dashboard' && path === 'dashboard') return true;

    return (
        subPath === base ||
        subPath === base + 's' ||
        subPath === base.slice(0, -1)
    );
}

export const getPerformance = (current, average) => {
    let percent;
    console.log("current: ", current)
    if (average > 0) {
        percent = ((current - average) / average) * 100;
    } else if (current > 0) {
        percent = 100; // or even 1000 or a capped value to emphasize big improvement
    } else {
        percent = 0; // both are 0, so no performance
    }

    return percent.toFixed(2);
};
export const getDonationDate = (donation) => {
    if (donation.donationType === "Public") {
        return new Date(donation.milkLettingEvent?.actDetails?.date);
    }
    if (donation.donationType === "Private") {
        return new Date(donation.schedule?.dates);
    }
    return null;
}
export const donationHistoryChart = (donations) => {
    if (!Array.isArray(donations)) return [];

    const parsedDonations = donations.map((donation) => {
        const rawDate = getDonationDate(donation);
        const totalVolume = donation.totalVolume || donation.schedule?.totalVolume || 0;

        if (!rawDate) return null;

        const dateObj = new Date(rawDate);
        const formattedDate = dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

        return { dateObj, formattedDate, totalVolume };
    }).filter(Boolean); // Remove nulls

    // Sort by actual date (ascending)
    parsedDonations.sort((a, b) => a.dateObj - b.dateObj);

    // Aggregate by formattedDate
    const volumeMap = new Map();
    parsedDonations.forEach(({ formattedDate, totalVolume }) => {
        const currentVolume = volumeMap.get(formattedDate) || 0;
        volumeMap.set(formattedDate, currentVolume + totalVolume);
    });

    // Convert to chart format
    const chartData = Array.from(volumeMap, ([name, totalVolume]) => ({ name, totalVolume }));
    return chartData;
};

export const sortDonation = (donations, order = "desc") => {
    if (!Array.isArray(donations)) return [];
    // Map each donation to an object with its parsed date and original donation
    const donationsWithDate = donations
        .map((donation) => {
            const rawDate = getDonationDate(donation);
            if (!rawDate) return null;

            return {
                dateObj: new Date(rawDate),
                donation,
            };
        })
        .filter(Boolean); // Remove entries without valid date

    // Sort by dateObj
    donationsWithDate.sort((a, b) => {
        return order === "asc"
            ? a.dateObj - b.dateObj
            : b.dateObj - a.dateObj;
    });

    // Return the original donation objects, now sorted
    return donationsWithDate.map((item) => item.donation);
}

export const sortRequest = (requests, order="desc")=>{
    if (!Array.isArray(requests)) return [];
    // Map each request to an object with its parsed date and original request
    const requestsWithDate = requests
        .map((request) => {
            const rawDate = new Date(request.date);
            if (!rawDate) return null;

            return {
                dateObj: rawDate,
                request,
            };
        })
        .filter(Boolean); // Remove entries without valid date

    // Sort by dateObj
    requestsWithDate.sort((a, b) => {
        return order === "asc"
            ? a.dateObj - b.dateObj
            : b.dateObj - a.dateObj;
    });

    // Return the original request objects, now sorted
    return requestsWithDate.map((item) => item.request);
}