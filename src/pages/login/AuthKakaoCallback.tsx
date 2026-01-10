import { useEffect } from 'react';
import { useLoginForm } from './hooks/useLoginForm';

export default function OAuthKakaoCallback() {
  const { socialLogin } = useLoginForm();

  useEffect(() => {
    // 1. URL 주소창에서 카카오가 보내준 인가 코드(code)와 상태값(state)을 가져옵니다.
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');

    // 코드가 없으면 중단합니다.
    if (!code) return;

    // 2. socialLogin 함수를 호출하여 서버에 로그인을 요청합니다.
    socialLogin('KAKAO', {
      // 핵심: 'code'라는 변수값을 서버가 인식하는 'token'이라는 키 이름에 담아 보냅니다.
      // 이렇게 하면 ts(2353) 에러가 사라집니다.
      token: code,
      // 카카오 개발자 콘솔에 등록한 Redirect URI와 정확히 일치해야 합니다.
      redirectUri: window.location.origin + '/oauth/kakao',
      state: state ?? undefined,
    });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg font-medium">카카오 로그인 처리 중입니다...</p>
    </div>
  );
}
