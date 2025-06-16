import React, { useState, useEffect } from 'react'
import {
    Container,
    Grid,
    Box,
    Pagination,
    CircularProgress,
    styled
} from '@mui/material'
import Hero from '../components/Hero'
import TravelCard from '../components/TravelCard';
import RightSide from '../components/RightSide'
import axios from 'axios';

const StyledGridContainer = styled(Grid)`
    margin-top: 50px;
    margin-bottom: 50px;
`;

const HeroBox = styled('div')(() => ({
    padding: '80px 80px 0',
    backgroundColor: '#f7f2ee!important',
    '& > div > div > div div': {
        backgroundColor: '#fff!important'
    }
}));

const ITEMS_PER_PAGE = 12;

const Main = () => {

    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8081/api/blog/travel/list", {
                params: {
                    page: page - 1,
                    size: ITEMS_PER_PAGE
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
    }, [page]);

    return (
        <>
            <HeroBox>
                <Hero />
            </HeroBox>
            <Container maxWidth="xl" sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid item size={{ xs: 12, md: 9 }}>
                        {loading ? (
                            <Box display="flex" justifyContent="center" alignItems="center"
                                minHeight="50vh">
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
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

export default Main