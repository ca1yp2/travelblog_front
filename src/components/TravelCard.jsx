import React from 'react'
import {
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Box,
    Button
} from '@mui/material'
import { FcLike } from "react-icons/fc";
import { Link } from 'react-router-dom'

const TravelCard = ({ item }) => {
    return (
        <Card sx={{
            height: '100%',
            position: 'relative',
            transition: 'transform 0.3s',
            '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }
        }}>
            <CardMedia
                component="img"
                height="270"
                image={`http://localhost:8081/upload/${item.imgurl}`}
                alt={item.imgalt}
            />
            <CardContent>
                <Typography variant='h6' fontWeight="bold"
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {item.nation}
                </Typography>
                <Typography variant='subtitle'
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        boxSizing: 'border-box',
                        display: 'block'
                    }}
                >
                    {item.title}
                </Typography>
                <Typography variant='body2' color="text.secondary"
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {item.subtitle}
                </Typography>
            </CardContent>
            <CardActions>
                <Box display="flex" justifyContent="space-between" width="100%">
                    <IconButton aria-label="add to Favorites">
                        <FcLike />
                    </IconButton>
                    <Button size="medium"><Link to={`/view/${item.id}`}>Learn More</Link></Button>
                </Box>
            </CardActions>
        </Card>
    )
}

export default TravelCard