import {test, expect} from "../fixtures/apiFixtures";

test.describe('Store API', () => {
    let createdOrderId;
    const invalidOrderId = 10101010101010;

    test.beforeEach(async ({apiClient, storeData}) => {
        const newOrder = {
            ...storeData.validOrder,
            id: Math.floor(Math.random() * 1000000)
        };

        const response = await apiClient.post('/store/order', newOrder, 200);
        const order = await response.json();
        createdOrderId = order.id;
        console.log(`Order created with id: ${createdOrderId}`);
    })

    test('[POST] - Place a new order in the store', async ({apiClient, storeData}) => {
        let response;

        const newOrder = {
            ...storeData.validOrder,
            id: Math.floor(Math.random() * 1000000)
        };

        await test.step('Sending request to place a new order', async () => {
            response = await apiClient.post('/store/order', newOrder, 200);
        });

        await test.step('Checking response for place a new order', async () => {
            const order = await response.json();
            expect(response.status()).toBe(200);
            expect(order.id).toBe(newOrder.id);
            expect(order.petId).toBe(storeData.validOrder.petId);
            expect(order.status).toBe(storeData.validOrder.status);

            createdOrderId = order.id;
            console.log(`Order created with id: ${createdOrderId}`);
        });
    });

    test('[GET] - Find placed order by ID', async ({apiClient}) => {
        let response;

        await test.step('Sending request to find latest order by ID', async () => {
            response = await apiClient.get(`/store/order/${createdOrderId}`, 200);
        });

        await test.step('Validating response for find latest order by ID', async () => {
            const order = await response.json();

            expect(response.status()).toBe(200);
            expect(order.id).toBe(createdOrderId);
        });
    });

    test('[GET] - Find placed order by ID (invalid ID)', async ({apiClient}) => {
        let response;
        await test.step('Sending request to find latest order by ID (invalid ID)', async () => {
            response = await apiClient.get(`/store/order/${invalidOrderId}`, 404);
        });

        await test.step('Validating response for find latest order by ID (invalid ID)', async () => {
            expect(response.status()).toBe(404);
            const responseBody = await response.json();
            expect(responseBody.code).toBe(1);
            expect(responseBody.message).toBe('Order not found');
        });
    });
})