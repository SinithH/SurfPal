const express = require('express');
const { VertexAI } = require('@google-cloud/vertexai');

const app = express();

// Initialize VertexAI with your Cloud project and location
const vertex_ai = new VertexAI({ project: 'your-project-id', location: 'your-location' });
const model = 'your-model-id'; // Specify your model ID

// Instantiate the model
const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: model,
    generation_config: {
        "max_output_tokens": 2048,
        "temperature": 0.4,
        "top_p": 1,
        "top_k": 32
    },
    safety_settings: [
        { "category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
        { "category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
        { "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
        { "category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" }
    ]
});

// Route for generating content
app.get('/generate-content', async (req, res) => {
    try {
        const reqData = {
            contents: [{ role: 'user', parts: [] }],
        };

        const streamingResp = await generativeModel.generateContentStream(reqData);
        const generatedContent = [];

        for await (const item of streamingResp.stream) {
            generatedContent.push(item);
        }

        const aggregatedResponse = await streamingResp.response;
        res.json({ generatedContent, aggregatedResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
