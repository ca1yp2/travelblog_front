import axios from "axios";
const SERVICE_KEY = process.env.REACT_APP_TOUR_API_KEY;
export const fetchPlaceDetail = async (contentId) => {
    try {
        console.log('Fetching data for contentId:', contentId);
        const response =
            await axios.get('https://apis.data.go.kr/B551011/KorService2/detailCommon2', {
                params: {
                    contentId,
                    MobileOS: 'ETC',
                    MobileApp: 'My Travels',
                    _type: 'json',
                    serviceKey: SERVICE_KEY
                }
            });
            console.log('API Response:', response.data);
        const items = response.data?.response?.body?.items?.item?.[0] || null;
        if (!items) {
            console.warn('No data found for the contentId:', contentId);
        }
        return items;

    } catch (err) {
        console.error('상세정보 api 실패', err);
        return null;
    }
}