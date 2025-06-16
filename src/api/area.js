import axios from "axios";
const SERVICE_KEY = process.env.REACT_APP_TOUR_API_KEY;

/* 지역기반 조회 */
export const fetchAreaPlaces = async (areaCode = 1, pageNo = 1, contentTypeId = 12) => {
    try {
        const response =
            await axios.get('https://apis.data.go.kr/B551011/KorService2/areaBasedList2', {
                params: {
                    areaCode,
                    contentTypeId,
                    numOfRows: 12,
                    pageNo,
                    MobileOS: 'ETC',
                    MobileApp: 'My Travels',
                    _type: 'json',
                    serviceKey: SERVICE_KEY
                }
            });
        const body = response.data?.response?.body;
        return {
            items: body?.items?.item || [],
            totalCount: body?.totalCount || 0
        };
    } catch (error) {
        console.error('지역 관광지 목록 호출 실패 : ', error);
        return { items: [], totalCount: 0 };
    }
}


/* 키워드 기반 조회 */
export const fetchKeywordPlaces = async (keyword, areaCode = 1, pageNo = 1, contentTypeId = 12) => {
    try {
        const response =
            await axios.get('https://apis.data.go.kr/B551011/KorService2/searchKeyword2', {
                params: {
                    keyword,
                    areaCode,
                    contentTypeId,
                    numOfRows: 12,
                    pageNo,
                    MobileOS: 'ETC',
                    MobileApp: 'My Travels',
                    _type: 'json',
                    serviceKey: SERVICE_KEY
                }
            });
        const body = response.data?.response?.body;
        return {
            items: body?.items?.item || [],
            totalCount: body?.totalCount || 0
        };
    } catch (error) {
        console.error('지역 관광지 목록 호출 실패 : ', error);
        return { items: [], totalCount: 0 };
    }
}

/*  지역 행사 정보 조회 (날짜기반) */
export const fetchEvents = async (areaCode = 1) => {
    try {
        const eventColors = [
            '#f44336', //빨강
            '#e91e63', //핑크
            '#9c27b0', //퍼플
            '#3f51b5', //인디고
            '#03a9f4', //라이트 블루
            '#009688', //틸
            '#4caf50', //녹색
            '#ff9800', //오렌지
            '#796648', //브라운
            '#607d8b'  //
        ];
        const getRandomColor = () => {
            const i = Math.floor(Math.random() * eventColors.length);
            return eventColors[i];
        }
        const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const response =
            await axios.get('https://apis.data.go.kr/B551011/KorService2/searchFestival2', {
                params: {
                    areaCode,
                    numOfRows: 100,
                    eventStartDate: today,  //오늘 이 후 행사 부터 검색 하도록 설정
                    pageNo: 1,
                    MobileOS: 'ETC',
                    MobileApp: 'My Travels',
                    _type: 'json',
                    serviceKey: SERVICE_KEY
                }
            });
        const body = response.data?.response?.body;
        const items = body?.items?.item || [];
        console.log(items);
        //행사정보가 있으면 칼렌더 날짜 형식으로 변환
        const eventList = items.map((e) => ({
            id: e.contentid,
            title: e.title,
            start: e.eventstartdate?.toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
            end: e.eventenddate?.toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
            address: e.addr1,
            firstimage: e.firstimage,
            mapx: e.mapx,
            mapy: e.mapy,
            mlevel: e.mlevel,
            tel: e.tel,
            backgroundColor: getRandomColor(),
            contenttypeid: e.contenttypeid
        })).filter(e => e.start);

        return eventList;

    } catch (error) {
        console.error('지역 관광지 목록 호출 실패 : ', error);
        return { items: [], totalCount: 0 };
    }
}