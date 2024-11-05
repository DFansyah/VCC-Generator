<body>
<div>
# VCC Generator

A simple Node.js application for generating random credit card information, including card numbers, CVV, and expiration dates. This tool is useful for testing purposes and simulating transactions without using real credit card data.

## Features

- Generates credit card numbers based on various BINs.
- Supports multiple card types: Visa, Mastercard, American Express, and Diners Club.
- Uses the Luhn algorithm to ensure validity of the generated card numbers.
- Outputs generated card details in a user-friendly format.
- Random balances for all card numbers

## Installation

To set up the project locally, follow these steps:

1. **Install needed packages termux***

    ```bash
    pkg update
    pkg upgrade
    pkg install npm
    pkg install nodejs
    pkg install git
    pkg install yarn
    termux-setup-storage
    ```
    
2. ***Clone the repository:***

    ```bash
    git clone https://github.com/DFansyah/VCC-Generator.git
    cd VCC-Generator
   ```
   
3. ***For run this script***

    ```bash
    npm install or yarn install
    npm start or node index.js
    ```
   
</div>
</body>