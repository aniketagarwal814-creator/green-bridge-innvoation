// Shared Navbar and Footer injection

function renderNavbar() {
    const db = getDB();
    const user = db.currentUser;
    
    const navHTML = `
        <nav class="bg-white shadow-sm sticky top-0 z-50">
            <div class="bg-yellow-100 border-b border-yellow-200 py-2 px-4 text-center w-full z-[60]">
                <p class="text-[11px] sm:text-xs text-yellow-800 max-w-5xl mx-auto flex items-center justify-center font-bold">
                    <i data-lucide="alert-triangle" class="w-4 h-4 mr-2 flex-shrink-0 text-yellow-600"></i>
                    DISCLAIMER:&nbsp;<span class="font-medium">GreenBridge strictly permits only NGOs and Innovators whose initiatives are fundamentally aligned with sustainability, eco-friendliness, and nature conservation. Non-compliant profiles or ideas will be swiftly removed.</span>
                </p>
            </div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16 items-center">
                    <div class="flex items-center cursor-pointer" onclick="window.location.href='index.html'">
                        <i data-lucide="leaf" class="text-green-600 w-8 h-8 mr-2"></i>
                        <span class="font-bold text-xl text-green-800 tracking-tight">GreenBridge</span>
                    </div>
                    <div class="hidden md:flex space-x-6 items-center">
                        <a href="innovators.html" class="text-gray-600 hover:text-green-600 font-medium">Innovators</a>
                        <a href="ngos.html" class="text-gray-600 hover:text-green-600 font-medium">NGOs</a>
                        <a href="campaigns.html" class="text-gray-600 hover:text-green-600 font-medium">Campaigns</a>
                        <a href="leaderboard.html" class="text-gray-600 hover:text-green-600 font-medium">Leaderboard</a>
                        
                        <button onclick="toggleDarkMode()" class="ml-4 text-gray-600 hover:text-green-600 focus:outline-none" title="Toggle Dark/Light Mode">
                            <i data-lucide="moon" class="w-5 h-5"></i>
                        </button>
                        
                        <div class="relative cursor-pointer ml-4" onclick="document.getElementById('notification-modal').classList.remove('hidden')">
                            <i data-lucide="bell" class="w-5 h-5 text-gray-600 hover:text-green-600"></i>
                            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full">3</span>
                        </div>
                        
                        ${user ? `
                            <div class="flex items-center ml-4 bg-green-50 px-4 py-2 rounded-full">
                                <i data-lucide="user" class="w-4 h-4 text-green-700 mr-2"></i>
                                <span class="text-sm font-bold text-green-800 mr-4">${user.role}</span>
                                ${['Admin', 'Founder', 'Team Member'].includes(user.role) ? '<a href="admin.html" class="text-xs text-blue-600 font-bold hover:underline mr-4">Admin Dashboard</a>' : ''}
                                ${user.role === 'Innovator' ? '<a href="submit-idea.html" class="text-xs text-blue-600 font-bold hover:underline mr-4">My Ideas</a>' : ''}
                                ${user.role === 'NGO' ? '<a href="ngo-dashboard.html" class="text-xs text-blue-600 font-bold hover:underline mr-4">Dashboard</a>' : ''}
                                ${user.role === 'Volunteer' ? '<a href="volunteer-vault.html" class="text-xs text-blue-600 font-bold hover:underline mr-4">Impact Vault</a>' : ''}
                                <button onclick="logout()" class="text-xs text-red-600 hover:underline">Logout</button>
                            </div>
                        ` : `
                            <button onclick="document.getElementById('login-modal').classList.remove('hidden')" class="bg-green-600 text-white px-5 py-2 rounded-full font-medium hover:bg-green-700 transition ml-4">
                                Login
                            </button>
                        `}
                    </div>
                </div>
            </div>
        </nav>
    `;
    document.getElementById('navbar-container').innerHTML = navHTML;
    lucide.createIcons();
}

