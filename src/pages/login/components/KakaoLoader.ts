// KakaoLoader.ts
export async function ensureKakaoReady(): Promise<{
  Auth: { authorize: (options: { redirectUri: string; state?: string }) => void };
  init: (key: string) => void;
  isInitialized: () => boolean;
}> {
  const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY;
  if (!KAKAO_JS_KEY) throw new Error('KAKAO_JS_KEY missing');

  await loadScript('https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js', 'kakao-sdk');

  if (!window.Kakao) throw new Error('Kakao SDK missing');

  // @ts-expect-error: 공식 Kakao SDK 타입과 충돌하므로 최소 기능만 캐스팅
  const kakao = window.Kakao as {
    init: (key: string) => void;
    isInitialized: () => boolean;
    Auth: { authorize: (options: { redirectUri: string; state?: string }) => void };
  };

  if (!kakao.isInitialized()) kakao.init(KAKAO_JS_KEY);

  return kakao;
}

function loadScript(src: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) return resolve();
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}
