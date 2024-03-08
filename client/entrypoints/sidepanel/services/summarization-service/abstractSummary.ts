import { GoogleGenerativeAI } from "@google/generative-ai";


// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY|| '');

async function getAbstractSummary(textContent:any) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = textContent + " \n Summarize this webpage using the above text content scraped from the page"

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



export default getAbstractSummary