from pydantic import BaseModel
from fastapi import FastAPI
from scrape import extract, remove_unwanted_tags

class Content(BaseModel):
    content: str
    url: str
    
app = FastAPI()

@app.post("/navigation")
def read_root(content: Content): 
    navigation_links, content_links = extract(remove_unwanted_tags(content.content), content.url)
    return {"data": {"navigation": navigation_links, "content": content_links}}


