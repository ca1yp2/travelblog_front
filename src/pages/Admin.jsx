import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Container, Grid, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { StarBorder } from '@mui/icons-material'
import AdminGuestBookList from '../admincomp/AdminGuestBookList'
import AdminPhotoList from '../admincomp/AdminPhotoList'
import AdminTravelList from '../admincomp/AdminTravelList'
import AdminTravelForm from '../admincomp/AdminTravelForm'

const Admin = () => {
    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Grid container>
                {/* 왼쪽메뉴 */}
                <Grid item size={{ xs: 12, md: 2 }} sx={{
                    marginTop: '30px',
                    backgroundColor: "#f6f6f6",
                    minHeight: '100vh',
                    p: 2,
                    pt: 4

                }}>
                    <Typography variant='h6' gutterBottom textAlign="center">관리자 모드</Typography>
                    <List>
                        <ListItemButton component={Link} to="/admin">
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="여행기 관리" />
                        </ListItemButton>

                        <ListItemButton component={Link} to="/admin/photo">
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="여행사진 관리" />
                        </ListItemButton>

                        <ListItemButton component={Link} to="/admin/guestbook">
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="방명록 관리" />
                        </ListItemButton>
                    </List>
                </Grid>

                {/* 오른쪽 콘텐츠 */}
                <Grid item size={{ xs: 12, md: 10 }} sx={{
                    marginTop: '30px',
                    backgroundColor: "#fff",
                    p: 4
                }}>
                    <Routes>
                        <Route index element={<AdminTravelList />} />
                        <Route path="photo" element={<AdminPhotoList />} />
                        <Route path="guestbook" element={<AdminGuestBookList />} />
                        <Route path='write' element={<AdminTravelForm />} />
                        <Route path='edit/:id' element={<AdminTravelForm />} />
                    </Routes>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Admin