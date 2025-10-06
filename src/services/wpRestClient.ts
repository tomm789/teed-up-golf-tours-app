import { env, assertEnv } from '@/lib/env';

export class WPRestClient {
  private restBase: string;

  constructor() {
    const restUrl = assertEnv(env.wp.restUrl || `${env.wp.baseUrl?.replace(/\/$/, '')}/wp-json`, 'Missing WordPress REST URL (VITE_WP_REST_URL or REACT_APP_WP_REST_URL)');
    this.restBase = restUrl.replace(/\/$/, '');
  }

  async get<T>(path: string, init?: RequestInit): Promise<T> {
    const url = `${this.restBase}${path.startsWith('/') ? '' : '/'}${path}`;
    const res = await fetch(url, {
      method: 'GET',
      ...init,
      headers: {
        'Accept': 'application/json',
        ...(init?.headers || {})
      }
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`WP REST GET ${url} failed: ${res.status} ${text}`);
    }
    return res.json();
  }
}


