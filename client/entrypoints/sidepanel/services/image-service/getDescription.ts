import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from 'react-toastify';


const mimeTypes = [
    "image/png",
    "image/jpeg",
    "image/jpeg",
    "image/webp",
    "image/heic",
    "image/heif"
];

async function getImageDescription(imageUrl: string, genAI: GoogleGenerativeAI): Promise<string> {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = "can you describe this image ? use about 100 words";

    try {
        const image = await fileToGenerativePart(imageUrl);
        const result = await model.generateContent([prompt, image]);
        const response = await result.response;
        const fullResponse = await response.text();
        return fullResponse;
    }
    catch (error) {
        console.error('Error while getting image description:', error);
        throw error;
    }
}



async function fileToGenerativePart(imageUrl: string): Promise<any> {
    const response = await fetch(imageUrl);
    if (!response.ok) {
        toast.error('Failed to download image', { position: 'top-center', autoClose: 1000, hideProgressBar: true, pauseOnHover: false });
        throw new Error(`Failed to download image: ${response.statusText}`);
    }
    // console.log('response:', response)
    const blob = await response.blob();

    if (!mimeTypes.includes(blob.type)) {
        toast.error('Unsupported image type', { position: 'top-center', autoClose: 1000, hideProgressBar: true, pauseOnHover: false });
        throw new Error(`Unsupported image type: ${blob.type}`);
    }

    const base64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]);
            }
        };
        reader.readAsDataURL(blob);
    });
  
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: blob.type },
    };
  }
  
  export default getImageDescription;