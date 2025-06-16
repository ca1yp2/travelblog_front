import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, List, CircularProgress } from '@mui/material'
import GuestBookItem from './travels/GuestBookItem'

const GuestBookList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/api/blog/travel/guest/list/${postId}`)
            .then(res => setComments(res.data))
            .catch(err => console.error('댓글 불러오기 실패', err));
    }, [postId]);

    if (comments.length === 0) {
        return "";
    }

    const handleDelete = (id) => {
        setComments(prev => prev.filter(comment => comment.id !== id));
    };

    console.log(comments);
    return (
        <Box mt={3}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    comments.map(comment => (
                        <GuestBookItem
                            key={comment.id}
                            comment={comment}
                            onDelete={handleDelete} />
                    ))
                }
            </List>
        </Box>
    )
}

export default GuestBookList