import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography
} from '@mui/material'
import { useAuth } from '../context/AuthContext'

const LogoutModal = ({ open, onClose }) => {
    const { auth, setAuth } = useAuth();

    const handleLogout = () => {
        setAuth({ user: null, token: null });
        localStorage.removeItem('token');
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{auth.user?.username}님</DialogTitle>
            <DialogContent>
                <Typography variant='body2' color="error" sx={{ mt: 1 }}>
                    로그아웃 하시겠습니까?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>취소</Button>
                <Button onClick={handleLogout}>로그아웃</Button>
            </DialogActions>
        </Dialog>
    )
}

export default LogoutModal