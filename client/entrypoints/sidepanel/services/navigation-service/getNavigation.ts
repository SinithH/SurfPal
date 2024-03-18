export async function getNavigationLinks(script: string, url: string) {
    return await fetchLinks(script, url)
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
      if (!result) {
        throw new Error('failed to fetch')
      }
      return (await result.json());
    } catch (error) {
      console.error(error);
    }
  }