function renderFooter() {
    const footerHTML = `
        <footer class="bg-gray-50 mt-20 border-t border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-500 text-sm">© GreenBridge Prototype. Innovating for a Sustainable Tomorrow.</p>
                <button onclick="resetDB()" class="mt-4 md:mt-0 text-sm text-gray-400 hover:text-red-500 underline flex items-center">
                    <i data-lucide="refresh-cw" class="w-4 h-4 mr-1"></i> Reset Demo Data
                </button>
            </div>
        </footer>
    `;
    document.getElementById('footer-container').innerHTML = footerHTML;
    lucide.createIcons();
}

function renderLoginModal() {
    const modalHTML = `
        <div id="login-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center">
            <div class="bg-white rounded-2xl p-8 max-w-sm w-full relative shadow-2xl">
                <button onclick="document.getElementById('login-modal').classList.add('hidden')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
                <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Select Role</h2>
                <div class="space-y-3">
                    <button onclick="loginAs('Innovator')" class="w-full py-3 px-4 border border-green-200 rounded-xl hover:bg-green-50 text-green-800 font-medium flex items-center justify-center transition">
                        <i data-lucide="lightbulb" class="w-5 h-5 mr-2"></i> Innovator
                    </button>
                    <button onclick="loginAs('NGO')" class="w-full py-3 px-4 border border-blue-200 rounded-xl hover:bg-blue-50 text-blue-800 font-medium flex items-center justify-center transition">
                        <i data-lucide="globe" class="w-5 h-5 mr-2"></i> NGO
                    </button>
                    <button onclick="loginAs('Volunteer')" class="w-full py-3 px-4 border border-orange-200 rounded-xl hover:bg-orange-50 text-orange-800 font-medium flex items-center justify-center transition">
                        <i data-lucide="hands" class="w-5 h-5 mr-2"></i> Volunteer
                    </button>
                    
                    <div class="border-t pt-4 mt-4">
                        <p class="text-xs text-center text-gray-500 mb-3 uppercase font-bold tracking-wider">Staff Access</p>
                        <div class="grid grid-cols-2 gap-2">
                            <button onclick="loginWithPasskey('Founder', 'founder123')" class="w-full py-2 px-2 border border-purple-200 rounded-xl hover:bg-purple-50 text-purple-800 text-xs font-bold flex flex-col items-center justify-center transition">
                                <i data-lucide="crown" class="w-4 h-4 mb-1"></i> Founder
                            </button>
                            <button onclick="loginWithPasskey('Team Member', 'team123')" class="w-full py-2 px-2 border border-purple-200 rounded-xl hover:bg-purple-50 text-purple-800 text-xs font-bold flex flex-col items-center justify-center transition">
                                <i data-lucide="shield" class="w-4 h-4 mb-1"></i> Team Member
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('modal-container').innerHTML = modalHTML;
    lucide.createIcons();
}

window.loginWithPasskey = function(role, expectedKey) {
    const key = prompt(`Enter passkey for ${role} (Hint: ${expectedKey}):`);
    if (key === expectedKey) {
        loginAs(role);
    } else if (key !== null) {
        alert('Invalid passkey!');
    }
}

function loginAs(role) {
    const db = getDB();
    let id = 'u1';
    let name = 'Demo ' + role;
    let email = 'demo@greenbridge.com';
    let phone = '+1 (555) 000-0000';

    if (role === 'Innovator') { 
        id = 'i1'; 
        name = 'Jane Smith'; 
        email = 'jane.smith@greenbridge.com';
        phone = '+1 (555) 123-4567';
    }
    if (role === 'NGO') { 
        id = 'n1'; 
        name = 'GreenEarth Alliance'; 
        email = 'contact@greenearth.org';
        phone = '+1 (555) 987-6543';
    }
    if (role === 'Volunteer') { 
        id = 'v1'; 
        name = 'Alex Johnson'; 
        email = 'alex.j@volunteer.org';
        phone = '+1 (555) 555-5555';
    }
    if (role === 'Founder') { 
        id = 'admin1'; 
        name = 'Founder'; 
        email = 'founder@greenbridge.com';
    }
    if (role === 'Team Member') { 
        id = 'admin2'; 
        name = 'Team Member'; 
        email = 'team@greenbridge.com';
    }
    
    db.currentUser = { id: id, role: role, name: name, email: email, phone: phone };
    saveDB(db);
    window.location.reload();
}

function logout() {
    const db = getDB();
    db.currentUser = null;
    saveDB(db);
    window.location.reload();
}

// Auto-initialize components if containers exist
window.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('navbar-container')) renderNavbar();
    if(document.getElementById('footer-container')) renderFooter();
    if(document.getElementById('modal-container')) {
        renderLoginModal();
        renderNotificationModal();
    }
});


// --- Chat & Notifications Modals ---

function renderNotificationModal() {
    const modalHTML = `
        <div id="notification-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-start justify-end pt-16 pr-4 sm:pr-8">
            <div class="bg-white rounded-2xl p-6 w-full max-w-sm relative shadow-2xl animate-fade-in-down">
                <div class="flex justify-between items-center mb-4 pb-2 border-b">
                    <h3 class="text-lg font-bold text-gray-800">Notifications</h3>
                    <button onclick="document.getElementById('notification-modal').classList.add('hidden')" class="text-gray-400 hover:text-gray-600">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>
                <div class="space-y-4">
                    <div class="flex gap-3 items-start">
                        <div class="bg-blue-100 p-2 rounded-full text-blue-600"><i data-lucide="message-square" class="w-4 h-4"></i></div>
                        <div>
                            <p class="text-sm font-medium text-gray-800">New message from Innovator: Solar Backpacks</p>
                            <p class="text-xs text-gray-500">2 mins ago</p>
                        </div>
                    </div>
                    <div class="flex gap-3 items-start">
                        <div class="bg-green-100 p-2 rounded-full text-green-600"><i data-lucide="check-circle" class="w-4 h-4"></i></div>
                        <div>
                            <p class="text-sm font-medium text-gray-800">Your campaign "Beach Cleanup" is approved.</p>
                            <p class="text-xs text-gray-500">1 hr ago</p>
                        </div>
                    </div>
                    <div class="flex gap-3 items-start">
                        <div class="bg-purple-100 p-2 rounded-full text-purple-600"><i data-lucide="award" class="w-4 h-4"></i></div>
                        <div>
                            <p class="text-sm font-medium text-gray-800">You earned a new badge!</p>
                            <p class="text-xs text-gray-500">Yesterday</p>
                        </div>
                    </div>
                </div>
                <button class="w-full mt-4 py-2 text-sm text-green-600 font-bold hover:bg-green-50 rounded-lg">Mark all as read</button>
            </div>
        </div>
    `;
    const container = document.getElementById('modal-container');
    if(container) {
        container.insertAdjacentHTML('beforeend', modalHTML);
        lucide.createIcons();
    }
}

function openChatModal(recipientName) {
    let chatModal = document.getElementById('chat-modal');
    if (!chatModal) {
        const modalHTML = `
            <div id="chat-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-[110] flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl w-full max-w-lg flex flex-col shadow-2xl h-[500px]">
                    <div class="bg-green-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
                        <div>
                            <h3 class="font-bold text-lg" id="chat-recipient-name">Chat</h3>
                            <p class="text-xs text-green-100">GreenBridge Secure Connect</p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <button onclick="crackDeal()" class="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center shadow-sm transition">
                                <i data-lucide="handshake" class="w-4 h-4 mr-1"></i> Deal Cracked
                            </button>
                            <button onclick="document.getElementById('chat-modal').classList.add('hidden')" class="text-green-100 hover:text-white">
                                <i data-lucide="x" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                    <div class="flex-grow p-4 overflow-y-auto bg-gray-50 space-y-4" id="chat-messages">
                        <div class="flex justify-center">
                            <span class="bg-gray-200 text-gray-500 text-xs px-2 py-1 rounded-full">Today</span>
                        </div>
                        <div class="flex gap-3">
                            <div class="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
                                <i data-lucide="user" class="w-4 h-4 text-green-700"></i>
                            </div>
                            <div class="bg-white p-3 rounded-lg rounded-tl-none shadow-sm text-sm text-gray-800 max-w-[80%] border border-gray-100">
                                Hello! Thanks for connecting. How can we collaborate?
                            </div>
                        </div>
                    </div>
                    <div class="p-4 bg-white border-t rounded-b-2xl flex gap-2">
                        <input type="text" id="chat-input-field" placeholder="Type your message..." class="flex-grow border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500">
                        <button onclick="sendChatMessage()" class="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">
                            <i data-lucide="send" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        const container = document.getElementById('modal-container');
        if(container) {
            container.insertAdjacentHTML('beforeend', modalHTML);
            lucide.createIcons();
        }
        chatModal = document.getElementById('chat-modal');
    }
    
    document.getElementById('chat-recipient-name').innerText = "Chat with " + recipientName;
    chatModal.classList.remove('hidden');
}

