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