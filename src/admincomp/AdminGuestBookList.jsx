import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography, Box, Paper } from '@mui/material'
import { Delete } from '@mui/icons-material'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete'

const AdminGuestBookList = () => {
    const [comments, setComments] = useState([]);

    const token = localStorage.getItem('token');

    const fetchComments = () => {
        axios.get(`http://localhost:8081/api/admin/guestbook`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res=>setComments(res.data))
            .catch(err=>console.error(err))
    }

    const handleDelete = (id) => {
        const deleteOk = window.confirm('정말로 삭제하시겠습니까?');
        if(!deleteOk) return;
        axios.delete(`http://localhost:8081/api/admin/delguest/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => fetchComments())
            .catch(err => {
                console.error(err);
                alert('삭제 실패');
            })
    };

    useEffect(()=>{
        fetchComments();
    }, []);
    return (
        <Box>
            <Typography variant='h5' gutterBottom textAlign='center'>
                댓글 관리
            </Typography>

            <TableContainer component={Paper}>
                <Table size='medium'>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>원글ID</TableCell>
                            <TableCell>작성자</TableCell>
                            <TableCell>비밀번호</TableCell>
                            <TableCell>이메일</TableCell>
                            <TableCell>날짜</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell>내용</TableCell>
                            <TableCell>삭제</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            comments.map((c)=>(
                                <TableRow key={c.id}>
                                    <TableCell>{c.id}</TableCell>
                                    <TableCell>{c.postId}</TableCell>
                                    <TableCell>{c.name}</TableCell>
                                    <TableCell>{c.password}</TableCell>
                                    <TableCell>{c.email}</TableCell>
                                    <TableCell>{c.date?.substring(0, 10)}</TableCell>
                                    <TableCell dangerouslySetInnerHTML={{ __html: c.title}} />
                                    <TableCell dangerouslySetInnerHTML={{ __html: c.content}} />
                                    <TableCell>
                                        <IconButton onClick={() => handleDelete(c.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default AdminGuestBookList