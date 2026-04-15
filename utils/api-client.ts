import { APIRequestContext, APIResponse } from '@playwright/test';

export interface ProductItem {
  id?: string;
  name: string;
}

export class ApiClient {
  private readonly request: APIRequestContext;
  private readonly apiBaseUrl: string;

  constructor(request: APIRequestContext, apiBaseUrl: string) {
    this.request = request;
    this.apiBaseUrl = apiBaseUrl.replace(/\/$/, '');
  }

  private async getFirstSuccessfulResponse(urls: string[]): Promise<APIResponse> {
    for (const url of urls) {
      const response = await this.request.get(url);
      if (response.ok()) {
        const contentType = response.headers()['content-type'] || '';
        if (contentType.includes('application/json')) {
          return response;
        }
      }
    }

    throw new Error(`No successful JSON API response for URLs: ${urls.join(', ')}`);
  }

  async getCatalogProducts(): Promise<ProductItem[]> {
    const response = await this.getFirstSuccessfulResponse([
      `${this.apiBaseUrl}/products`,
      `${this.apiBaseUrl}/api/products`,
      `${this.apiBaseUrl}/products?page=1`,
    ]);
    const body = (await response.json()) as { data?: ProductItem[] } | ProductItem[];

    if (Array.isArray(body)) {
      return body;
    }

    return body.data ?? [];
  }
}
