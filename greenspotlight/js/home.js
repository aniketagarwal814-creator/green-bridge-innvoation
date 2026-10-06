document.addEventListener('DOMContentLoaded', () => {
    const db = getDB();
    
    initHeroRotation(db.innovators.filter(i => i.featured));
    initCounters(db);
    initGrid(db.innovators);
});

// --- Rotating Hero ---
let currentHeroIndex = 0;
let heroInterval;

function initHeroRotation(featuredIdeas) {
    if (featuredIdeas.length === 0) return;
    
    const renderHeroCard = () => {
        const idea = featuredIdeas[currentHeroIndex];
        const card = document.getElementById('hero-card');
        
        // Add fade out
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            card.innerHTML = `
                <div class="relative h-48 rounded-xl overflow-hidden mb-4">
                    <img src="${idea.image}" onerror="this.onerror=null;this.src='https://via.placeholder.com/600x400?text=Featured+Idea';" alt="${idea.title}" class="w-full h-full object-cover">
                    <div class="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-md flex items-center shadow">
                        <i data-lucide="star" class="w-3 h-3 mr-1 fill-current"></i> Featured
                    </div>
                </div>
                <div class="text-xs text-green-600 font-bold uppercase tracking-wider mb-1">${idea.category}</div>
                <h3 class="text-2xl font-bold mb-2">${idea.title}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${idea.description}</p>
                <div class="flex gap-2 w-full">
                    <a href="innovator-detail.html?id=${idea.id}" class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition flex justify-center items-center">
                        Details <i data-lucide="external-link" class="w-4 h-4 ml-2"></i>
                    </a>
                    <button onclick="openChatModal('${idea.title.replace(/'/g, "\\'")}')" class="flex-1 bg-green-600 text-white hover:bg-green-700 font-medium py-2 rounded-lg transition flex justify-center items-center">
                        <i data-lucide="message-circle" class="w-4 h-4 mr-1"></i> Connect
                    </button>
                </div>
            `;
            lucide.createIcons();
            
            // Fade in
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            
            currentHeroIndex = (currentHeroIndex + 1) % featuredIdeas.length;
        }, 300);
    };

    renderHeroCard();
    heroInterval = setInterval(renderHeroCard, 5000);
}

// --- Impact Counters ---
function initCounters(db) {
    const totalIdeas = db.innovators.length;
    const totalNGOs = db.ngos.length;
    const totalVolunteers = db.volunteers.length;
    const totalCampaigns = db.campaigns.length;

    document.getElementById('counters-container').innerHTML = `
        <div>
            <div class="text-4xl font-extrabold text-green-600 mb-1">${totalIdeas}</div>
            <div class="text-sm text-gray-500 font-medium uppercase tracking-wide">Eco Ideas</div>
        </div>
        <div>
            <div class="text-4xl font-extrabold text-blue-600 mb-1">${totalNGOs}</div>
            <div class="text-sm text-gray-500 font-medium uppercase tracking-wide">Active NGOs</div>
        </div>
        <div>
            <div class="text-4xl font-extrabold text-orange-500 mb-1">${totalVolunteers}</div>
            <div class="text-sm text-gray-500 font-medium uppercase tracking-wide">Volunteers</div>
        </div>
        <div>
            <div class="text-4xl font-extrabold text-purple-600 mb-1">${totalCampaigns}</div>
            <div class="text-sm text-gray-500 font-medium uppercase tracking-wide">Campaigns</div>
        </div>
    `;
}

// --- Grid & Filtering ---
function initGrid(innovators) {
    const grid = document.getElementById('ideas-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    const renderGrid = (filterCategory) => {
        const filtered = filterCategory === 'All' 
            ? innovators 
            : innovators.filter(i => i.category === filterCategory);

        grid.innerHTML = filtered.map(idea => `
            <div class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
                <div class="h-48 overflow-hidden relative">
                    <img src="${idea.image}" onerror="this.onerror=null;this.src='https://via.placeholder.com/600x400?text=Idea+Image';" alt="${idea.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
                    <div class="absolute top-3 left-3 bg-white/90 backdrop-blur text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        ${idea.category}
                    </div>
                </div>
                <div class="p-6 flex-grow flex flex-col">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">${idea.title}</h3>
                    <p class="text-gray-600 text-sm flex-grow mb-4">${idea.description}</p>
                    <div class="flex gap-2 w-full mt-auto">
                        <a href="innovator-detail.html?id=${idea.id}" class="text-center flex-1 border border-green-200 text-green-700 hover:bg-green-50 font-medium py-2 rounded-xl transition block">
                            Details
                        </a>
                        <button onclick="openChatModal('${idea.title.replace(/'/g, "\\'")}')" class="flex-1 bg-green-600 text-white hover:bg-green-700 font-medium py-2 rounded-xl transition flex justify-center items-center">
                            <i data-lucide="message-circle" class="w-4 h-4 mr-1"></i> Connect
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    };

    // Initial render
    renderGrid('All');

    // Filter event listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active styling
            filterBtns.forEach(b => {
                b.classList.remove('bg-green-600', 'text-white');
                b.classList.add('bg-gray-200', 'text-gray-700');
            });
            e.target.classList.remove('bg-gray-200', 'text-gray-700');
            e.target.classList.add('bg-green-600', 'text-white');

            const category = e.target.getAttribute('data-filter');
            renderGrid(category);
        });
    });
}
