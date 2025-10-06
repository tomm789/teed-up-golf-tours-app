import { env, assertEnv } from '@/lib/env';

export class WooService {
  private baseUrl: string;

  constructor() {
    const base = assertEnv(env.wc.baseUrl, 'Missing WooCommerce base URL (VITE_WC_STORE_URL or REACT_APP_WC_STORE_URL)');
    this.baseUrl = base.replace(/\/$/, '');
  }

  async getStoreNonce(): Promise<string> {
    // In real implementation, retrieve a nonce/cookie via a REST endpoint or pre-injected token
    return '';
  }

  async initiateBooking(productId: string, variationId?: string): Promise<void> {
    const nonce = await this.getStoreNonce();
    const res = await fetch(`${this.baseUrl}/wp-json/wc/store/v1/cart/add-item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(nonce ? { 'Nonce': nonce } : {})
      },
      body: JSON.stringify({ id: productId, quantity: 1, variation_id: variationId })
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Woo add-item failed: ${res.status} ${text}`);
    }
    const json = await res.json();
    const cartUrl = json?.cart_url || `${this.baseUrl}/cart`;
    window.location.href = `${cartUrl}/checkout`;
  }
}


