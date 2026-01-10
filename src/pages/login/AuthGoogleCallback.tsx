// pages/login/AuthGoogleCallback.tsx
import { useEffect, useRef } from 'react';
import { useLoginForm } from './hooks/useLoginForm';

export default function OAuthGoogleCallback() {
  const { socialLogin } = useLoginForm();
  const isCalledRef = useRef(false);

  useEffect(() => {
    if (isCalledRef.current) return;

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');

    if (!code) {
      console.error('Google OAuth code가 없습니다.');
      return;
    }

    isCalledRef.current = true;

    console.log('OAuth callback 실행', code);

    (async () => {
      try {
        await socialLogin('GOOGLE', {
          token: code,
          redirectUri: window.location.origin + '/oauth/google',
          state: state ?? undefined,
        });
      } catch (e) {
        console.error('Google 로그인 실패', e);
      }
    })();
  }, []); // ✅ 의존성 배열 비움

  return <div>구글 로그인 처리 중...</div>;
}
