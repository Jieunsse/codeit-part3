import { useEffect } from 'react';
import { useLoginForm } from './hooks/useLoginForm';

export default function OAuthKakaoCallback() {
  const { socialLogin } = useLoginForm();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');

    if (!code) return;

    socialLogin('KAKAO', {
      code,
      redirectUri: window.location.origin + '/oauth/kakao',
      state: state ?? undefined,
    });
  }, [socialLogin]);

  return <div>카카오 로그인 처리 중...</div>;
}
