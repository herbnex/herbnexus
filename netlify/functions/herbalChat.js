require('dotenv').config();
const axios = require('axios');

exports.handler = async function(event, context) {
    if (event.httpMethod === 'OPTIONS') {
        // To handle preflight
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            },
            body: ''
        };
    }

    console.log('Received body:', event.body);

    if (!event.body) {
        console.error('No data received in the body');
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            },
            body: JSON.stringify({ error: "No data provided" })
        };
    }

    let userQuery;
    try {
        userQuery = JSON.parse(event.body).query;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            },
            body: JSON.stringify({ error: "Invalid JSON input" })
        };
    }

    if (!userQuery) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            },
            body: JSON.stringify({ error: "Query not specified in the request" })
        };
    }

    const data = {
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userQuery }
        ],
        max_tokens: 150
    };

    const config = {
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', data, config);

        if (!response.data || !response.data.choices || response.data.choices.length === 0) {
            console.error('Invalid response structure from OpenAI', response);
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                },
                body: JSON.stringify({ error: 'Invalid response from OpenAI' })
            };
        }

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            },
            body: JSON.stringify({ answer: response.data.choices[0].message.content })
        };
    } catch (error) {
        console.error('Error calling the OpenAI API:', error.response ? error.response.data : error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            },
            body: JSON.stringify({ error: 'Internal Server Error. Please try again later.', details: error.message })
        };
    }
};
