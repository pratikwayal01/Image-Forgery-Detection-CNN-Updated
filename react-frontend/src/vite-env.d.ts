/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_DESCRIPTION: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
