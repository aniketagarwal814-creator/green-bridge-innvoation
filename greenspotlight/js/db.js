const seedData = {
    innovators: [
        { id: '1', title: 'Edible Cutlery', description: 'Replacing plastic spoons with baked, edible alternatives.', category: 'Plastic alternatives', image: 'https://placehold.co/600x400/png?text=Edible+Cutlery', contact: 'hello@edible.com', featured: true, status: 'approved' },
        { id: '2', title: 'Solar Backpacks', description: 'Charge your devices while walking under the sun.', category: 'Energy', image: 'https://placehold.co/600x400/png?text=Solar+Backpacks', contact: 'solar@pack.com', featured: true, status: 'approved' },
        { id: '3', title: 'Rainwater Purifier', description: 'Low-cost filter turning rainwater into drinking water.', category: 'Water', image: 'https://placehold.co/600x400/png?text=Rainwater+Purifier', contact: 'water@pure.com', featured: false, status: 'approved' },
        { id: '4', title: 'Banana Leaf Plates', description: 'Durable, biodegradable plates from banana leaves.', category: 'Plastic alternatives', image: 'https://placehold.co/600x400/png?text=Banana+Leaf+Plates', contact: 'leaf@plates.com', featured: false, status: 'approved' },
        { id: '5', title: 'Organic Compost Bin', description: 'Odorless bin that turns kitchen waste into compost in 24h.', category: 'Waste', image: 'https://placehold.co/600x400/png?text=Organic+Compost+Bin', contact: 'compost@bin.com', featured: false, status: 'approved' },
        { id: '6', title: 'Smart Irrigation', description: 'IoT sensor saving water for local farmers.', category: 'Agriculture', image: 'https://placehold.co/600x400/png?text=Smart+Irrigation', contact: 'smart@farm.com', featured: false, status: 'approved' },
    ],
    ngos: [
        { id: 'n1', name: 'GreenEarth Alliance', verified: true },
        { id: 'n2', name: 'OceanSavers', verified: true },
        { id: 'n3', name: 'Urban Forest Co.', verified: false },
    ],
    campaigns: [
        { id: 'c1', title: 'Beach Cleanup Drive', ngoId: 'n2', location: 'Marina Beach', date: '2026-11-10', volunteersNeeded: 50, participants: [] },
        { id: 'c2', title: 'Campus Tree Plantation', ngoId: 'n3', location: 'College Campus', date: '2026-10-15', volunteersNeeded: 20, participants: [] },
        { id: 'c3', title: 'E-Waste Collection', ngoId: 'n1', location: 'City Center', date: '2026-10-20', volunteersNeeded: 10, participants: [] },
        { id: 'c4', title: 'Awareness Seminar', ngoId: 'n1', location: 'Auditorium', date: '2026-10-25', volunteersNeeded: 5, participants: [] },
    ],
    volunteers: [
        { id: 'v1', name: 'Alex Johnson', points: 150, badges: ['First Campaign'], certificates: [] },
        { id: 'v2', name: 'Maria Garcia', points: 300, badges: ['Green Champion'], certificates: [] },
        { id: 'v3', name: 'Sam Smith', points: 50, badges: [], certificates: [] },
    ],
    currentUser: null // can be { role: 'Innovator' | 'NGO' | 'Volunteer' | 'Admin', name: string }
};

// Initialize DB
function initDB() {
    if (!localStorage.getItem('gs_data')) {
        localStorage.setItem('gs_data', JSON.stringify(seedData));
    }
}

// Get Data
function getDB() {
    return JSON.parse(localStorage.getItem('gs_data'));
}

// Save Data
function saveDB(data) {
    localStorage.setItem('gs_data', JSON.stringify(data));
}

// Reset Data
function resetDB() {
    localStorage.setItem('gs_data', JSON.stringify(seedData));
    window.location.reload();
}

// Global initialization
initDB();
