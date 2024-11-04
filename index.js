const readline = require('readline');

// Create an interface for reading input from the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// All credit card BIN data
const cardData = [
    { bin: 34, bank: "American Express", type: "American Express" },
    { bin: 37, bank: "American Express", type: "American Express" },
    { bin: 36, bank: "Diners Club International", type: "Diners Club" },
    { bin: 4, bank: "Visa", type: "Visa" },
    { bin: 51, bank: "Mastercard", type: "Mastercard" },
    { bin: 52, bank: "Mastercard", type: "Mastercard" },
    // Add more BINs as needed
];

// Get the length of the card number based on the card type
const getCardNumberLength = cardType => {
    const lengthOptions = {
        "American Express": 15,
        "Diners Club": 14,
        "Discover": Math.random() > 0.5 ? 14 : 16,
        "Mastercard": Math.random() > 0.5 ? 16 : 19,
        "Visa": Math.random() > 0.5 ? 16 : 19
    };
    return lengthOptions[cardType] || 16;
};

// Calculate Length checksum to validate the card number
const isValidLength = cardNumber => {
    return cardNumber.split('').reverse().reduce((sum, digit, index) => {
        digit = parseInt(digit);
        if (index % 2 !== 0) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        return sum + digit;
    }, 0) % 10 === 0;
};

// Select a random BIN from the card data
const getRandomCardData = () => cardData[Math.floor(Math.random() * cardData.length)];

// Generate a complete credit card number based on the BIN and desired length
const createCardNumber = (bin, cardLength) => {
    let cardNumber = bin.toString();
    while (cardNumber.length < cardLength - 1) {
        cardNumber += Math.floor(Math.random() * 10);
    }
    for (let i = 0; i < 10; i++) {
        const tempCardNumber = cardNumber + i;
        if (isValidLength(tempCardNumber)) return tempCardNumber;
    }
    return null;
};

// Generate and print credit card details
const generateCreditCards = count => {
    for (let i = 0; i < count; i++) {
        const { bin, bank, type } = getRandomCardData();
        const cardLength = getCardNumberLength(type);
        const cardNumber = createCardNumber(bin, cardLength);

        if (cardNumber) {
            const cardDetails = {
                cardNumber,
                cvv: Math.floor(100 + Math.random() * 900),
                expiryMonth: Math.floor(1 + Math.random() * 12),
                expiryYear: new Date().getFullYear() + Math.floor(Math.random() * 10),
                bank
            };
            console.log(formatCardDetails(cardDetails));
        }
    }
};

// Format the generated card details for display
const formatCardDetails = ({ cardNumber, cvv, expiryMonth, expiryYear, bank }) => `
[*] Generated Credit Card
> || Card Details ||
> Number: ${cardNumber}
> Bank: ${bank}
> CVV: ${cvv}
> Expiry Date: ${expiryMonth}/${expiryYear}
> Validate: https://dnschecker.org/credit-card-validator.php?ccn=${cardNumber}
`;

// Function to ask the user for input
const promptUser = question => new Promise(resolve => rl.question(question, answer => resolve(answer)));

// Main function to prompt user and generate credit cards
const main = async () => {
    try {
        const count = parseInt(await promptUser('Enter the number of credit card results to generate: '), 10);

        if (isNaN(count) || count <= 0) {
            console.log('Invalid input. Please enter a valid number.');
            rl.close();
            return;
        }

        generateCreditCards(count);
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        rl.close();
    }
};

// Run the main function
main();
