import React, {useEffect, useRef} from 'react'
import { Box } from '@mui/material'

const MapView = ({ lat, lng }) => {
    const mapRef = useRef(null);
     useEffect(() => {
            const kakao = window.kakao;
            if (!kakao || !kakao.maps) return;
    
            const mapOption = { //지도를 생성할 때 필요한 기본 옵션
                center: new kakao.maps.LatLng(lat, lng), //지도의 중심좌표.
                level: 3 //지도의 레벨(확대, 축소 정도)
            };
            const map = new kakao.maps.Map(mapRef.current, mapOption); //지도 생성 및 객체 리턴
    
            new kakao.maps.Marker({
                position: mapOption.center,
                map
            });
        }, [lat, lng]);
  return (
    <Box ref={mapRef} sx={{width: '100%', height: '400px', borderRadius: 2, mt: 4}}/>
  )
}

export default MapView