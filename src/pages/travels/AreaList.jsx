import React, { useEffect, useState } from 'react'
import { fetchAreaPlaces, fetchKeywordPlaces, fetchEvents } from '../../api/area'
import {
    Container,
    Box,
    Typography,
    Grid,
    Pagination,
    Tabs,
    Tab
} from '@mui/material'
import PlaceCard from '../../components/travels/PlaceCard'
import { areaCodes } from '../../api/regions'
import { contentTypes } from '../../api/contentTypes'
import SearchBar from '../../components/travels/SearchBar'
import AreaBar from '../../components/travels/AreaBar'
// import PetFilterBar from '../../components/travels/PetFilterBar'
import { FcPlanner } from "react-icons/fc";
import EventCalendar from '../../components/travels/EventCalendar'

const AreaList = () => {
    const [currentArea, setCurrentArea] = useState('');
    const [areaCode, setAreaCode] = useState(1);  //서울
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedInbox, setSelectedInbox] = useState(0);
    const [selectedType, setSelectedType] = useState(12);
    const [keyword, setKeyword] = useState('');
    const [isEvent, setIsEvent] = useState(false);
    const [eventList, setEventList] = useState([]);

    const handleSelected = (event, index, code) => {
        setSelectedInbox(index);
        setAreaCode(code);
        setIsEvent(false);
    }

    const handlePageChange = (e, v) => {
        setPage(v);
        setIsEvent(false);
    }

    const handleSearch = () => {
        setPage(1);
    }

    const handleEvent = () => {
        setIsEvent(true);
    }

    useEffect(() => {
        const loadEvents = async () => {
            if (isEvent) {
                const result = await fetchEvents(areaCode);
                setEventList(result);
            }
        }
        loadEvents();
    }, [isEvent, areaCode]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            let result;
            if (keyword.trim() === '') {
                result = await fetchAreaPlaces(areaCode, page, selectedType);
                setIsEvent(false);
            } else {
                result = await fetchKeywordPlaces(keyword, areaCode, page, selectedType);
            }
            setCurrentArea(areaCodes.find(code => code.code === areaCode)?.name);
            setItems(result.items || []);
            setTotalCount(result.totalCount || 0);
            setLoading(false);
        }
        loadData();
    }, [areaCode, page, selectedType, keyword]);

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Grid container>
                <Grid items size={{ xs: 12, md: 3 }} sx={{ paddingTop: '20px' }}>
                    {/* 검색 */}
                    <Box marginBottom={4}>
                        <SearchBar
                            keyword={keyword}
                            setKeyword={setKeyword}
                            selectedType={selectedType}
                            onSearch={handleSearch}
                        />
                    </Box>
                    <Box marginBottom={4}>
                        <AreaBar
                            areaCodes={areaCodes}
                            selectedInbox={selectedInbox}
                            setAreaCode={setAreaCode}
                            setSelectedInbox={setSelectedInbox}
                        />
                    </Box>
                    <Box marginBottom={4} onClick={handleEvent}>
                        <Typography variant='h6' gutterBottom sx={{ cursor: 'pointer' }}>
                            <FcPlanner /> 지역 행사 일정
                        </Typography>
                    </Box>
                </Grid>
                <Grid items size={{ xs: 12, md: 9 }} sx={{ paddingLeft: 4 }}>
                    {
                        isEvent ? (
                            <EventCalendar events={eventList} />
                        ) :
                            (
                                <>
                                    <Typography variant='h5' align='center' sx={{ mb: 2, fontWeight: 'bold' }}>
                                        {currentArea} 지역 관광지 목록
                                    </Typography>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', md: 2, marginBottom: 4 }}>
                                        <Tabs
                                            value={selectedType}
                                            onChange={(e, v) => {
                                                setSelectedType(v);
                                                setPage(1);
                                            }}
                                            variant='scrollable'
                                            scrollButtons='auto'
                                        >
                                            {contentTypes.map(type => (
                                                <Tab key={type.id}
                                                    label={type.label}
                                                    value={type.id}
                                                />
                                            ))}
                                        </Tabs>
                                    </Box>
                                    <Grid container spacing={4}>
                                        {items.map(p => (
                                            <Grid item size={{ xs: 12, md: 4 }}
                                                key={p.contentid}
                                            >
                                                <PlaceCard place={p} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                        <Pagination
                                            count={Math.ceil(totalCount / 12)}
                                            page={page}
                                            onChange={handlePageChange}
                                            color="primary"
                                        />
                                    </Box>
                                </>
                            )
                    }
                </Grid>
            </Grid>
        </Container >
    )
}

export default AreaList