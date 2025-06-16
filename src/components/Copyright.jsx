import React, { useState } from 'react'
import { Box } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import LogoutModal from './LogoutModal'

const Copyright = ({ onFooterClick }) => {
    const { auth } = useAuth();
    const [logoutOpen, setLogoutOpen] = useState(false);
    const handleClick = () => {
        if (auth.token) {
            setLogoutOpen(true);
        } else {
            onFooterClick();
        }
    }

    return (
        <>
            <Box sx={{
                backgroundColor: '#f7f2ee',
                textAlign: 'center',
                padding: '20px'
            }}>
                &copy; Ca1yp2's All right reserved
                { }
                <span onClick={handleClick}>.</span>
            </Box>
            <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
        </>
    )
}

export default Copyright