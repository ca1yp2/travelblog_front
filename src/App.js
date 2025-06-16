import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './pages/Header'
import AboutMe from './pages/AboutMe'
import Footer from './pages/Footer'
import Main from './pages/Main'
import Photos from './pages/Photos'
import List from './pages/List'
import ContentView from './pages/ContentView'
import LoginModal from './components/LoginModal'
import Admin from './pages/Admin'
import AdminRoute from './routes/AdminRoute'
import ScrollTop from './components/ScrollTop'
//import Kakao from './pages/Kakao'
/** 국내 여행 정보 */
import AreaList from './pages/travels/AreaList'
import DetailView from './pages/travels/DetailView'

const App = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const handleFooterClick = () => {
    setLoginOpen(true);
  }

  return (
    <Router>
      <ScrollTop />
      <AuthProvider>
        <Header />
          <Routes>
            <Route index element={<Main />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/photo" element={<Photos />} />
            <Route path="/list" element={<List />} />
            <Route path="/view/:id" element={<ContentView />} />
            <Route path="/admin/*" element={<AdminRoute><Admin /></AdminRoute>} />
            {/* <Route path="/kakao" element={<Kakao />} /> */}
            <Route path="/arealist" element={<AreaList />} />
            <Route path="/detail/:id" element={<DetailView />} />
          </Routes>
        <Footer onFooterClick={handleFooterClick} />
        <LoginModal open={loginOpen} setOpen={setLoginOpen} />
      </AuthProvider>
    </Router>
  )
}

export default App