from pydantic import BaseModel
from fastapi import FastAPI
from scrape import extract, remove_unwanted_tags
from auth import get_api_key
from fastapi import Security, FastAPI

class Content(BaseModel):
    content: str
    url: str
    
app = FastAPI()

@app.post("/navigation")
def read_root(content: Content, api_key: str = Security(get_api_key)): 
    navigation_links, content_links = extract(remove_unwanted_tags(content.content), content.url)
    return {"data": {"navigation": navigation_links, "content": content_links}}


