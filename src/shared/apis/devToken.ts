export type DevTokens = {
  /** Bearer access token */
  accessToken?: string;
  /** refresh token (현재는 사용 안 함) */
  refreshToken?: string;
};

// 기본: 환경변수로 주입 (권장: .env.local에 VITE_DEV_ACCESS_TOKEN / VITE_DEV_REFRESH_TOKEN)
const fromEnv: DevTokens = {
  accessToken: import.meta.env.VITE_DEV_ACCESS_TOKEN,
  refreshToken: import.meta.env.VITE_DEV_REFRESH_TOKEN,
};

// 옵션: 로컬 전용 파일로 오버라이드 (gitignore 처리 권장)
// - 파일명: `devToken.local.ts`
// - export const DEV_TOKENS = { accessToken: '...', refreshToken: '...' }
const localModules = import.meta.glob('./devToken.local.ts', { eager: true }) as Record<
  string,
  { DEV_TOKENS?: DevTokens }
>;

const fromLocal = Object.values(localModules)[0]?.DEV_TOKENS ?? {};

export const DEV_TOKENS: DevTokens = {
  ...fromEnv,
  ...fromLocal,
};
