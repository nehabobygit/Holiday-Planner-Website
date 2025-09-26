document.addEventListener('DOMContentLoaded', () => {

   // --- DATA SOURCE ---
    // In a real application, this would come from a server/API
    const destinations = {
        mountains: [
            { name: 'Swiss Alps', description: 'Breathtaking peaks & trails', image: './images/swiss-alps.jpg' },
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
            { name: 'Paris, France', description: 'The city of romance & art', image: 'https://www.istockphoto.com/photo/eiffel-tower-in-spring-gm1297043676-390287141?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fparis&utm_medium=affiliate&utm_source=unsplash&utm_term=paris%3A%3Aad-balancing-template%3Acontrol' },
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
            // --- FIXED URL ---
            { name: 'Atacama, Chile', description: 'Otherworldly landscapes & stargazing', image: 'https://images.unsplash.com/photo-1542848134-a71d9d443385?w=400&auto=format&fit=crop' }
        ],
        'hill stations': [
             // --- FIXED URL ---
             { name: 'Ooty, India', description: 'Queen of the Nilgiris', image: 'https://images.unsplash.com/photo-1603597383636-9e99a2fb6d01?w=400&auto=format&fit=crop' },
             // --- FIXED URL ---
             { name: 'Shimla, India', description: 'Colonial charm & snowy peaks', image: 'https://images.unsplash.com/photo-1581456226527-3193e5ba41b7?w=400&auto=format&fit=crop' },
             // --- FIXED URL ---
             { name: 'Munnar, India', description: 'Lush tea plantations', image: 'https://images.unsplash.com/photo-1593361595233-53d04dcbce3e?w=400&auto=format&fit=crop' }
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
