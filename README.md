
This repository contains a Node.js script for extracting price data from a specific URL, processing the data, and storing the results in a JSON file. 
The script utilizes Puppeteer for web scraping, Winston for logging, and fs for file system operations.

# SETUP

Ensure you have Node.js installed on your system.
Clone this repository to your local machine.
Install dependencies by running npm install in the repository directory.

# EXECUTION

To execute the script, run the following command:

node crawler.js

# SCRIPT OVERVIEW

The script uses Puppeteer to navigate to the specified URL and extract price data from the page.
Winston is utilized for logging at different levels (info, error) to provide insights into the crawling and processing stages.
Basic data validation checks are implemented to ensure the integrity of the extracted data.
The processed data is stored in a JSON file named products.json in the same directory as the script.

# LOGGING

Logging messages are written to the console as well as to log files (error.log and combined.log) in the repository directory.
Error messages are descriptive and informative to aid in troubleshooting issues like network errors, parsing errors, or file system integration problems.

# FILE STRUCTURE

1. **crawler.js**: Main Node.js script for web data extraction and storage pipeline.
2. **error.log**: Log file containing error messages.
3. **combined.log**: Log file containing all log messages.
4. **products.json**: JSON file containing the processed data.

# ASSUMTIONS AND LIMITATIONS

The script assumes a stable internet connection for web scraping.
It's assumed that the structure of the target website remains unchanged. Any changes to the HTML structure may require updates to the script.
Error handling is implemented for common issues, but unforeseen errors may still occur.

# USAGE NOTES

Customize the script according to your requirements, such as modifying the target URL or adjusting data validation checks.
Ensure proper error handling and logging practices are followed to facilitate troubleshooting and maintenance.

# AUTHOR

[Aleksandar Matejic] - [aleksandar.matejic994@gmail.com]

If you have any questions or concerns, please don't hesitate to contact the author.
