import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

// import Loader from '../components/Layouts/Loader'
import { getUser } from '../utils/helper';

const ProtectedRoute = ({ children, isAuthorized = false, isAdmin = false, isStaff = false }) => {

    const [loading, setLoading] = useState(getUser() === false && false)
    const [error, setError] = useState('')
    const [user, setUser] = useState(getUser())
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    console.log(children.type.name, loading)

    if (loading === false) {
        if (!user) {
            return <Navigate to="/login" />
        }
        if (isAuthorized === true && user.role === 'User') {
            return <Navigate to="/" />
        }
        if (isAdmin === true && (user.role !== 'Admin' && user.role !== 'SuperAdmin')) {
            return <Navigate to="/" />
        }
        if (isStaff === true && user.role !== 'Staff') {
            return <Navigate to="/" />
        }
        return children
    }
    return 'Loading...';

};

export default ProtectedRoute;