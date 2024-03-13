
import getpass
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
from scrape import ascrape_playwright

load_dotenv()

if "GOOGLE_API_KEY" not in os.environ:
    os.environ["GOOGLE_API_KEY"] = getpass.getpass("Provide your Google API Key")

url = 'https://www.wsj.com'

if __name__ == '__main__':    
    llm = ChatGoogleGenerativeAI(model="gemini-pro")
    result = llm.invoke("Get the navigation links from the below HTML source code:")
    print(result.content)


