from pydantic import BaseModel
from fastapi import FastAPI
from scrape import extract_tags, remove_unwanted_tags

class Content(BaseModel):
    content: str
    
app = FastAPI()

@app.post("/navigation")
def read_root(content: Content): 
    if content == None: 
        return {"message": "the content wasn't provided."}
    navigation_links, content_links = extract_tags(remove_unwanted_tags(content.content))
    return {"data": {"navigation": navigation_links, "content": content_links}}


