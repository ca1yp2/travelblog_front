import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Mousewheel, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box, IconButton, Typography } from '@mui/material'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext'

const Hero = () => {
    const { auth } = useAuth();
    const user = auth.user;

    const [images, setImages] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8081/api/blog/travel/list", {
            params: {
                page: 0,
                size: 20
            }
        })
            .then((res) => setImages(res.data.content))
            .catch((err) => console.log("데이터 로딩 실패", err));
    }, []);
    console.table(auth);
    return (
        <Box position="relative" width="100%">
            {
                auth.token && user?.role === 'ROLE_ADMIN' && (
                    <Box sx={{
                        position: "absolute",
                        right: "10px",
                        top: "-30px"
                    }}>
                        <Link to="/admin">관리자모드</Link>
                    </Box>
                )
            }
            {/* 슬라이드 */}
            <Swiper
                modules={[Autoplay, Mousewheel, Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                speed={800}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                navigation={{
                    nextEl: '.hero-next',
                    prevEl: '.hero-prev'
                }}
                mousewheel={{ forceToAxis: true }}
                pagination={{ clickable: true }}
                breakpoints={{
                    600: { slidesPerView: 2 },
                    960: { slidesPerView: 5.01 }
                }}
                style={{
                    paddingBottom: "50px"
                }}
            >
                {
                    images.map((img) => (
                        <SwiperSlide key={img.id}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 640,
                                    border: "1px solid #eee",
                                    position: "relative",
                                    overflow: "hidden"
                                }}
                            >
                                <Box sx={{
                                    width: "100%",
                                    height: 480,
                                    overflow: "hidden",
                                    "&:hover img": {
                                        transform: "scale(1.05)",
                                        filter: "brightness(.8)"
                                    }
                                }}>
                                    <Box component="img"
                                        src={`http://localhost:8081/upload/${img.imgurl}`}
                                        alt={img.alt}
                                        sx={{
                                            width: "100%",
                                            height: 480,
                                            objectFit: "cover",
                                            transition: "all 0.3s ease-in-out"
                                        }}
                                    />
                                </Box>
                                <Typography mt={1} fontSize="1.8rem" sx={{
                                    fontFamily: "Comforter",
                                    textAlign: "center",
                                    marginTop: 2.5
                                }}>
                                    {img.nation}
                                </Typography>
                                <Typography mt={0.5} px={3} py={2} fontSize="0.9rem"
                                    sx={{
                                        letterSpacing: "-1px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        textAlign: "center"
                                    }}
                                >
                                    {img.subtitle}
                                </Typography>
                                <Typography mt={1} fontSize="0.8rem" fontWeight="bold"
                                    sx={{
                                        position: "absolute",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        bottom: 20
                                    }}
                                >
                                    <Link to={`/view/${img.id}`}
                                        style={{ textDecoration: "none", fontWeight: 300, color: "#333" }}
                                    >자세히 보기</Link>
                                </Typography>
                            </Box>
                        </SwiperSlide>
                    ))
                }
            </Swiper>


            <IconButton
                className="hero-prev"
                sx={{
                    position: "absolute",
                    left: 30,
                    top: "40%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    backgroundColor: "#fff",
                    boxShadow: 2,
                    "&:hover": { backgroundColor: "#eee" }
                }}
            >
                <ArrowBackIosNew />
            </IconButton>
            <IconButton
                className="hero-next"
                sx={{
                    position: "absolute",
                    right: 30,
                    top: "40%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    backgroundColor: "#fff",
                    boxShadow: 2,
                    "&:hover": { backgroundColor: "#eee" }
                }}
            >
                <ArrowForwardIos />
            </IconButton>
        </Box>
    )
}

export default Hero