# 🧳 여행 블로그 프론트엔드 프로젝트

이 프로젝트는 React 기반의 **여행 블로그 웹 애플리케이션**입니다. 사용자 친화적인 UI를 제공하며, 여행 일정을 공유하고, 사진 및 글을 등록할 수 있습니다.

---

## 🌟 주요 기능

- ✍️ **여행 글 작성/편집(관리자만 가능)**  
  - Toast UI 기반의 에디터로 텍스트, 이미지, 마크다운 형식 작성 가능
  - 이미지 파일 수정도 가능

- 🖋 **방명록 작성**
  - 각 여행기의 아랫 부분에 Toast UI 기반의 에디터로 작성 가능

- 📅 **여행 일정 등록/캘린더 시각화**  
  - FullCalendar를 이용해 여행 일정을 쉽게 등록 및 조회

- 📸 **이미지 업로드 및 슬라이드 보기**  
  - Swiper를 활용한 사진 슬라이드 쇼 제공

- 🌍 **국가/도시 선택 및 플래그 아이콘 지원**  
  - emoji-flags 및 react-flags로 국가 표시

- 🔐 **방명록 작성 시 사용되는 reCAPTCHA**  
  - Google reCAPTCHA로 자동 등록 방지

- 🗂️ **게시글 목록 및 상세 페이지**  
  - React Router 기반의 동적 라우팅 구현

- 📂 **파일 업로드 지원**  
  - MUI File Input을 활용해 사진 업로드

- 🗺️ **📡 한국관광공사 관광정보 API 연동**  
  - 공공데이터 포털의 한국관광공사 API를 사용해  
    **실시간 여행지 정보**, **지역별 관광지**, **카테고리별 명소**를 탐색 가능

---

## 🔧 주요 기술 스택

- **React 19**: 최신 React 기반 SPA 구조
- **Material UI (MUI)**: 고급 UI 컴포넌트 제공
- **Emotion / Styled-Components**: CSS-in-JS 스타일링
- **React Router v7**: 페이지 라우팅
- **Axios**: API 통신
- **FullCalendar**: 여행 일정 달력 표시
- **Toast UI Editor**: Markdown 기반 에디터
- **Swiper**: 이미지/슬라이더 UI 구현
- **reCAPTCHA**: Google reCAPTCHA 통합
- **한국관광공사 API** – 여행지 정보 제공 (공공데이터)

---

## 📦 주요 의존성

| 라이브러리 | 설명 |
|------------|------|
| `@mui/material` | 구글 머티리얼 UI 컴포넌트 |
| `styled-components` | 스타일을 컴포넌트 수준으로 구성 |
| `@toast-ui/react-editor` | 마크다운 및 WYSIWYG 지원 에디터 |
| `@fullcalendar/react` | 풀캘린더로 여행 일정을 시각화 |
| `swiper` | 터치 기반 슬라이더 지원 |
| `react-router-dom@7` | SPA 라우팅 처리 |
| `axios` | REST API 통신 처리 |
| `react-icons` | 다양한 아이콘 사용 가능 |
| `react-google-recaptcha` | reCAPTCHA 인증 기능 |

---

## ▶️ 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 빌드
npm run build

# 테스트
npm test
```

---

## 📁 프로젝트 구조

```
travelblog_front/
├── public/
│      ├── css
│      ├── data
│      ├── flags-iso
│      ├── fonts
│      ├── images
│      ├── index.html
│      └── robots.txt
├── src/
│    ├── admincomp/
│    │       ├── AdminGuestBookList.jsx
│    │       ├── AdminPhotoList.jsx
│    │       ├── AdminTravelForm.jsx
│    │       └── AdminTravelList.jsx
│    ├── api/ 
│    │    ├── area.js
│    │    ├── contentTypes.js
│    │    ├── convertToHtml.js
│    │    ├── detail.js
│    │    └── regions.js
│    ├── components/ 
│    │        ├── travels
│    │        │      ├── AreaBar.jsx
│    │        │      ├── EventCalendar.jsx
│    │        │      ├── GuestBookItem.jsx
│    │        │      ├── MapView.jsx
│    │        │      ├── PetFilterBar.jsx
│    │        │      ├── PlaceCard.jsx
│    │        │      └── SearchBar.jsx
│    │        ├── AsideNav.jsx
│    │        ├── Copyright.jsx
│    │        ├── FooterMain.jsx
│    │        ├── getFlagByNationName.js
│    │        ├── GuestBook.jsx
│    │        ├── GuestBookList.jsx
│    │        ├── Hero.jsx
│    │        ├── Icons.jsx
│    │        ├── KakaoScript.jsx
│    │        ├── LoginModal.jsx
│    │        ├── LogoutModal.jsx
│    │        ├── MainContext.jsx
│    │        ├── Menu.jsx
│    │        ├── RightSide.jsx
│    │        ├── Script.jsx
│    │        ├── ScrollTop.jsx
│    │        └── TravelCard.jsx
│    ├── context/
│    │      ├── AuthContext.jsx
│    │      └── NationContext.jsx
│    ├── css/ 
│    ├── pages/ 
│    │     ├── travels
│    │     │     ├── AreaList.jsx
│    │     │     └── DetailView.jsx
│    │     ├── AboutMe.jsx
│    │     ├── Admin.jsx
│    │     ├── ContentView.jsx
│    │     ├── Footer.jsx
│    │     ├── Header.jsx
│    │     ├── List.jsx
│    │     ├── Main.jsx
│    │     └── Photos.jsx
│    ├── routes/
│    │     └── AdminRoute.jsx
│    ├── App.js
│    ├── App.test.js
│    ├── index.js
│    └── setupTests.js
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── yarn.lock
```

---

## 📌 TODO (향후 예정 기능)

- 여행 사진 페이지 추가
- 그에 따른 관리자 페이지 내의 여행 사진 관리 페이지도 추가
- 국내 여행 정보 찜하기 기능 추가
- SNS 연동
- Footer 부분의 contact me 연결 페이지 설정

---

## 📄 라이선스

MIT 라이선스 (MIT License)

저작권 (c) 2025 ca1yp2

본 프로젝트는 학습 및 개인 포트폴리오 용도로 제작되었습니다. 본 소프트웨어 및 관련 문서 파일(이하 "소프트웨어")을 무상으로 획득한 모든 사람에게 소프트웨어를 제한 없이 사용, 복사, 수정, 병합, 출판, 배포, 서브라이선스 및 판매할 권리를 허가합니다.

단, 위 저작권 표시와 이 허가 표시를 소프트웨어의 모든 복사본 또는 중요한 부분에 포함시켜야 합니다.

본 소프트웨어는 상품성, 특정 목적 적합성 및 비침해에 대한 보증 없이 "있는 그대로" 제공됩니다. 저작권자 또는 저작권 보유자는 소프트웨어 사용 또는 기타 거래와 관련하여 발생하는 어떠한 청구, 손해 또는 기타 책임에 대해서도 책임을 지지 않습니다.

---

MIT License

Copyright (c) 2025 ca1yp2

This project was created for learning and personal portfolio purposes. Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.