import asyncio
import pprint

from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

def remove_unwanted_tags(html_content, unwanted_tags=["script", "style"]):
    """
    This removes unwanted HTML tags from the given HTML content.
    """
    soup = BeautifulSoup(html_content, 'html.parser')

    for tag in unwanted_tags:
        for element in soup.find_all(tag):
            element.decompose()

    return str(soup)


def extract_tags(html_content):
    """
    This takes in HTML content and a list of tags, and returns a string
    containing the text content of all elements with those tags, along with their href attribute if the
    tag is an "a" tag.
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    navigation_links = []    
    content_links = []
    elements = soup.find_all('a')
    for element in elements:
        href = element.get('href')
        if not href:
            continue
        url = href.strip()
        extracted_link = {
            element.get_text().strip(): url
        }
        if check_navigation_links(url) == True:
            navigation_links.append(extracted_link)
            continue
        content_links.append(extracted_link)

    return (navigation_links, content_links)

def check_navigation_links(link): 
    if link.startswith('/'): 
        return True
    return False    

def remove_unnecessary_lines(content):
    # Split content into lines
    lines = content.split("\n")

    # Strip whitespace for each line
    stripped_lines = [line.strip() for line in lines]

    # Filter out empty lines
    non_empty_lines = [line for line in stripped_lines if line]

    # Remove duplicated lines (while preserving order)
    seen = set()
    deduped_lines = [line for line in non_empty_lines if not (
        line in seen or seen.add(line))]

    # Join the cleaned lines without any separators (remove newlines)
    cleaned_content = "".join(deduped_lines)

    return cleaned_content


async def ascrape_playwright(url) -> str:
    print("Started scraping...")
    results = ""
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        try:
            page = await browser.new_page()
            await page.goto(url, timeout=90000)

            page_source = await page.content()
   
            # results = remove_unnecessary_lines(extract_tags(remove_unwanted_tags(
            #     page_source)))
            results = extract_tags(remove_unwanted_tags(
                page_source))
            print("Content scraped")
        except Exception as e:
            results = f"Error: {e}"
        await browser.close()
    return results


# TESTING
if __name__ == "__main__":
    url = "https://www.patagonia.ca/shop/new-arrivals"

    async def scrape_playwright():
        results = await ascrape_playwright(url)
        print(results)

    pprint.pprint(asyncio.run(scrape_playwright()))
