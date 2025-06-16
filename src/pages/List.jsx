import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import {
    Container,
    Grid,
    Box,
    Pagination,
    Typography,
    CircularProgress,
    styled
} from '@mui/material'
import TravelCard from '../components/TravelCard';
import RightSide from '../components/RightSide'

const ITEMS_PER_PAGE = 12;

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const StyledGridContainer = styled(Grid)`
    margin-top: 50px;
    margin-bottom: 50px;
`;

const List = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const query = useQuery();
    const nation = query.get('nation');
    const keyword = query.get('keyword');
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8081/api/blog/travel/list", {
                params: {
                    page: page - 1,
                    size: ITEMS_PER_PAGE,
                    nation: nation || '',
                    keyword: keyword || ''
                }
            });
            setItems(res.data.content);
            setTotalPages(res.data.totalPages);

        } catch (error) {
            console.error('데이터 로딩 실패', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, [page, nation, keyword]);

    // const paginationdItems = items.slice(
    //     (page - 1) * ITEMS_PER_PAGE,
    //     page * ITEMS_PER_PAGE
    // );

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Container maxWidth="xl" sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid items size={{ xs: 12, md: 9 }}>
                        {loading ? (
                            <Box display="flex" justifyContent="center" alignItems="center"
                                minHeight="50vh">
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                {nation &&
                                    <Typography variant='h3' mb={3} align="center">
                                        {`${nation} 여행지`}
                                        <small>({items.length}건)</small>
                                    </Typography>
                                }
                                <StyledGridContainer container spacing={3}>
                                    {items.map((item) => (
                                        <Grid Item size={{ xs: 6, md: 3 }} key={item.id} >
                                            <TravelCard item={item} />
                                        </Grid>
                                    ))}
                                </StyledGridContainer>


                                {/* 페이징 */}
                                <Box mt={4} display="flex" justifyContent="center">
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        onChange={handlePageChange}
                                        color="primary"
                                    />
                                </Box>
                            </>
                        )}

                    </Grid>
                    <Grid item size={{ xs: 12, md: 3 }}>
                        <RightSide />
                    </Grid>
                </Grid>
            </Container >
        </>
    )
}

export default List