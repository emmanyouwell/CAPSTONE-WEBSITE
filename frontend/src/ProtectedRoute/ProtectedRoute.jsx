import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

// import Loader from '../components/Layouts/Loader'
import { getUser } from '../utils/helper';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ children, isAuthorized = false, isAdmin = false, isStaff = false }) => {

    const [loading, setLoading] = useState(getUser() === false && false)
    const [error, setError] = useState('')
    const [user, setUser] = useState(getUser())
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    console.log(children.type.name, loading)
    const { userDetails, isLoggedIn } = useSelector(state => state.users)
    
    if (!loading) {
        if (!user) {
            console.log("1")
            return <Navigate to="/login" replace />
        }
        if (isAuthorized === true && user.role === 'User') {
            console.log("2")
            return <Navigate to="/" replace />
        }
        if (isAdmin === true && (user.role !== 'Admin' && user.role !== 'SuperAdmin')) {
            console.log("3")
            return <Navigate to="/" replace />
        }
        if (isStaff === true && user.role !== 'Staff') {
            console.log("4")
            return <Navigate to="/" replace />
        }
        return children
    }
    return 'Loading...'


};

export default ProtectedRoute;