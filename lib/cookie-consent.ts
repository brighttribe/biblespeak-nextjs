export interface ConsentState {
  statistics: boolean;
  advertising: boolean;
  ts: number;
}

const COOKIE_NAME = 'bs_consent';
const COOKIE_DAYS = 30;

export function getConsent(): ConsentState | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match.split('=').slice(1).join('='))) as ConsentState;
  } catch {
    return null;
  }
}

export function setConsent(state: Omit<ConsentState, 'ts'>): ConsentState {
  const full: ConsentState = { ...state, ts: Date.now() };
  const expires = new Date(Date.now() + COOKIE_DAYS * 864e5).toUTCString();
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(full))};expires=${expires};path=/;SameSite=Lax`;
  return full;
}
