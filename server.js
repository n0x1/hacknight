const express = require('express');
const app = express();
const openai = require('openai');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');

openai.apiKey = 'sk-proj-3NEWGthBfRYdTCVQVPy4T3BlbkFJOXdX5Gq9XT2DqM6fARhI';

app.use(bodyParser.json());

app.get('/api', async (req, res) => {
    const { wasteItem } = req.body;
    // Perform analysis or interact with external APIs here
    try {
        console.log('Request received:', req.body);
        // Interaction with OpenAI API
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-3.5-turbo',
            prompt: `I have a ${wasteItem}. I chose to recycle it. Is this correct and sustainable? If not, please explain why in a concise response.`,
            max_tokens: 150,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${openai.apiKey}`,
                'content-type': 'application/json',
            }
        });

        // Send the response back to the client
        res.json({response});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});

// Serve static files
app.use(express.static(path.join(__dirname, '')));

// Start the server
const portNumber = 3000;
app.listen(portNumber, () => {
    console.log(`Server is running on http://localhost:${portNumber}`);
});