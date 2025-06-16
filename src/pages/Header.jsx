import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Box,
    Grid,
    Container,
    useMediaQuery,
    useTheme,
    Drawer,
    List,
    ListItem,
    ListItemText
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles'
import Menu from '../components/Menu'
const Logo = styled(Link)`
    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;
    font-size:60px;
    font-weight:400;
    text-decoration:none;
    font-family: "Love Light", cursive;
    color:#333;
`;
const Hamburger = styled(MenuIcon)`
   font-size:30px;
   color:#333;
   cursor: pointer;
`;

const MobileLogo = styled(Link)`
display:flex;
justify-content:flex-start;
align-items:center;
font-size:25px;
text-decoration:none;
font-family: "Love Light", cursive;
color:#333;
`;

const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))  //sm에서 모바일로 변환
    const [menuDown, setMenuDown] = useState(false);
    const menuItem = [
        { title: '내소개', link: "./about", img: 'images/menu1.png' },
        { title: '여행기', link: "./list", img: 'images/menu2.png' },
        { title: '여행사진', link: "./photo", img: 'images/menu3.png' },
        { title: '국내 여행정보', link: "./arealist", img: 'images/menu4.png' },
    ];
    const handleMenuUpDown = () => {
        setMenuDown(!menuDown);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container maxWidth="lg" sx={{ maxWidth: 1330, marginBottom: 0 }}>
                {isMobile ? (
                    <>
                        <Grid container
                            justifyContent="space-between"
                            alignItems="center"
                            mx={{ marginTop: 20, marginLeft: 20 }}>
                            <Grid item>
                                <MobileLogo to="/">
                                    Exciting Trip
                                </MobileLogo>
                            </Grid>
                            <Grid item>
                                <Hamburger onClick={handleMenuUpDown} />
                            </Grid>
                        </Grid>
                        <Drawer anchor="right" open={menuDown} onClose={handleMenuUpDown}>
                            <Box sx={{ width: 250 }}
                                role="presentation"
                                onClick={handleMenuUpDown}
                                onKeyDown={handleMenuUpDown}
                            >
                                <List>
                                    {menuItem.map((item, index) => (
                                        <ListItem button
                                            key={index}
                                            component="a"
                                            href={item.link}
                                        >
                                            <ListItemText primary={item.title} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Drawer>
                    </>
                ) : (
                    <Grid container alignItems="center" mx={{ marginTop: 30, marginBottom: 30 }}>
                        {
                            menuItem.slice(0, 2).map((item, idx) => (
                                <Grid item size={2} textAlign="center" key={idx}>
                                    <Menu {...item} />
                                </Grid>
                            ))
                        }
                        <Grid item size={4}>
                            <Logo to="/">Exciting Trip</Logo>
                        </Grid>
                        {
                            menuItem.slice(2).map((item, idx) => (
                                <Grid item size={2} textAlign="center" key={idx}>
                                    <Menu {...item} />
                                </Grid>
                            ))
                        }

                    </Grid>
                )
                }
            </Container >
        </Box >
    )
}

export default Header