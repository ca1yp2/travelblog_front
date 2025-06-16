import React, {useState,useEffect} from 'react'

const KakaoScript = ({children}) => {
    const [loaded, setLoaded] = useState(false);

   useEffect(() => {
   
           //스크립트가 이미 존재하면 중복으로 로드되는 것을 막는다.
           if (document.getElementById('kakao-map')) {
               if (window.kakao && window.kakao.maps) {
                   setLoaded(true);
               }
               return;
           }
   
           const kakaoAPI = process.env.REACT_APP_KAKAO_API_KEY;
           const script = document.createElement("script");
           script.id = 'kakao-map';
           script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=' + kakaoAPI + '&autoload=false';
           script.async = true;
           script.onload = () => {
               window.kakao.maps.load(() => {
                   console.log('카카오맵 로드됨');
                   setLoaded(true);
               });
           };
           document.head.appendChild(script);
       }, []);
   
  return loaded ? children : null;
}

export default KakaoScript