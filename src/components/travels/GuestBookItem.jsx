import React, { useState, useRef } from 'react'
import {
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

const GuestBookItem = ({ comment, onDelete }) => {
    const passRef = useRef();
    const [delpass, setDelpass] = useState('');
    const [openDelete, setOpenDelete] = useState(false);

    const handleDelete = () => {
        if (delpass) {
            axios.delete(`http://localhost:8081/api/blog/travel/guest/delete/${comment.id}`, {
                params: { password: delpass }
            })
                .then(() => {
                    alert('삭제되었습니다.');
                    onDelete(comment.id);  //삭제한 id 번호를 GuestBookList에 알림
                    setOpenDelete(false);
                    setDelpass('');
                })
                .catch(error => {
                    alert(error.response?.data || '삭제하는데 오류가 발생했습니다.');
                    setOpenDelete(false);
                    setDelpass('');
                });
        } else {
            alert("비밀번호를 입력하세요.");
            passRef.current?.focus();
        }
    };

    const avataUrl = `https://robohash.org/${encodeURIComponent(comment.name)}.png?size=100x100&set=set5`;
    return (
        <>
            <ListItem alignItems="flex-start" sx={{ position: 'relative' }}>
                <ListItemAvatar>
                    <Avatar alt={comment.name}
                        src={avataUrl}
                        sx={{ bgcolor: '#ededed' }}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography
                            component="h5"
                            fontWeight={600}
                        >
                            {comment.title}
                        </Typography>
                    }
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant='body2'
                                sx={{ color: 'text.secondary', display: 'flex', justifyContent: 'flex-start' }}
                            >{comment.name} | ({comment.date})
                            </Typography>
                            <Typography
                                component="span"
                                sx={{ color: 'text.primary', display: 'flex' }}
                                dangerouslySetInnerHTML={{ __html: comment.content }}
                            >

                            </Typography>

                        </React.Fragment>
                    }
                />
                <ClearIcon
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 100,
                        cursor: 'pointer',
                        color: 'red'
                    }}
                    onClick={() => setOpenDelete(true)} />
            </ListItem>
            <Divider />
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                <DialogTitle>댓글 삭제</DialogTitle>
                <DialogContent>
                    <TextField
                        inputRef={passRef}
                        label="비밀번호"
                        type="password"
                        fullWidth
                        value={delpass}
                        onChange={e => setDelpass(e.target.value)}
                    />
                    <DialogActions>
                        <Button onClick={() => setOpenDelete(false)}>취소</Button>
                        <Button color="error" onClick={handleDelete}>삭제</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default GuestBookItem