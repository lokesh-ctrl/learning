import requests
from bs4 import BeautifulSoup
import os
import re

# --- Configuration ---
# Directory to save the text files
SAVE_DIR = "data" 
# List of URLs you want to scrape
URLS_TO_SCRAPE = [
    # Python
    "https://docs.python.org/3/tutorial/controlflow.html",
    "https://docs.python.org/3/tutorial/datastructures.html",
    "https://realpython.com/python-pep8/",
    # Django
    "https://docs.djangoproject.com/en/stable/intro/tutorial01/",
    "https://docs.djangoproject.com/en/stable/topics/db/models/",
    "https://www.django-rest-framework.org/tutorial/1-serialization/",
    # SQL
    "https://sqlbolt.com/lesson/select_queries_introduction",
    "https://sqlbolt.com/lesson/joins",
    "https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-window-function/"
]

def scrape_and_save(url, save_directory):
    """
    Scrapes the main text content from a URL and saves it to a text file.
    """
    try:
        print(f"Fetching {url}...")
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status() # Raise an exception for bad status codes

        # Use BeautifulSoup to parse the HTML
        soup = BeautifulSoup(response.content, 'html.parser')

        # --- Attempt to find the main content ---
        # Heuristics: Main content is often in <article>, <main>, or a div with id="content"
        main_content = soup.find('article') or soup.find('main') or soup.find(id='content') or soup.body
        
        if not main_content:
            print(f"Could not find a main content tag for {url}. Using the whole body.")
            main_content = soup.body

        # Get all the text from the main content
        text = main_content.get_text(separator='\n', strip=True)

        # --- Clean up the text ---
        # Create a simple, valid filename from the URL
        filename = re.sub(r'https?://', '', url)
        filename = re.sub(r'[^a-zA-Z0-9_-]', '_', filename) + ".txt"
        filepath = os.path.join(save_directory, filename)

        print(f"Saving content to {filepath}...")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(text)

    except requests.RequestException as e:
        print(f"Error fetching URL {url}: {e}")
    except Exception as e:
        print(f"An error occurred while processing {url}: {e}")


if __name__ == "__main__":
    # Create the save directory if it doesn't exist
    if not os.path.exists(SAVE_DIR):
        os.makedirs(SAVE_DIR)

    # Scrape all configured URLs
    for url in URLS_TO_SCRAPE:
        scrape_and_save(url, SAVE_DIR)
        print("-" * 20)
    
    print("Scraping complete!")