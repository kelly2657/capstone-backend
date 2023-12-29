import React from 'react';

import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/headerComponents/Header';
// 로그인 안된 경우 헤더
import HeaderNoLogin from './components/headerComponents/HeaderNoLogin'

import Home from './pages/Home';
import HomeNoLogin from './pages/HomeNoLogin';
import User from './pages/User';
import Notes from './pages/Notes';
import Note from './pages/Note';
import Notecreate from './pages/Notecreate';
import Groups from './pages/Groups/Groups';
import Join from './pages/Groups/Join';
import Tools from './pages/Tools';
import NotFound from './pages/NotFound';

import GroupCarousel from './components/groupsComponents/GroupsCarousel'
import Scheduler from './pages/Scheduler'

import KakaoCallback from './KakaoCallback';


import useUser from './hooks/useUser';


export default function App() {

  const user = useUser()

  return (
    <BrowserRouter>
      {user ? (
        <Header />
      ) : (
        <HeaderNoLogin />
      )}
      <div className="main">
        <Routes>
          <Route path="/" element={user ? (<Home />) : (<HomeNoLogin />)} />
          <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
          <Route path="/notes" element={<Notes/>} />
          <Route path="/notes/:uid" element={<Notes/>} />
          <Route path="/notecreate" element={<Notecreate />} />


          <Route path="/group" element={<GroupCarousel />} />
          <Route path="/Scheduler" element={<Scheduler />} />


          {/* 아래는 안 쓰는 기능들 */}
          <Route path="/tools" element={<Tools />} />
          <Route path="/join" element={<Join />} />

          {/* 아래는 동적 라우팅 */}
          <Route path="/u/:uid" element={<User />} />
          <Route path="/note/:nid" element={<Note/>}/>
          <Route path="/g/:groupid" element={<Groups />} />

          {/* 404 Error */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}