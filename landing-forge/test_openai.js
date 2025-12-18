require('dotenv').config({ path: '.env.local' });
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
    console.log('Testing Key:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing');
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Use 3.5 for cheap/fast test
            messages: [{ role: "user", content: "Say hello" }],
        });
        console.log('Success:', completion.choices[0].message.content);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

test();
