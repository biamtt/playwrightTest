import {APIRequestContext, expect, APIResponse, test} from "@playwright/test";

export class ApiClient {
    constructor(private request: APIRequestContext, private baseUrl: string) {
    }

    private async sendRequest(method: 'post' | 'get' | 'put' | 'delete', path: string, data?: any, expectedStatus: number = 200): Promise<APIResponse> {
        const url = `${this.baseUrl}${path}`;
        let response: APIResponse;

        await test.step(`API ${method.toUpperCase()} request to ${path}`, async () => {
            const options = {data, headers: {'Content-Type': 'application/json'}};

            switch (method) {
                case 'post':
                    response = await this.request.post(url, options);
                    break;
                case 'get':
                    response = await this.request.get(url, options);
                    break;
                case 'put':
                    response = await this.request.put(url, options);
                    break;
                case 'delete':
                    response = await this.request.delete(url, options);
                    break;
                default:
                    throw new Error(`Unsupported method: ${method}`);
            }
            expect(response.status()).toBe(expectedStatus);
        });
        return response!;
    }

    async get(path: string, expectedStatus?: number) {
        return this.sendRequest('get', path, undefined, expectedStatus);
    }

    async post(path: string, data: any, expectedStatus?: number) {
        return this.sendRequest('post', path, data, expectedStatus);
    }

    async put(path: string, data: any, expectedStatus?: number) {
        return this.sendRequest('put', path, data, expectedStatus);
    }

    async delete(path: string, expectedStatus?: number) {
        return this.sendRequest('delete', path, undefined, expectedStatus);
    }
}