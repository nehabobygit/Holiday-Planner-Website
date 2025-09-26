let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

window.onscroll = () => {
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () => {
    loginForm.classList.add('active');
});

formClose.addEventListener('click', () => {
    loginForm.classList.remove('active');
});

/* book section*/
document.addEventListener('DOMContentLoaded', () => {

    // --- DATA SOURCE ---
    // In a real application, this would come from a server/API
    const destinations = {
        mountains: [
            { name: 'Swiss Alps', description: 'Breathtaking peaks & trails', image: 'https://images.unsplash.com/photo-1593396443310-44446a893110?w=400&auto=format&fit=crop' },
            { name: 'Himalayas, Nepal', description: 'Home to Mount Everest', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&auto=format&fit=crop' },
            { name: 'Andes, Peru', description: 'Ancient ruins & culture', image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=400&auto=format&fit=crop' },
            { name: 'Rocky Mountains', description: 'Vast wilderness in USA', image: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb685?w=400&auto=format&fit=crop' }
        ],
        beaches: [
            { name: 'Maldives', description: 'Overwater bungalows & clear seas', image: 'https://images.unsplash.com/photo-1572263459272-123a23a3e7b2?w=400&auto=format&fit=crop' },
            { name: 'Bora Bora', description: 'Ultimate tropical paradise', image: 'https://images.unsplash.com/photo-1508599589922-37cf6e6894b6?w=400&auto=format&fit=crop' },
            { name: 'Phuket, Thailand', description: 'Vibrant nightlife & stunning shores', image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&auto=format&fit=crop' },
            { name: 'Goa, India', description: 'Relaxed vibes & golden sands', image: 'https://images.unsplash.com/photo-1596714248493-e4a77b8745a5?w=400&auto=format&fit=crop' }
        ],
        cities: [
            { name: 'Tokyo, Japan', description: 'Futuristic tech & ancient culture', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&auto=format&fit=crop' },
            { name: 'Paris, France', description: 'The city of romance & art', image: 'https://images.unsplash.com/photo-1502602898657-3e91760c0341?w=400&auto=format&fit=crop' },
            { name: 'Rome, Italy', description: 'A journey through ancient history', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&auto=format&fit=crop' },
            { name: 'New York, USA', description: 'The city that never sleeps', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&auto=format&fit=crop' }
        ],
        islands: [
            { name: 'Bali, Indonesia', description: 'Spiritual retreats & lush jungles', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&auto=format&fit=crop' },
            { name: 'Santorini, Greece', description: 'Iconic white-washed villages', image: 'https://images.unsplash.com/photo-1533105079780-52b9be4ac20c?w=400&auto=format&fit=crop' },
            { name: 'Fiji', description: 'Pristine waters & friendly culture', image: 'https://images.unsplash.com/photo-1574880811265-27a3a39f4d2b?w=400&auto=format&fit=crop' },
            { name: 'Hawaii, USA', description: 'Volcanic landscapes & surf spots', image: 'https://images.unsplash.com/photo-1507525428034-b723a996f6ea?w=400&auto=format&fit=crop' }
        ],
        deserts: [
            { name: 'Sahara, Morocco', description: 'Endless dunes & camel treks', image: 'https://images.unsplash.com/photo-1552318965-6e6be7484ada?w=400&auto=format&fit=crop' },
            { name: 'Dubai, UAE', description: 'Modern marvels meet the sands', image: 'https://images.unsplash.com/photo-1531383401921-345338a53b59?w=400&auto=format&fit=crop' },
            { name: 'Atacama, Chile', description: 'Otherworldly landscapes & stargazing', image: 'https://images.unsplash.com/photo-1563722569089-0b73ebc19462?w=400&auto=format&fit=crop' }
        ],
        'hill stations': [
             { name: 'Ooty, India', description: 'Queen of the Nilgiris', image: 'https://images.unsplash.com/photo-1629935825393-787355523933?w=400&auto=format&fit=crop' },
             { name: 'Shimla, India', description: 'Colonial charm & snowy peaks', image: 'https://images.unsplash.com/photo-1616764498059-ffb217316335?w=400&auto=format&fit=crop' },
             { name: 'Munnar, India', description: 'Lush tea plantations', image: 'https://images.unsplash.com/photo-1616556133033-668586c06a37?w=400&auto=format&fit=crop' }
        ]
    };

    const searchInput = document.getElementById('interest-input');
    const tags = document.querySelectorAll('.interest-tags .tag');
    const resultsContainer = document.getElementById('results-container');

    // --- CORE FUNCTION TO DISPLAY RESULTS ---
    const displayResults = (filter = '') => {
        resultsContainer.innerHTML = ''; // Clear previous results
        let hasResults = false;

        const searchTerm = filter.toLowerCase().trim();
        
        // Find all matching destinations across all categories
        const matchedDestinations = [];
        for (const category in destinations) {
            if (category.includes(searchTerm)) {
                destinations[category].forEach(dest => {
                    // Avoid duplicates if a destination fits multiple searches
                    if (!matchedDestinations.some(d => d.name === dest.name)) {
                        matchedDestinations.push(dest);
                    }
                });
            }
        }

        if (matchedDestinations.length > 0) {
            hasResults = true;
            // Add each result card to the container with a delay for animation
            matchedDestinations.forEach((dest, index) => {
                const card = document.createElement('div');
                card.className = 'result-card';
                card.style.animationDelay = `${index * 0.1}s`;
                card.innerHTML = `
                    <img src="${dest.image}" alt="${dest.name}">
                    <div class="content">
                        <h4>${dest.name}</h4>
                        <p>${dest.description}</p>
                    </div>
                `;
                resultsContainer.appendChild(card);
            });
        }

        if (!hasResults) {
            resultsContainer.innerHTML = `<div class="no-results">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>No destinations found for "${filter}".<br>Try searching for "mountains", "beaches", etc.</p>
            </div>`;
        }
    };

    // --- EVENT LISTENERS ---
    searchInput.addEventListener('keyup', (e) => {
        // Remove active class from all tags when user types
        tags.forEach(t => t.classList.remove('active'));
        displayResults(e.target.value);
    });

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            const interest = tag.dataset.interest;
            searchInput.value = interest; // Update search bar text
            displayResults(interest);
        });
    });

    // --- INITIAL LOAD ---
    // Display the 'mountains' category by default
    displayResults('mountains');
});
/*book section ends*/

/*package aka service section starts*/
document.addEventListener('DOMContentLoaded', () => {

    const serviceBoxes = document.querySelectorAll('.services .box');
    const modals = document.querySelectorAll('.service-modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    // --- MOCK DATA (In a real app, this would come from an API) ---
    const mockData = {
        hotels: [
            { name: 'Cozy Inn', rating: '4.2', price: '$55/night', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop' },
            { name: 'City Center Hotel', rating: '4.5', price: '$75/night', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?w=400&auto=format&fit=crop' },
            { name: 'Budget Stay', rating: '3.9', price: '$40/night', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&auto=format&fit=crop' }
        ],
        food: {
            'italy': {
                dishes: [
                    { name: 'Pizza Margherita', img: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400&auto=format&fit=crop'},
                    { name: 'Carbonara', img: 'https://images.unsplash.com/photo-1588013273468-411962b21955?w=400&auto=format&fit=crop'}
                ],
                restaurants: [
                    { name: 'Trattoria da Enzo', cuisine: 'Roman'},
                    { name: 'Osteria Francescana', cuisine: 'Modern Italian'}
                ]
            }
        },
        safety: {
            'japan': [
                 { name: 'Low Crime Rate', description: 'Japan is one of the safest countries with very low street crime.' },
                 { name: 'Transportation', description: 'Public transport is extremely punctual and safe, even late at night.'},
                 { name: 'Scams', description: 'Be cautious of "Monk" scams near tourist sites where people ask for donations.'}
            ]
        },
        packages: [
            { name: 'Classic Europe', price: '$1200', img: 'https://images.unsplash.com/photo-1502602898657-3e91760c0341?w=400&auto=format&fit=crop', description: 'Paris, Rome, Venice (7 days)' },
            { name: 'Colors of India', price: '$800', img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&auto=format&fit=crop', description: 'Delhi, Agra, Jaipur (5 days)' },
            { name: 'Japan Wonders', price: '$1500', img: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&auto=format&fit=crop', description: 'Tokyo, Kyoto (6 days)' },
            { name: 'Swiss Alps Dream', price: '$1400', img: 'https://images.unsplash.com/photo-1593396443310-44446a893110?w=400&auto=format&fit=crop', description: 'Zurich, Interlaken (5 days)' }
        ],
        adventures: {
            'maldives': [
                { name: 'Scuba Diving', img: 'https://images.unsplash.com/photo-1577431145334-709885e33ca2?w=400&auto=format&fit=crop' },
                { name: 'Snorkeling', img: 'https://images.unsplash.com/photo-1594541253138-2a884784a62e?w=400&auto=format&fit=crop' }
            ],
             'dubai': [
                { name: 'Desert Safari', img: 'https://images.unsplash.com/photo-1580775038863-222c19958348?w=400&auto=format&fit=crop' },
                { name: 'Bungee Jumping', img: 'https://images.unsplash.com/photo-1565728882421-e3a51b53f092?w=400&auto=format&fit=crop' }
            ]
        }
    };

    // --- Modal Control ---
    serviceBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const modalId = box.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                // Auto-populate 'Around the World' on open
                if (modalId === 'world-modal') {
                    const grid = modal.querySelector('.results-grid');
                    populateWorldPackages(grid);
                }
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.service-modal').classList.remove('active');
        });
    });

    // Close modal by clicking background
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // --- Specific Modal Logic ---
    
    // Hotels
    document.querySelector('#hotel-modal form').addEventListener('submit', (e) => {
        e.preventDefault();
        const grid = document.querySelector('#hotel-modal .results-grid');
        grid.innerHTML = ''; // Clear previous
        mockData.hotels.forEach(hotel => {
            grid.innerHTML += `
                <div class="result-card">
                    <img src="${hotel.img}" alt="${hotel.name}">
                    <h4>${hotel.name}</h4>
                    <p>Rating: ${hotel.rating} <i class="fas fa-star" style="color:var(--orange);"></i></p>
                    <div class="price">${hotel.price}</div>
                </div>`;
        });
    });

    // Food
    document.querySelector('#food-modal form').addEventListener('submit', (e) => {
        e.preventDefault();
        const foodGrid = document.querySelector('#famous-food-grid');
        const restaurantGrid = document.querySelector('#restaurants-grid');
        foodGrid.innerHTML = '';
        restaurantGrid.innerHTML = '';

        const data = mockData.food.italy; // Mock response for Italy
        data.dishes.forEach(dish => {
            foodGrid.innerHTML += `
                <div class="result-card">
                    <img src="${dish.img}" alt="${dish.name}">
                    <h4>${dish.name}</h4>
                </div>`;
        });
        data.restaurants.forEach(r => {
            restaurantGrid.innerHTML += `
                 <div class="result-card">
                    <i class="fas fa-store" style="font-size:3rem; color:var(--orange); margin-bottom:1rem;"></i>
                    <h4>${r.name}</h4>
                    <p>${r.cuisine}</p>
                </div>`;
        });
    });
    
     // Safety Guide
    document.querySelector('#safety-modal form').addEventListener('submit', (e) => {
        e.preventDefault();
        const grid = document.querySelector('#safety-modal .results-grid');
        grid.innerHTML = '';
        mockData.safety.japan.forEach(tip => {
            grid.innerHTML += `
                 <div class="result-card" style="text-align:left;">
                    <h4>${tip.name}</h4>
                    <p>${tip.description}</p>
                </div>`;
        });
    });
    
    // World Packages (function to be called on open)
    function populateWorldPackages(grid) {
        grid.innerHTML = '';
         mockData.packages.forEach(pkg => {
            grid.innerHTML += `
                <div class="result-card">
                    <img src="${pkg.img}" alt="${pkg.name}">
                    <h4>${pkg.name}</h4>
                    <p>${pkg.description}</p>
                    <div class="price">${pkg.price}</div>
                </div>`;
        });
    }

    // Fastest Travel
    const travelOptions = document.querySelectorAll('.travel-options .option');
    travelOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            travelOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
        });
    });
    document.querySelector('#travel-modal form').addEventListener('submit', (e) => {
        e.preventDefault();
        const grid = document.querySelector('#travel-modal .results-grid');
        grid.innerHTML = `<div class="result-card"><h4>Estimated Fare</h4><div class="price">$${Math.floor(Math.random() * 200) + 50}.00</div></div>`;
    });

     // Adventures
    document.querySelector('#adventure-modal form').addEventListener('submit', (e) => {
        e.preventDefault();
        const grid = document.querySelector('#adventure-modal .results-grid');
        grid.innerHTML = '';
        mockData.adventures.maldives.forEach(adv => {
            grid.innerHTML += `
                <div class="result-card">
                    <img src="${adv.img}" alt="${adv.name}">
                    <h4>${adv.name}</h4>
                </div>`;
        });
    });
});

/*itanery*/
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const itineraryTimeline = document.getElementById('itinerary-timeline');
    const itineraryForm = document.getElementById('itinerary-form');
    
    const budgetList = document.getElementById('budget-list');
    const budgetForm = document.getElementById('budget-form');
    const totalCostEl = document.getElementById('total-cost');

    // --- State Management (using arrays to store data) ---
    let itineraryItems = [
        { title: 'Eiffel Tower Visit', description: 'Evening visit to see the tower sparkle.', date: '2025-10-15', time: '19:00' }
    ];
    let budgetItems = [];

    // --- Itinerary Functions ---
    const renderItinerary = () => {
        itineraryTimeline.innerHTML = ''; // Clear existing items
        if (itineraryItems.length === 0) {
            itineraryTimeline.innerHTML = '<p>Your itinerary is empty. Add an activity below!</p>';
            return;
        }
        itineraryItems.forEach((item, index) => {
            // Format time for display
            const [hour, minute] = item.time.split(':');
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const formattedHour = hour % 12 || 12;
            const formattedTime = `${formattedHour}:${minute} ${ampm}`;

            const itemEl = document.createElement('div');
            itemEl.classList.add('timeline-item');
            itemEl.innerHTML = `
                <div class="timeline-item-header">
                    <h4>${item.title}</h4>
                    <button class="delete-btn" data-index="${index}"><i class="fas fa-times"></i></button>
                </div>
                <p>${item.description || ''}</p>
                <div class="timeline-meta">
                    <span><i class="fas fa-calendar-alt"></i> ${item.date}</span>
                    <span><i class="fas fa-clock"></i> ${formattedTime}</span>
                </div>
            `;
            itineraryTimeline.appendChild(itemEl);
        });
    };

    const addItineraryItem = (e) => {
        e.preventDefault();
        const title = document.getElementById('itinerary-title').value;
        const date = document.getElementById('itinerary-date').value;
        const time = document.getElementById('itinerary-time').value;

        itineraryItems.push({ title, date, time, description: 'Newly added activity.' });
        renderItinerary();
        itineraryForm.reset();
    };
    
    const deleteItineraryItem = (e) => {
        if (e.target.closest('.delete-btn')) {
            const index = e.target.closest('.delete-btn').dataset.index;
            itineraryItems.splice(index, 1);
            renderItinerary();
        }
    };

    // --- Budget Functions ---
    const renderBudget = () => {
        budgetList.innerHTML = '';
        let total = 0;
        
        budgetItems.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.classList.add('budget-item');
            itemEl.innerHTML = `
                <span>${item.category}</span>
                <span>$${item.amount.toFixed(2)} <button class="delete-btn" data-index="${index}"><i class="fas fa-times"></i></button></span>
            `;
            budgetList.appendChild(itemEl);
            total += item.amount;
        });
        
        totalCostEl.textContent = `$${total.toFixed(2)}`;
    };

    const addBudgetItem = (e) => {
        e.preventDefault();
        const category = document.getElementById('expense-category').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);

        if (category && amount > 0) {
            budgetItems.push({ category, amount });
            renderBudget();
            budgetForm.reset();
        }
    };
    
    const deleteBudgetItem = (e) => {
         if (e.target.closest('.delete-btn')) {
            const index = e.target.closest('.delete-btn').dataset.index;
            budgetItems.splice(index, 1);
            renderBudget();
        }
    };

    // --- Initial Render & Event Listeners ---
    itineraryForm.addEventListener('submit', addItineraryItem);
    itineraryTimeline.addEventListener('click', deleteItineraryItem);

    budgetForm.addEventListener('submit', addBudgetItem);
    budgetList.addEventListener('click', deleteBudgetItem);

    renderItinerary(); // Initial render of the sample item
    renderBudget(); // Initial render of the budget
});

/*gallery section*/
const nextBtn = document.querySelector('.next');
        const prevBtn = document.querySelector('.prev');

        nextBtn.addEventListener('click', function(){
            let items = document.querySelectorAll('.item');
            document.querySelector('.slide').appendChild(items[0]);
        });

        prevBtn.addEventListener('click', function(){
            let items = document.querySelectorAll('.item');
            document.querySelector('.slide').prepend(items[items.length - 1]);
        });
