import INavigationResponse from "@/interfaces/navigation-resopnse.interface";

export async function getNavigationLinks(script: string, url: string, data: { [url: string]: INavigationResponse }) {
  if(data[url]) { 
    return data[url];
  }
  return await fetchLinks(script, url);
}

const fetchLinks = async (script: string, url: string) => {
  try {
    if (!script || !url) {
      return;
    }
    const result = await fetch(import.meta.env.VITE_NAVIGATION_URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_NAVIGATION_AUTH_TOKEN
      },
      body: JSON.stringify({
        content: script,
        url
      })
    })
    if (result.status !== 200) {
      throw new Error('failed to fetch')
    }
    const response: INavigationResponse = await result.json()
    return response;
  } catch (error) {
    console.error(error);
  }
}