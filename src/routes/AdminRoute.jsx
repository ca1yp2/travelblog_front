import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminRoute = ({ children }) => {
    const { auth } = useAuth();

    if (auth.user === null && auth.token !== null) {
        return null;
    }

    if (!auth.token || auth.user?.role !== 'ROLE_ADMIN') {
        alert('관리자 권한이 필요합니다.');
        return <Navigate to="/" replace />;
    }

    return children;
}

export default AdminRoute