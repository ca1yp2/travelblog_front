import React from 'react'
import { useNavigate } from 'react-router-dom';

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box
} from '@mui/material';

const PlaceCard = ({ place }) => {
    const navigate = useNavigate();
    const {
        firstimage,
        title,
        addr1,
        contentid
    } = place;

    const handleClick = () => {
        navigate(`/detail/${contentid}`);
    }

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
            }}
            onClick={handleClick}
        >
            <CardContent sx={{ pb: 0 }}>
                <Typography variant='subtitle1' gutterBottom noWrap>
                    {title}
                </Typography>
                <Typography variant='body2' color="text.secondary" noWrap>
                    {addr1 || '주소 정보 없음'}
                </Typography>
            </CardContent>
            {
                firstimage ? (
                    <CardMedia
                        component="img"
                        height="160"
                        image={firstimage}
                        alt={title}
                    />
                ) : (
                    <Box
                        sx={{
                            height: 160,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f0f0f0',
                            color: "#888",
                            fontSize: '0.9rem'
                        }}
                    >이미지 없음</Box>
                )
            }
        </Card>
    )
}

export default PlaceCard