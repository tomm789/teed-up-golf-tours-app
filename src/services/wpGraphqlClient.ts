import { env, assertEnv } from '@/lib/env';

type GraphQLRequestOptions = {
  query: string;
  variables?: Record<string, any>;
};

export class WPGraphQLClient {
  private endpoint: string;

  constructor() {
    const graphqlUrl = assertEnv(env.wp.graphqlUrl || `${env.wp.baseUrl?.replace(/\/$/, '')}/graphql`, 'Missing WordPress GraphQL URL (VITE_WP_GRAPHQL_URL or REACT_APP_WP_GRAPHQL_URL)');
    this.endpoint = graphqlUrl;
  }

  async request<T>({ query, variables }: GraphQLRequestOptions): Promise<T> {
    const res = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`WPGraphQL request failed: ${res.status} ${text}`);
    }
    const json = await res.json();
    if (json.errors?.length) {
      throw new Error(json.errors.map((e: any) => e.message).join('; '));
    }
    return json.data as T;
  }
}


