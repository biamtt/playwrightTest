import {test, expect} from "../fixtures/apiFixtures";

test.describe("Pet API", () => {
    let petId;

    test.beforeAll(async ({request}) => {
        const newPet = {
            id: Math.floor(Math.random() * 1000000),
            name: 'Vittorio',
            status: 'available',
            category: {
                id: 1,
                name: 'dog'
            },
            photoUrls: ['data:image/jpeg;base64,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'],
            tags: [{
                id: 3,
                name: 'tag3'
            }
            ]
        };

        const response = await request.post('https://petstore.swagger.io/v2/pet', {
            data: newPet,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        expect(response.status()).toBe(200);

        const pet = await response.json();
        petId = pet.id;
        console.log('Created pet ID:', petId)
    });

    test('[POST] - Create a new pet - positive flow', async ({apiClient, petData}) => {
        await test.step('Preparing data', async () => {
        });

        const newPet = {
            ...petData.validPet,
            id: Math.floor(Math.random() * 100000)
        };

        let response;
        await test.step('Sending POST request to create pet', async () => {
            response = await apiClient.post('/pet', newPet, 200);
        });

        await test.step('Validating response', async () => {
            const responseBody = await response.json();
            expect(response.status()).toBe(200);
            expect(responseBody.id).toBeDefined();
            expect(responseBody.name).toBe(newPet.name);
            expect(responseBody.status).toBe(newPet.status);
        })
    });

    test('[GET] - Get Pet by ID - positive flow', async ({apiClient, petData}) => {
        let response;

        await test.step(`Getting pet by ID ${petId}`, async () => {
            response = await apiClient.get(`/pet/${petId}`, 200);
        });

        await test.step('Validating response', async () => {
            const pet = await response.json();
            expect(response.status()).toBe(200);
            expect(pet.id).toBe(petId);
            expect(pet.name).toBe(petData.validPet.name);
            expect(pet.status).toBe(petData.validPet.status);
        });
    });

    test('[GET] - Get Pet by ID - negative flow', async ({apiClient}) => {
        let response;
        const invalidPetId = 1000000000;

        await test.step(`Getting pet by ID ${invalidPetId}`, async () => {
            response = await apiClient.get(`/pet/${invalidPetId}`, 404);
        });

        await test.step('Validating response', async () => {
            const responseBody = await response.json();
            expect(response.status()).toBe(404);
            expect(responseBody.code).toBe(1);
            expect(responseBody.type).toBe('error')
            expect(responseBody.message).toBe('Pet not found');
        });
    })

    test('[PUT] - Update an existing pet', async ({apiClient}) => {
        let updatedPet = {
            id: petId,
            name: 'Vittorio Super',
            status: 'sold',
            category: {
                id: 1,
                name: 'dog'
            },
            photoUrls: ['data:image/jpeg;base64,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'],
            tags: [{
                id: 1,
                name: 'tag1'
            }
            ]
        };

        let response;

        await test.step('Updating Pet details', async () => {
            response = await apiClient.put('/pet', updatedPet, 200);
        });

        await test.step('Validating updated pet data', async () => {
            const pet = await response.json();
            expect(response.status()).toBe(200);
            expect(pet.id).toBe(petId);
            expect(pet.name).toBe('Vittorio Super');
            expect(pet.status).toBe('sold');
        })
    })

    test.afterAll(async ({request}) => {
        if (petId) {
            await request.delete(`/pet/${petId}`);
            console.log('Pet ID Deleted: ', petId);
        }
    })
})