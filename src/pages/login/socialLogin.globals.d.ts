export {};

type GoogleCredentialResponse = {
  credential?: string;
};

type GoogleAccountsId = {
  initialize: (options: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
  }) => void;
  prompt: () => void;
};

type GoogleAccounts = {
  id: GoogleAccountsId;
};

type GoogleNamespace = {
  accounts: GoogleAccounts;
};

type KakaoAuth = {
  login: (options: {
    scope?: string;
    success: (authObj: { access_token?: string }) => void;
    fail: (err: unknown) => void;
  }) => void;
  getAccessToken?: () => string | null;
};

type KakaoNamespace = {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Auth: KakaoAuth;
};

declare global {
  interface Window {
    google?: GoogleNamespace;
    Kakao?: KakaoNamespace;
  }
}
