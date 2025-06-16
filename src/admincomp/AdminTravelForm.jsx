import React, {useEffect, useState, useRef, useCallback} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, InputAdornment, colors } from '@mui/material'
import { Editor } from '@toast-ui/react-editor'
import { MuiFileInput } from 'mui-file-input'
import AttachFileIcon from '@mui/icons-material/AttachFile';

const AdminTravelForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const edtRef = useRef();
    const [nations, setNations] = useState([]);
    const tempPostId = id ?? Date.now();
    const [form, setForm] = useState({
        content: '',
        imgalt: '',
        imgurl: '',
        nation: '',
        subtitle: '',
        title: ''
    });
    const [file, setFile] = useState(null); //대표 이미지 파일
    const token = localStorage.getItem('token');

    //국가 목록 로드
    useEffect(()=>{
        fetch('/data/nations.json')
        .then(res => res.json())
        .then(setNations)
        .catch(console.error);
    }, []);

    //수정일 때 작업
    useEffect(() => {
        if(id){
            axios.get(`http://localhost:8081/api/blog/travel/view/${id}`)
                .then(res => {
                    const rs = res.data;
                    setForm(rs);
                    edtRef.current.getInstance().setHTML(res.data.content);
                    setFile(res.data.imgalt)
                })
                .catch(err => console.log("데이터 로딩 실패", err));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };
    const handleFileChange = (newFile) => {
        setFile(newFile);
    };

    const addImage = async (blob) => {
        const data = new FormData();
        const altText = document.getElementById("toastuiAltTextInput").value;
        data.append("tempPostId", tempPostId);
        data.append("altText", altText);
        data.append("file", blob);
        const res = await axios.post("http://localhost:8081/api/admin/uploadimage", data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });
        const imgUrl = res.data.url;
        const altValue = res.data.alt;
        return {imgUrl, altValue};
    };

    return (
        <Box sx={{ p:3 }}>
            <Typography variant='h4' gutterBottom>
                {id ? '여행기 수정' : '여행기 등록'}
            </Typography>
            <TextField fullWidth label="제목" name="title" value={form.title} onChange={handleChange} margin='normal' />
            <TextField fullWidth label="부제목" name="subtitle" value={form.subtitle} onChange={handleChange} margin="normal" />
            <FormControl fullWidth margin='normal'>
                <InputLabel>국가선택</InputLabel>
                <Select name="nation" value={form.nation || ''} onChange={handleChange}>
                    {
                        nations.map(n => (
                            <MenuItem key={n.iso2} value={n.en}>{n.ko}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <TextField fullWidth label="대표이미지 ALT" name='imgalt' value={form.imgalt} onChange={handleChange} margin='normal' />
            <Box display="flex" justifyContent="flex-start" alignItems="center" gap={3}>
                <MuiFileInput value={file} onChange={handleFileChange} margin='normal' InputProps={{inputProps:{accept: '.png, .jpg, .jpeg, .gif, .wbps'}, startAdornment: 
                    <InputAdornment position='start'>
                        <AttachFileIcon />
                        <span style={{color:'#999', marginLeft:8}}>파일을 선택하세요.</span>
                    </InputAdornment>
                }} />
                {
                    id && (
                        <span>
                            <img src={`http://localhost:8081/upload/${form.imgurl}`} 
                                style={{
                                    width: 50,
                                    height: 50,
                                    objectFit: 'cover',
                                    borderRadius: 4
                                }}
                                alt={form.imgalt} 
                            />
                        </span>
                    )
                }
            </Box>
            
            <Editor
                ref={edtRef}
                height="450px"
                initialEditType="wysiwyg"
                hooks={{
                    addImageBlobHook : async (blob, callback) => {
                        const {imgUrl, altValue} = await addImage(blob, tempPostId);
                        callback(imgUrl, altValue);
                    }
                }}
            />
            <Box display="flex" justifyContent="center" gap={2} mt={2}>
                <Button variant='contained' color='error'>취소</Button>
                <Button variant='contained' color="primary">{id ? '수정' : '작성'}</Button>
            </Box>
        </Box>
    )
}

export default AdminTravelForm