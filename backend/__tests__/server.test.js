
const request = require('supertest');
const { addUser } = require('../server');  // Adjust the path accordingly
// const { addUser } = require('../path/to/your/server');
describe('addUser function', () => {
    test('should always return true', async () => {
        // Call the addUser function with any user data
        const result = await addUser({
            fullName: 'John Doe',

        });

        // Assertion
        expect(result).toBe(true);
    });
});