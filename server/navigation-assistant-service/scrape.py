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


def extract(html_content, website_url):
    """
    This takes in HTML content and a list of tags, and returns a string
    containing the text content of all elements with those tags, along with their href attribute if the
    tag is an "a" tag.
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    
    result = extract_from_nav_elements(soup)
    if result != None: 
        return (result[0], result[1])
    
    result = extract_from_role_navigation(soup)
    if result != None: 
        return (result[0], result[1])
    
    return extract_from_logic(soup, website_url)
        
    

def extract_from_nav_elements(soup: BeautifulSoup):
    nav_element = soup.find('nav')
    if nav_element == None: 
        return None  
    nav_links = nav_element.find_all('a')  
    content_links = list(filter(lambda item: (item not in nav_links), soup.find_all('a')))
    
    return (format(nav_links), format(content_links)) 

def extract_from_role_navigation(soup: BeautifulSoup):
    navigation_element = soup.find(role="navigation")
    if navigation_element == None: 
        return None  
    nav_links = navigation_element.find_all('a')  
    content_links = list(filter(lambda item: (item not in nav_links), soup.find_all('a')))
    
    return (format(nav_links), format(content_links)) 

def extract_from_logic(soup: BeautifulSoup, website_url: str):
    navigation_elements = []    
    content_elements = []     
    elements = soup.find_all('a')
    for element in elements:
        if check_navigation_links(element, website_url) == True:
            navigation_elements.append(element)
            continue
        content_elements.append(element)

    return (format(navigation_elements), format(content_elements))

def format(elements):
    links = []    
    for element in elements:
        href = element.get('href')
        if not href:
            continue
        url = href.strip()
        extracted_link = {
            "text": element.get_text().strip(), "url": url
        }
        links.append(extracted_link)

    return links
        
def check_navigation_links(element: str, website_url: str):
    link = element.get('href')
    if link.startswith(website_url): 
        return True
    if link.startswith('//') == False and link.startswith('/') == True: 
        return True
    return False    

