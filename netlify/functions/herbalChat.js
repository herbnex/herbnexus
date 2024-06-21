require('dotenv').config();
const axios = require('axios');

exports.handler = async function(event, context) {
    if (event.httpMethod === 'OPTIONS') {
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

    if (!event.body) {
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

    const data = {
        model: "gpt-4o",
        messages: [
            { role: "system", content: "You are a knowledgeable and empathetic herbal doctor. Ask one short, specific question about the patient's condition at a time. Provide intermediate steps for both questions and answers. give a final herbal prescription, provide only one herbal formula, its duration, how to use it in one sentence, and its benefits in one sentence." },
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
