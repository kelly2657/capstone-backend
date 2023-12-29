import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Auth({ social }) {
  const [data, setData] = useState();
  let temp = '';
  // useEffect(() => {
  //   axios
  //     .get('http://3.34.108.172/kakao')
  //     .then((res) => setData(JSON.stringify(res)))
  //     .catch((err) => console.error('에러:', err));
  // }, []);
  fetch('http://3.34.108.172/').then((res) => setData(JSON.stringify(res)));
  return (
    <div class="res">
      <p>{data ? data : 'ㅂㅇ'}</p>
    </div>
  );
}
