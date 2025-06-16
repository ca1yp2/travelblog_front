import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Container,
    Typography,
    CircularProgress,
    IconButton,
    Box,
    Divider
} from '@mui/material'
import { FaPhone, FaMapMarkerAlt, FaGlobe, FaArrowLeft } from 'react-icons/fa';
import { fetchPlaceDetail } from '../../api/detail'
import KakaoScript from '../../components/KakaoScript'
import Mapview from '../../components/travels/MapView'


const DetailView = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();

    

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const detailData = await fetchPlaceDetail(id);
            console.log(detailData);
            setDetail(detailData);
            setLoading(false);
        };
        if (id) loadData();
    }, [id]);

    if (loading) return <CircularProgress />;
    if (!detail) return <Typography>정보를 불러올 수 없습니다.</Typography>

    //console.log(detail);
    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <IconButton onClick={() => nav(-1)} sx={{ marginBottom: 4 }}><FaArrowLeft /> 뒤로</IconButton>
            <Typography variant='h4' fontWeight="bold" gutterBottom>
                {detail.title}
            </Typography>
            {
                detail.firstimage && (
                    <Box
                        component="img"
                        src={detail.firstimage}
                        alt={detail.title}
                        sx={{ width: '100%', borderRadius: 2, mb: 3 }}
                    />
                )
            }
            <Box display="flex" flexDirection="column" gap={1} mb={3}>
                {detail.addr1 && (
                    <Typography variant='body1'>
                        <FaMapMarkerAlt style={{ marginRight: 8 }} />
                        {detail.addr1}
                    </Typography>
                )}
                {detail.tel && (
                    <Typography variant='body1'>
                        <FaPhone style={{ marginRight: 8 }} />
                        {detail.tel}
                    </Typography>
                )}
                {detail.homepage && (
                    <Typography variant='body1'>
                        <FaGlobe style={{ marginRight: 8 }} />
                        <span dangerouslySetInnerHTML={{ __html: detail.homepage }} />
                    </Typography>
                )}
                <Divider sx={{ my: 2 }} />
                <Typography
                    variant="body1"
                    sx={{ whiteSpace: 'pre-line' }}
                    dangerouslySetInnerHTML={{ __html: detail.overview }}
                />
                {/* {
                    detail.firstimage2 && (
                        <Box
                            component="img"
                            src={detail.firstimage2}
                            alt={detail.title}
                            sx={{ width: '100%', borderRadius: 3, mb: 3 }}
                        />
                    )
                } */}
            </Box>
            <KakaoScript>
                {
                    detail.mapy && detail.mapx && (
                        <Mapview lat={detail.mapy} lng={detail.mapx} title={detail.title} />
                    )
                }
            </KakaoScript>
        </Container>
    )
}

export default DetailView