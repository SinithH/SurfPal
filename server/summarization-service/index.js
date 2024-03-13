const express = require('express');
//const { VertexAI } = require('@google-cloud/vertexai');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// Initialize Vertex with your Cloud project and location
//const vertex_ai = new VertexAI({ project: 'inbound-domain-415706', location: 'us-east4' });
// const model = 'gemini-1.0-pro-vision-001';

// Instantiate the models
// const generativeModel = vertex_ai.preview.getGenerativeModel({
//   model: model,
//   generation_config: {
//     "max_output_tokens": 2048,
//     "temperature": 0.4,
//     "top_p": 1,
//     "top_k": 32
//   },
//   safety_settings: [
//     {
//       "category": "HARM_CATEGORY_HATE_SPEECH",
//       "threshold": "BLOCK_MEDIUM_AND_ABOVE"
//     },
//     {
//       "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
//       "threshold": "BLOCK_MEDIUM_AND_ABOVE"
//     },
//     {
//       "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
//       "threshold": "BLOCK_MEDIUM_AND_ABOVE"
//     },
//     {
//       "category": "HARM_CATEGORY_HARASSMENT",
//       "threshold": "BLOCK_MEDIUM_AND_ABOVE"
//     }
//   ],
// });

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyBDEMB0-yQNWw1JbA5dt74aujGfjSBn9Lo');

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "Who are you?"

  const result = await model.generateContentStream(prompt);
  let text = '';
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }
  const response = await result.response;
  const textResp = response.text();
  return response
}

async function generateContent() {
  const req = {
    contents: [{ role: 'user', parts: [{ text: "who are you?" }] }],
  };
  try {
    const streamingResp = await generativeModel.generateContent(req)
    
    let aggregatedResponse = streamingResp.response;

    // for await (const item of streamingResp.stream) {
      
    //   aggregatedResponse += JSON.stringify(item);
    // }

    return aggregatedResponse;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error; // Re-throw the error to handle it in the route handler
  }
}

// Route for generating content
app.get('/generate-content', async (req, res) => {
  try {
    const generatedContent = await run();
    res.json({ content: generatedContent });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
