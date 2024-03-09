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
    data = extract_tags(remove_unwanted_tags(content))
    return {"url": content,"data": data}


