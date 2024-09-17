// Define the API URL
const apiUrlQuotes = 'https://hindi-quotes.vercel.app/random/';

// Function to fetch and display a random quote
function get_random_quote() {
    return fetch(apiUrlQuotes)
        .then(response => response.json())
        .then(data => data.quote)
        .catch(error => {
            console.error('Error fetching random quote:', error);
            return 'Error fetching quote.';
        });
}

// Function to fetch and display a quote based on selected category
function get_quote_by_category(category) {
    return fetch(apiUrlQuotes + category)
        .then(response => response.json())
        .then(data => data.quote)
        .catch(error => {
            console.error('Error fetching quote by category:', error);
            return 'Error fetching quote.';
        });
}

// Function to initialize all static cards with random quotes
async function initializeStaticCards() {
    const staticCards = document.querySelectorAll('.static-card');

    for (let i = 0; i < staticCards.length; i++) {
        try {
            const quote = await get_random_quote();
            staticCards[i].querySelector('.static-quote').textContent = `"${quote}"`;
        } catch (error) {
            console.error('Error initializing static card:', error);
            staticCards[i].querySelector('.static-quote').textContent = 'Error fetching quote.';
        }
    }
}

// Initialize static cards with random quotes on page load
window.addEventListener('DOMContentLoaded', () => {
    initializeStaticCards();

    // Fetch a random quote and update the main quote display area
    get_random_quote()
        .then(quote => {
            document.getElementById('random-quote').textContent = `"${quote}"`;
        })
        .catch(error => {
            console.error('Error fetching initial random quote:', error);
            document.getElementById('random-quote').textContent = 'Error fetching quote.';
        });
});

// Function to fetch and display a random quote
function get_from_api_random() {
    fetch(apiUrlQuotes)
    .then(response => response.json())
    .then(data => {
        // Update the random quote display area with the fetched quote
        document.getElementById('random-quote').textContent = `"${data.quote}"`;
    })
    .catch(error => console.error('Error:', error));
}

// Function to fetch and display a quote based on selected category
function get_from_api_category() {
    var quoteCat = document.getElementById("quote-category").value;

    // If no category is selected, show a warning message
    if (quoteCat === "") {
        alert("Please select a category.");
        return;
    }

    // Make the API request based on the selected category
    fetch(apiUrlQuotes + quoteCat)
        .then(response => response.json())
        .then(data => {
            // Update the random quote display area with the fetched quote
            document.getElementById('random-quote').textContent = `"${data.quote}"`;
        })
        .catch(error => console.error('Error:', error));
}
