import * as React from 'react';
import axios from 'axios';
import useAuthActions from './hooks/useAuthAction';

export default function KakaoCallback() {
  const { authorize } = useAuthActions();
  const getUser = async () => {
    try {
      /* 인가 코드 발급 */
      const code = new URL(window.location.href).searchParams.get('code');
      const grantType = 'authorization_code';
      // const REST_API_KEY = process.env.REACT_APP_REST_API_KEY_KAKAO;
      const REST_API_KEY = '50e0a36d16e7640df3908f7f6406099c'
      const REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';
      console.log(code)
      /* Access Token 발급 */
      const res = await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        // `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`,
        {},
        { headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' } },
      );
      console.log('성공')

      const { access_token } = res.data;
      const kakao = await axios.post(
        `https://kapi.kakao.com/v2/user/me`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      );
      console.log(kakao);
      const email = kakao.data.kakao_account.email;
      const name = kakao.data.properties.nickname;
      const profile_image = kakao.data.properties.profile_image || '';
      const sign_in_form = {
        "email": email,
        "social": "kakao"
      }
      const sign_up_form = {
        "email": email,
        "social": "kakao",
        "name": name,
        "photo_url": profile_image
      }

      try {
        let foo = await axios.post(
          "http://3.34.108.172/user/signin",
          JSON.stringify(sign_in_form),
          {headers: {"Content-Type": 'application/json'}}
        )
        console.log('데이터 O >>> 로그인합니다.');
        authorize({
          uid: foo.data.id,
        });
        window.location.reload();
      }
      catch(error) {
        if (error.response.status === 404) {
          console.log('데이터 X >>> 회원가입합니다.');
          let foo = await axios.post(
            "http://3.34.108.172/user/signup",
            JSON.stringify(sign_up_form),
            {headers: {"Content-Type": 'application/json'}}
          );
          authorize({
            uid: foo.data.id,
          });
          window.location.reload();
        }
      }

    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);
  return <></>;
}
