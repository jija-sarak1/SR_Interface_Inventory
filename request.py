import requests
import json
import gspread
from oauth2client.service_account import ServiceAccountCredentials

# Define the API URL
api_url = "https://64e4-2401-4900-1c9a-ee43-33b4-13ae-ec71-fb49.ngrok-free.app/api/inventory/parent_dbSchoolView"

# Fetch data from the API
response = requests.get(api_url)

data = response.json()


# Define the Google Sheets credentials JSON file
credentials = ServiceAccountCredentials.from_json_keyfile_name(
    'useful-flame-403603-cd52dc16efc6.json',  # Replace with your credentials file
    ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']
)

# Authorize access to Google Sheets
gc = gspread.authorize(credentials)

# Open the Google Sheet by its title and select the desired tab (worksheet)
spreadsheet = gc.open("Inventory sheet")  # Replace with your sheet title
worksheet_name = "parent"  # Replace with your desired tab name
sheet = spreadsheet.worksheet(worksheet_name)

# Clear existing data in the sheet (optional)
sheet.clear()
sheet.update('A2', data)
print("Data has been written to the Google Sheet.")
