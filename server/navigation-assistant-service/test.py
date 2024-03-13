import asyncio

from scrape import ascrape_playwright

url = "https://www.patagonia.ca/shop/new-arrivals"
data = asyncio.run(ascrape_playwright(url))
print(data)

