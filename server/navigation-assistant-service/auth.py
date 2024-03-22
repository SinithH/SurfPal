from fastapi.security.api_key import APIKeyHeader
from fastapi import Security, HTTPException
from starlette.status import HTTP_403_FORBIDDEN
from dotenv import dotenv_values

api_token = dotenv_values(".env")['AUTH_TOKEN']
api_key_header = APIKeyHeader(name="X-API-KEY", auto_error=False)

async def get_api_key(api_key_header: str = Security(api_key_header)):
    if api_key_header == api_token:
        return api_key_header
    else:
        raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail="Could not validate credentials")