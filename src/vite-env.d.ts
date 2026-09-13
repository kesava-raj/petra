/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VAPI_PUBLIC_KEY?: string;
  readonly VITE_VAPI_ASSISTANT_ID?: string;
  readonly VITE_AGENT_PETTRA_PHONE_NUMBER?: string;
  readonly VITE_PETRA_PHONE_NUMBER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
