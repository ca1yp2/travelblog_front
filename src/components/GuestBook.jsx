import React, { useState, useRef } from 'react'
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Grid,
    List,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Editor } from '@toast-ui/react-editor';
import ReCAPTCHA from 'react-google-recaptcha';
import '@toast-ui/editor/toastui-editor.css';
import '../css/EditorCustom.css';
import axios from 'axios';

const FormBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    backgroundColor: '#f7f2ee',
    borderRadius: theme.spacing(1)
}));

const GuestBook = ({ contentid }) => {
    const editorRef = useRef();
    const [guestEntries, setGuestEntries] = useState([]);
    const [captchaToken, setCaptchaToken] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const contentHtml = editorRef.current?.getInstance().getHTML();

        if (!formData.title || !formData.name || !contentHtml || !formData.password || !captchaToken) {
            alert('모든 항목을 입력하시고 로봇인증 해 주세요!');
            return;
        }

        try {
            const newEntry = {
                ...formData,
                content: contentHtml,
                captchaToken,
                postId: contentid
            };

            const res = await axios.post('http://localhost:8081/api/blog/travel/write', newEntry);

            setGuestEntries(prev => [res.data, ...prev]);

            // 초기화
            setFormData({
                title: '',
                name: '',
                email: '',
                password: ''
            });
            editorRef.current?.getInstance().setHTML('');
            setCaptchaToken(null);

        } catch (err) {
            alert("방명록 작성중 오류가 발생했습니다.");
            setFormData({
                title: '',
                name: '',
                email: '',
                password: ''
            });
            editorRef.current?.getInstance().setHTML('');
            setCaptchaToken(null);
        }
    };

    return (
        <Box mt={5}>
            <Typography variant="h5" gutterBottom>방명록</Typography>
            <FormBox>
                <Grid container spacing={2}>
                    <Grid items size={{ xs: 12, md: 12 }}>
                        <TextField
                            label="제목"
                            name="title"
                            value={formData.title}
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid items size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="이름"
                            name="name"
                            value={formData.name}
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid items size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="비밀번호"
                            name="password"
                            type="password"
                            value={formData.password}
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid items size={{ xs: 12, md: 12 }}>
                        <TextField
                            label="이메일"
                            name="email"
                            value={formData.email}
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid items size={{ xs: 12, md: 12 }}>
                        <Box mt={2} mb={2}>
                            <Editor
                                ref={editorRef}
                                initialValue=""
                                previewStyle="vertical"
                                height="300px"
                                initialEditType="wysiwyg"
                                useComandShortcut={true}
                                toolbarItems={
                                    [
                                        ['heading', 'bold', 'italic', 'strike'],
                                        ['hr', 'quote'],
                                        ['ul', 'ol', 'task'],
                                        ['table'],
                                        ['link']
                                    ]
                                }
                            />
                        </Box>
                    </Grid>
                    <Grid items size={{ xs: 12, md: 12 }}>
                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                            onChange={(token) => setCaptchaToken(token)}
                        />
                    </Grid>
                    <Grid items size={{ xs: 12, md: 12 }}>
                        <Button variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >방명록 남기기</Button>
                    </Grid>
                </Grid>
            </FormBox>

            <Box mt={5}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {guestEntries.map((entry, index) => {
                        const avataUrl = `https://robohash.org/${encodeURIComponent(entry.name)}.png?size=100x100&set=set5`;
                        return (
                            <>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={entry.name}
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
                                                {entry.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant='body2'
                                                    sx={{ color: 'text.secondary', display: 'flex', justifyContent: 'flex-start' }}
                                                >{entry.name} | ({entry.date})
                                                </Typography>
                                                <Typography
                                                    component="span"
                                                    sx={{ color: 'text.primary', display: 'flex' }}
                                                    dangerouslySetInnerHTML={{ __html: entry.content }}
                                                >

                                                </Typography>

                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider />
                            </>
                        )
                    })}
                </List>
            </Box>
        </Box>
    )
}

export default GuestBook