function sendChatMessage() {
    const input = document.getElementById('chat-input-field');
    const msg = input.value.trim();
    if (!msg) return;
    
    const messagesDiv = document.getElementById('chat-messages');
    messagesDiv.innerHTML += `
        <div class="flex gap-3 justify-end">
            <div class="bg-green-600 text-white p-3 rounded-lg rounded-tr-none shadow-sm text-sm max-w-[80%]">
                ${msg}
            </div>
        </div>
    `;
    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function crackDeal() {
    // Hide chat modal if open
    const chatModal = document.getElementById('chat-modal');
    if (chatModal) {
        chatModal.classList.add('hidden');
    }

    let dealModal = document.getElementById('deal-cracked-modal');
    if (!dealModal) {
        const modalHTML = `
            <div id="deal-cracked-modal" class="fixed inset-0 bg-black bg-opacity-70 z-[200] flex items-center justify-center p-4">
                <div class="bg-white rounded-3xl w-full max-w-md p-8 text-center shadow-2xl transform scale-100 animate-bounce-slight relative overflow-hidden">
                    <div class="absolute inset-0 bg-green-50 opacity-50"></div>
                    <div class="relative z-10">
                        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <i data-lucide="award" class="w-10 h-10 text-green-600"></i>
                        </div>
                        <h2 class="text-3xl font-extrabold text-green-700 mb-2 tracking-tight">ECO HERO UNLOCKED!</h2>
                        <h3 class="text-xl font-bold text-gray-800 mb-4">Deal Successfully Cracked!</h3>
                        
                        <div class="bg-green-50 border border-green-200 p-4 rounded-xl mb-6 text-sm text-gray-700 text-left">
                            <p class="mb-2"><i data-lucide="check-circle" class="w-4 h-4 text-green-600 inline mr-1"></i> <strong>GreenBridge Team Activated!</strong></p>
                            <p class="mb-2"><i data-lucide="shield-check" class="w-4 h-4 text-green-600 inline mr-1"></i> Innovator & Client information verification in progress.</p>
                            <p><i data-lucide="truck" class="w-4 h-4 text-green-600 inline mr-1"></i> Logistics & execution will be fully managed by GreenBridge.</p>
                        </div>
                        
                        <button onclick="document.getElementById('deal-cracked-modal').classList.add('hidden')" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition shadow-lg flex justify-center items-center">
                            Awesome! <i data-lucide="thumbs-up" class="w-5 h-5 ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
            <style>
                @keyframes bounce-slight {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                .animate-bounce-slight {
                    animation: bounce-slight 0.5s ease-in-out;
                }
            </style>
        `;
        const container = document.getElementById('modal-container');
        if (container) {
            container.insertAdjacentHTML('beforeend', modalHTML);
            lucide.createIcons();
        }
        dealModal = document.getElementById('deal-cracked-modal');
    }
    
    dealModal.classList.remove('hidden');
}

// --- Dark Mode Toggle ---
function toggleDarkMode() {
    const html = document.documentElement;
    if (html.classList.contains('dark-theme')) {
        html.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// Apply theme on load
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    }
    
    // Inject dark mode styles
    const style = document.createElement('style');
    style.innerHTML = `
        html.dark-theme {
            filter: invert(1) hue-rotate(180deg);
            background-color: #111;
        }
        html.dark-theme img, 
        html.dark-theme video,
        html.dark-theme i[data-lucide],
        html.dark-theme .lucide {
            filter: invert(1) hue-rotate(180deg);
        }
        /* Fix for modals backdrop getting inverted to white */
        html.dark-theme .bg-black.bg-opacity-50,
        html.dark-theme .bg-black.bg-opacity-70,
        html.dark-theme .bg-black {
            background-color: rgba(255, 255, 255, 0.5) !important;
        }
    `;
    document.head.appendChild(style);
})();
