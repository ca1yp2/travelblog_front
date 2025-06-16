import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
    Container,
    Box,
    ImageList,
    ImageListItem,
    Typography,
    Dialog
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const ITEMS_PER_BATCH = 8; //한 번에 8개 보이기

const Photos = () => {
    const [items, setItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState([]);  //실제 렌더링 할 항목 
    const [open, setOpen] = useState(false);
    const [selectImg, setSelectImg] = useState(null);
    const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
    const observer = useRef();

    useEffect(() => {
        fetch('http://localhost:8081/api/blog/photos/list')
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setVisibleItems(data.slice(0, ITEMS_PER_BATCH));
            })
            .catch(error => console.error('데이터를 가져오지 못함', error));

    }, []);

    //lastItemRef 마지막 돔에다가 연결
    const lastItemRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        //IntersectionObserver - 마지막 아이템이 화면에 보일때 
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadMoreItems();
            }
        });
        if (node) observer.current.observe(node);
    }, [visibleItems, items])

    const loadMoreItems = () => {
        setVisibleItems(prev => {
            let nextStart = prev.length % items.length;
            let nextItems = [];
            for (let i = 0; i < ITEMS_PER_BATCH; i++) {
                nextItems.push(items[(nextStart + i) % items.length]);
            }

            //const nextItems = items.slice(prev.length, prev.length + ITEMS_PER_BATCH);
            return [...prev, ...nextItems];
        });
    }

    const handleOpen = (img) => {
        const fullImgPath = `http://localhost:8081/upload/photos/${img}`;
        const image = new Image();
        image.src = fullImgPath;
        image.onload = () => {
            setImgSize({ width: image.width, height: image.height });
            setSelectImg(fullImgPath);
            setOpen(true);
        }
    }

    const handleClose = () => {
        setOpen(false);
        setSelectImg(null);
        setImgSize({ width: 0, height: 0 });
    }

    //화면 비율 계산
    const getDialogSize = () => {
        if (imgSize.width === 0 || imgSize.height === 0) {
            return { width: 'auto', height: 'auto' };
        }
        const maxWidth = window.innerWidth * 0.9;
        const maxHeight = window.innerHeight * 0.9;
        //비율계산
        const ratio = imgSize.width / imgSize.height;
        let width = maxWidth;
        let height = width / ratio;
        if (height > maxHeight) {
            height = maxHeight;
            width = height * ratio;
        }
        return { width, height };
    }

    const dialogSize = getDialogSize();

    return (
        <Container maxWidth="xl" sx={{ pb: 6 }}>
            <Box sx={{ width: '100%' }}>
                <ImageList variant="masonry" cols={4} gap={20}>
                    {visibleItems.map((item, index) => {
                        const isLastItem = index === visibleItems.length - 1;
                        return (
                            <Box key={`${item.id}-${index}`}
                                ref={isLastItem ? lastItemRef : null}
                                sx={{
                                    position: 'relative',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    '&:hover .infoBox': {
                                        transform: 'translateY(calc(0% - 20px))',
                                        opacity: 1
                                    }
                                }}
                                onClick={() => handleOpen(item.img)}
                            >
                                <ImageListItem>
                                    <img
                                        srcSet={`http://localhost:8081/upload/photos/${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        src={`http://localhost:8081/upload/photos/${item.img}?w=248&fit=crop&auto=format`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                                <Box
                                    className="infoBox"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        width: '100%',
                                        background: 'rgba(0,0,0,0.5)',
                                        color: 'white',
                                        padding: '30px 20px',
                                        transform: 'translateY(100%)',
                                        opacity: 0,
                                        transition: 'all 0.3s ease'
                                    }}>
                                    <Typography variant='subtitle2' noWrap>
                                        {item.title}
                                    </Typography>
                                    <Box sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Typography variant='caption' noWrap
                                            sx={{
                                                display: 'block',
                                                width: '80%',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            {item.description}
                                        </Typography>
                                        <Typography variant='caption'
                                            sx={{
                                                display: 'block',
                                                mt: 0.4,
                                                fontSize: '0.7rem',
                                                opacity: 0.7,
                                                textAlign: 'right',
                                                position: 'relative'
                                            }}>
                                            {item.date}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })}
                </ImageList>
            </Box>

            {/** 이미지 모달창 */}
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={false}
                slotProps={{
                    paper: {
                        sx: {
                            width: dialogSize.width,
                            height: dialogSize.height,
                            position: 'relative',
                            overflow: 'hidden',
                            backgroundColor: 'black'
                        }
                    }
                }}
            >
                <CloseIcon
                    sx={{
                        position: 'absolute',
                        top: 15,
                        right: 15,
                        zIndex: 10,
                        color: 'white'
                    }}
                    onClick={handleClose}
                />
                <CloseIcon
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 14,
                        zIndex: 9,
                        color: 'black',
                        opacity: 0.5,
                        cursor: 'pointer',
                        '&:hover': {
                            opacity: 1
                        }
                    }}
                />
                {
                    selectImg && (
                        <Box
                            component="img"
                            src={selectImg}
                        />
                    )
                }
            </Dialog>

        </Container >
    )
}

export default Photos

