import React, { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CiMenuKebab } from "react-icons/ci";
import Flag from 'react-flags'
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    InputBase,
    styled,
    alpha
} from '@mui/material'
//import { useTheme } from '@mui/material/styles'
import { Search } from '@mui/icons-material'
import { loadNations, getFlagByNationName } from './getFlagByNationName';

const SearchBox = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    border: '1px solid #ccc',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    marginBottom: '30px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}))
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: 'auto',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const RightSideBox = styled(Box)(({ isFixed, fixedWidth }) => ({
    backgroundColor: "#f7f2ee",
    padding: "30px",
    top: 0,
    transition: 'all 0.2s ease-in-out',
    position: isFixed ? 'fixed' : 'relative',
    left: isFixed ? 'auto' : 'unset',
    width: isFixed ? fixedWidth : 'auto',
    zIndex: 100
}))


const RightSide = () => {
    const [groupNations, setGroupNations] = useState({});
    const [openNation, setOptions] = useState(null);
    const [isFixed, setIsFixed] = useState(false);
    const [fixedWidth, setFixedWidth] = useState('auto');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [flagMap, setFlagMap] = useState({});

    const ref = useRef(null);
    const nav = useNavigate();

    const fetchFlag = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get("http://localhost:8081/api/blog/travel/groupByNation",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setGroupNations(res.data);
            const flags = {};
            for (const nation of Object.keys(res.data)) {
                flags[nation] = getFlagByNationName(nation);
            }
            setFlagMap(flags);
        } catch (error) {
            console.error("데이터 로딩 실패", error);
        }
    }

    useEffect(() => {
        fetchFlag();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 1000);
        }
        //최초 마운트시 with 읽음
        if (ref.current) {
            setFixedWidth(`${ref.current.offsetWidth}px`);
        }

        //깃발 데이터 가져오기
        loadNations();

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const handleSearch = () => {
        if (searchKeyword.trim()) {
            nav(`/list?keyword=${encodeURIComponent(searchKeyword.trim())}`);
        }
    }

    return (
        <RightSideBox isfixed={isFixed.toString()} ref={ref} fixedwidth={fixedWidth}>
            <SearchBox>
                <SearchIconWrapper>
                    <Search />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </SearchBox>

            <Typography variant="subtitle1"
                sx={{
                    cursor: 'pointer',
                    borderBottom: '1px dashed #ccc',
                    marginBottom: '15px',
                    fontWeight: 700
                }}>
                <Link to="/list">여행기 모두보기</Link>
            </Typography>
            {
                Object.entries(groupNations).map(([nation, entries]) => (
                    <Box key={nation} mb={1}>
                        <Typography
                            fontWeight={openNation === nation ? "bold" : "normal"}
                            variant="subtitle1"
                            sx={{
                                cursor: 'pointer',
                                borderBottom: '1px dashed #ccc',
                                color: openNation === nation ?
                                    'primary.main' : 'text.primay'
                            }}
                            onClick={() => setOptions(openNation === nation ? null : nation)}
                        ><Link to={`/list?nation=${nation}`}>
                                {flagMap[nation]?.emoji}{" "}
                                {flagMap[nation]?.iso2 && (
                                    <Flag
                                        name={flagMap[nation]?.iso3}
                                        format="png"
                                        pngSize={16}
                                        shiny={true}
                                        alt={`${nation} Flag`}
                                        basePath=""
                                    />
                                )} {" "} {nation}
                            </Link>
                        </Typography>
                        {
                            openNation === nation && (
                                <Box ml={1} mt={1} sx={{ width: '100%' }}>
                                    {entries.map(entry => (
                                        <Card key={entry.id}
                                            sx={{
                                                display: 'flex',
                                                margin: '8px 0',
                                                width: '100%'
                                            }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 80, height: 80 }}
                                                image={entry.url}
                                                alt={entry.alt}
                                            />
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                width: 'calc(100% - 80px)'
                                            }}>
                                                <CardContent sx={{
                                                    flex: '1 0 auto',
                                                    margin: 0,
                                                    padding: 0,
                                                    paddingLeft: '10px',
                                                    paddingTop: '10px',
                                                    width: '100%'
                                                }}>
                                                    <Typography component="div" variant="p"
                                                        sx={{
                                                            width: '100%',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        }}>
                                                        {entry.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="subtitle2"
                                                        component="div"
                                                        sx={{
                                                            width: '100%',
                                                            color: 'text.secondary',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                            boxSizing: 'border-box'
                                                        }}
                                                    >
                                                        {entry.subtitle}
                                                    </Typography>
                                                </CardContent>
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    paddingRight: '10px',
                                                    paddingBottom: '10px',
                                                    width: '100%',
                                                    boxSizing: 'border-box'
                                                }}>
                                                    <CiMenuKebab />
                                                </Box>
                                            </Box>
                                        </Card>
                                    ))}

                                </Box>
                            )
                        }
                    </Box>
                ))
            }
        </RightSideBox>
    )
}

export default RightSide