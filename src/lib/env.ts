// Environment helper to read endpoints from Vite (VITE_*) or CRA-style (REACT_APP_*)

type EnvValue = string | undefined;

function readEnv(keyVite: string, keyCRA: string): string | undefined {
  const viteVal = (import.meta as any)?.env?.[keyVite] as EnvValue;
  const craVal = (typeof process !== 'undefined' ? (process as any)?.env?.[keyCRA] : undefined) as EnvValue;
  return viteVal ?? craVal ?? undefined;
}

export const env = {
  wp: {
    baseUrl: readEnv('VITE_WP_URL', 'REACT_APP_WP_URL') || '',
    graphqlUrl: readEnv('VITE_WP_GRAPHQL_URL', 'REACT_APP_WP_GRAPHQL_URL') || '',
    restUrl: readEnv('VITE_WP_REST_URL', 'REACT_APP_WP_REST_URL') || '',
  },
  wc: {
    baseUrl: readEnv('VITE_WC_STORE_URL', 'REACT_APP_WC_STORE_URL') || '',
    consumerKey: readEnv('VITE_WC_CONSUMER_KEY', 'REACT_APP_WC_CONSUMER_KEY') || '',
    consumerSecret: readEnv('VITE_WC_CONSUMER_SECRET', 'REACT_APP_WC_CONSUMER_SECRET') || '',
  },
  forms: {
    gfApiKey: readEnv('VITE_GF_API_KEY', 'REACT_APP_GF_API_KEY') || '',
  }
};

export function assertEnv(value: string, message: string): string {
  if (!value) {
    throw new Error(message);
  }
  return value;
}


