import React, { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography
} from '@mui/material'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const LoginModal = ({ open, setOpen }) => {
    const { setAuth } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleClose = () => {
        setUsername("");
        setPassword("");
        setError("");
        setOpen(false);
    }
    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:8081/api/auth/login", {
                username, password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const token = res.data;
            localStorage.setItem('token', token);

            //토큰을 디코딩해서 읽어오기 token, role
            const payload = JSON.parse(atob(token.split('.')[1]));
            setAuth({
                token,
                user: {
                    username: payload.sub,
                    role: payload.role
                }
            });

            //모든 axios 요청에 토큰이 자동으로 포함되어 Spring Security에서 인증하게 함
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setError('');
            handleClose();
        } catch (err) {
            setError('아이디 또는 비밀번호가 틀렸습니다.');
            setUsername("");
            setPassword("");
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>로그인</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="아이디"
                    type="text"
                    fullWidth
                    variant='standard'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="비밀번호"
                    type="password"
                    fullWidth
                    variant='standard'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {
                    error && (
                        <Typography variant='body2' color="error" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={handleLogin}>로그인</Button>
            </DialogActions>
        </Dialog>
    )
}

export default LoginModal