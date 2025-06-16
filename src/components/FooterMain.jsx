import React from 'react'
import { Link } from 'react-router-dom'
import {
    Box,
    Grid,
    Container,
    Button
} from '@mui/material'
import { RiKakaoTalkFill, RiInstagramLine, RiFacebookCircleFill, RiTwitterXFill, RiGithubFill, RiYoutubeFill } from "react-icons/ri";
import { styled } from '@mui/material/styles'
import SendIcon from '@mui/icons-material/Send';
import Icons from './Icons'

const ItemBox = styled(Box)`
    border-top:1px solid #ddd;
    height:100%;
    margin-left:15px;
    margin-right:15px;
    position:relative;
`;
const TextBox = styled(Box)`
   position:absolute;
   top:-8px;
   left:50%;
   transform:translateX(-50%);
   font-size:12px;
   letter-spacing:1px;
   white-space:nowrap;
   font-weight:bold;
   background:#fff;
   text-transform:uppercase;
   color:#999;
   padding-left: 15px;
   padding-right: 15px;
`;

const FooterMain = () => {

    const iconList = [
        { name: RiFacebookCircleFill, title: 'Facebook' },
        { name: RiKakaoTalkFill, title: 'kakaoTalk' },
        { name: RiYoutubeFill, title: 'YouTube' },
        { name: RiInstagramLine, title: 'Instagram' },
        { name: RiGithubFill, title: 'GitHub' },
        { name: RiTwitterXFill, title: 'Twitter' }
    ]

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container maxWidth="xl" sx={{ maxWidth: 1330 }}>
                <Grid container mx={{ marginTop: 50 }}>
                    <Grid item size={4}>
                        <ItemBox>
                            <TextBox>Where I am now</TextBox>
                            <Box sx={{
                                padding: 5,
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <img src="/images/footer-map-img.png" />
                            </Box>
                        </ItemBox>
                    </Grid>
                    <Grid item size={4}>
                        <ItemBox>
                            <TextBox>follow me</TextBox>
                            <Grid container spacing={2}
                                justifyContent="center" style={{ paddingTop: "40px" }}>
                                {
                                    iconList.map((icon, i) => (
                                        <Grid item size={4} key={i} display="flex" justifyContent="center">
                                            <Icons IconName={icon.name}
                                                iconTitle={icon.title}
                                                fontSize="large"
                                            />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </ItemBox>
                    </Grid>
                    <Grid item size={4}>
                        <ItemBox>
                            <TextBox>contact me</TextBox>
                            <Button
                                variant="contained"
                                endIcon={<SendIcon />}
                                style={{ display: "flex", padding: "15px", width: "90%", margin: "40px auto 0" }}>방명록 쓰기</Button>
                            <Button variant="outlined"
                                endIcon={<SendIcon />}
                                style={{ display: "flex", padding: "15px", width: "90%", margin: "40px auto 0" }}>이메일 보내기</Button>
                        </ItemBox>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default FooterMain