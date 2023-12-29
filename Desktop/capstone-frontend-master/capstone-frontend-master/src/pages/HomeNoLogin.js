import * as React from 'react';
import '../main.css';
import Divider from '@mui/material/Divider';
import SocialButton from '../components/signComponents/SocialButton';

export default function HomeNoLogin() {
  return (
    <>
      <div>
        <div style={{textAlign:"center"}}>
          <h1>더 쉬운 노트정리, 더 편한 학습</h1>
          <h4> 
            📝 마크다운으로 더 쉬워진 노트 편집을 이용해보세요.<br/>
            📨 그룹 채팅을 통해 학습 능률을 올려보세요.<br/>
            📆 캘린더를 사용해 체계적인 주별, 월별 일정 관리를 해보세요.<br/>
            🥸 개인 프로필을 꾸며보세요.<br/>
          </h4>
        </div>
      </div>
      <Divider variant="middle" />
      <section style={{textAlign:'center'}}>
        <SocialButton social="kakao" />
      </section>
    </>
  );
}
