import requests
from bs4 import BeautifulSoup
import nltk
from nltk.stem import PorterStemmer
import re
import random
import time

# Initialize the PorterStemmer
nltk.download("punkt")
stemmer = PorterStemmer()

# Declare URL prefix and keywords
url_part1 = "https://web.archive.org/web/"
url_part2 = "000000/http://www.debonairblog.com/blog/index.html?page="
keywords = ["kanchana", "wife", "malaysian"]
max_pages = 343  # Set maximum number of pages to loop through
min_page = 1
ignored_words = ["advice", "question", "joke", "answer", '"', "Q.", "?"]
search_years = ["2015", "2020"]
search_months = ["03", "09"]
search_days = ["07", "22"]
min_delay = 1
max_delay = 3

printed_lines = set()


def contains_ignored_words(line):
    for word in ignored_words:
        if word.lower() in line.lower():
            return True
    return False


# Function to get variations of keywords (e.g., run -> running, ran)
def get_keyword_variations(keyword):
    variations = set()
    variations.add(keyword)
    variations.add(stemmer.stem(keyword))  # Adds the stemmed version
    return variations


# Function to fetch page content and search for keywords
def search_keywords_in_page(url, keywords, retries=3, delay=2):
    attempt = 0
    while attempt < retries:
        try:
            response = requests.get(url, timeout=10)  # Adding a timeout
            response.raise_for_status()  # Check if request was successful
            response.encoding = "utf-8"
            soup = BeautifulSoup(response.text, "html.parser")

            page_text = soup.get_text(
                separator="\n", strip=True
            )  # Get the full text of the page
            foundMatch = False
            for line in page_text.splitlines():
                for keyword in keywords:
                    variations = get_keyword_variations(keyword)
                    for variation in variations:
                        # Use a case-insensitive search for the keyword or its variations
                        if re.search(
                            r"\b" + re.escape(variation) + r"\b", line, re.IGNORECASE
                        ):
                            if contains_ignored_words(line):
                                continue
                            if line in printed_lines:
                                continue
                            print(
                                f"Keyword '{variation}' found in line: {line}",
                                flush=True,
                            )
                            printed_lines.add(line)
                            foundMatch = True
            if foundMatch:
                print(f"{url}", flush=True)
                print("***********************************")

            return  # No keyword found, move to next page if no match
        except requests.exceptions.RequestException as e:
            attempt += 1
            if attempt < retries:
                time.sleep(delay)  # Wait before retrying
            else:
                print(f"Failed to fetch {url} after {retries} attempts.")


# Main function to loop through pages and search for keywords
def main():
    for year in search_years:
        for month in search_months:
            for day in search_days:
                for page_num in range(min_page, max_pages + 1):
                    url = f"{url_part1}{year}{month}{day}{url_part2}{page_num}"
                    search_keywords_in_page(url, keywords)

                    # Random delay between 1 and 3 seconds
                    delay = random.uniform(min_delay, max_delay)
                    time.sleep(delay)


# Run the script
if __name__ == "__main__":
    main()
