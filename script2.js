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