import ITop10NavigationAttribute from "@/interfaces/top-10-navigation-response.interface";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getTop10NavigationLinks(links: {
  text: string;
  url: string;
}[], 
url: string, 
existData: {
  [url: string]: ITop10NavigationAttribute[];
}) {
  if (existData[url]) { 
    return existData[url]
  }

  return await getDataFromModel(links, url)
}

async function getDataFromModel(links: {
  text: string;
  url: string;
}[], url: string) {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const linksString = links.map((row) => `'${row.url}'- '${row.text}'`).join()
  const prompt =
    `analyze the navigation links provided below from the '${url}' webpage. Your task is to identify and present the top 10 navigation links in a JSON format. The JSON should adhere to the following format for each link: \n
    {
      "title": "string",
      "URL": "string",
      "description": "string"
    } \n
    Ensure that the description for each link is concise, limited to 100 words or fewer.\n
    Navigation Links: ${linksString}`;
  const result = await model.generateContent(prompt);
  const response = result.response;
  const fullResponse = response.text()
  const dividedLinksAndDescription = await divideLinksAndDescription(fullResponse)

  return dividedLinksAndDescription;
}

async function divideLinksAndDescription(jsonString: string) {
  try {
    if (jsonString.includes('json')) {
      jsonString = jsonString.split('json')[1].split('```')[0];
    } else if(jsonString.includes('JSON')) {
      jsonString = jsonString.split('JSON')[1].split('```')[0];
    }
    const jsonData: ITop10NavigationAttribute[] = JSON.parse(jsonString);

    return jsonData;
  } catch (error) {
    console.error('Error while dividing summary and questions:', error);
  }
}
