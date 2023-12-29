import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import ProfileRight from '../components/profileComponents/ProfileRight';

export default function Scheduler() {
  return (
    <div>
      <ProfileRight />
    </div>
  );
}

// 쿼리스트링으로 axios 에러 해결하기
