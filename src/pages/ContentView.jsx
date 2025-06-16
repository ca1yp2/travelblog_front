import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Flag from 'react-flags'
import { getFlagByNationName, loadNations } from '../components/getFlagByNationName'
import axios from 'axios'
import { Box, Typography, Container, Button, Grid } from '@mui/material'
import { FaArrowLeft } from "react-icons/fa6";
import RightSide from '../components/RightSide'
import GuestBook from '../components/GuestBook'
import GuestBookList from '../components/GuestBookList'

const ContentView = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [flagInfo, setFlagInfo] = useState({});
    const nav = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/api/blog/travel/view/${id}`)
            .then(res => {
                const rs = res.data;
                setItem(rs);
            })
            .catch(err => console.log("데이터 로딩 실패", err));
    }, [id]);

    useEffect(() => {
        const fetchContent = async () => {
            if (!item) return;
            await loadNations();
            const flag = getFlagByNationName(item.nation);
            setFlagInfo(flag);
        };
        fetchContent();
    }, [item]);

    if (!item) {
        return <Box p={4}>Loading...</Box>;
    }
    return (
        <Container maxWidth="xl" sx={{ py: 6 }}>
            <Grid container spacing={4}>
                <Grid items size={{ xs: 12, md: 9 }}>
                    <Button variant="outlined" onClick={() => nav(-1)} sx={{ mb: 3 }}>
                        <FaArrowLeft /> 뒤로가기
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '80px' }}>
                        <Typography variant='h4' sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2
                        }}>
                            {
                                flagInfo?.emoji && (
                                    <span style={{ marginRight: '8px' }}>
                                        {flagInfo.emoji}
                                    </span>
                                )
                            }
                            {
                                flagInfo?.iso3 && (
                                    <span style={{
                                        marginRight: '8px',
                                        display: 'inline-block',
                                        paddingTop: '8px'
                                    }}>
                                        <Flag
                                            name={flagInfo.iso3}
                                            format="png"
                                            pngSize={32}
                                            shiny={true}
                                            alt={`${item.nation} Flag`}
                                            basePath=""
                                        />
                                    </span>
                                )
                            }
                            {item.title}
                        </Typography>
                    </Box>
                    <Box component="img" src={`http://localhost:8081/upload/${item.imgurl}`} alt={item.imgalt} sx={{
                        width: '100%',
                        maxHeight: 450,
                        objectFit: 'cover',
                        mb: 3
                    }} />
                    <Typography variant='h6'>{item.subtitle}</Typography>
                    <Typography variant='body1' mt={2}>{item.content}</Typography>
                    {/** 추가이미지 */}
                    {
                        item.images && item.images.length > 0 && (
                            <Box mt={4}>
                                <Typography variant='p' mb={2}>추가 이미지</Typography>
                            </Box>
                        )
                    }
                    <GuestBook contentid={id} />
                    <GuestBookList postId={id} />
                </Grid>
                <Grid items size={{ xs: 12, md: 3 }}>
                    <RightSide />
                </Grid>
            </Grid>

        </Container >
    )
}

export default ContentView