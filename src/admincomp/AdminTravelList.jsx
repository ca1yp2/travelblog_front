import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Pagination } from '@mui/material'

const ITEMS_PER_PAGE = 15;

const AdminTravelList = () => {
    const [travels, setTravels] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8081/api/blog/travel/list", {
                params: {
                    page: page - 1,
                    size: ITEMS_PER_PAGE
                }
            });
            setTravels(res.data.content);
            setTotalPages(res.data.totalPages);

        } catch (error) {
            console.error('데이터 로딩 실패', error);
        } finally {
            setLoading(false);
        }
    };

    const onEdit = (id) => {

    };

    const handleDelete = (id) => {

    };

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <Box>
            <Typography variant='h4' gutterBottom>여행기 관리</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>번호</TableCell>
                            <TableCell>이미지</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell>지역</TableCell>
                            <TableCell>작성일</TableCell>
                            <TableCell>관리</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            travels.map((travel, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{travel.id}</TableCell>
                                    <TableCell>
                                        {
                                            travel.imgurl && (
                                                <img src={`http://localhost:8081/upload/${travel.imgurl}`} alt={travel.imgalt}
                                                    style={{
                                                        width: 70,
                                                        height: 70,
                                                        padding: 3,
                                                        border: "1px solid #999",
                                                        objectFit: "cover",
                                                        borderRadius: 4
                                                    }}
                                                />
                                            )
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`edit/${travel.id}`} style={{textDecoration: 'none', color: '#'}}>
                                            {travel.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {travel.nation}
                                    </TableCell>
                                    <TableCell>
                                        {travel.wdate?.substring(0, 10)}
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Box display="flex" justifyContent="center" gap={1}>
                                            <Button variant='outlined' color='error' onClick={()=>handleDelete(travel.id)}>삭제</Button>
                                        </Box>
                                        
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {/* 글쓰기 버튼 */}
            <Box mt={3} display="flex" justifyContent="flex-end">
                <Button variant='contained' component={Link} to="write">글쓰기</Button>
            </Box>
            {/* 페이징 */}
            <Box mt={2} display="flex" justifyContent="center">
                <Pagination
                    count={totalPages}
                    page={page + 1}
                    onChange={(e, value) => setPage(value)}
                />
            </Box>
        </Box>
    )
}

export default AdminTravelList