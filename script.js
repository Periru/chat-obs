// Cultivator Chat - JavaScript

// Avatar emojis for cultivators
const cultivatorAvatars = [
    '🧙', '🧝', '🧞', '🧚', '🧛', '🧜', '🧟', '🧠',
    '👁️', '🐉', '🐲', '🦄', '🦋', '🦅', '🦊', '🐼',
    '⚡', '🔥', '💫', '🌟', '✨', '☄️', '🌙', '☀️'
];

// Sample cultivator names
const cultivatorNames = [
    'Нефритовый Бессмертный', 'Мастер Лотоса', 'Персиковый Демон',
    'Золотой Дракон', 'Серебряная Луна', 'Огненный Феникс',
    'Туманный Странник', 'Громовой Меч', 'Ледяная Дева',
    'Ветреный Путешественник', 'Звёздный Наблюдатель', 'Дух Горы'
];

// User types
const userTypes = ['regular', 'subscriber', 'vip', 'moderator'];

// Chat messages container
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Generate random avatar
function getRandomAvatar() {
    return cultivatorAvatars[Math.floor(Math.random() * cultivatorAvatars.length)];
}

// Generate random cultivator name
function getRandomName() {
    return cultivatorNames[Math.floor(Math.random() * cultivatorNames.length)];
}

// Get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

// Create a message element
function createMessage(username, text, userType = 'regular', avatar = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${userType}`;
    
    const avatarEmoji = avatar || getRandomAvatar();
    
    messageDiv.innerHTML = `
        <div class="avatar">${avatarEmoji}</div>
        <div class="message-content">
            <div class="username">
                ${username}
                <span class="user-badge ${userType}-badge">${getBadgeText(userType)}</span>
            </div>
            <div class="message-text">${escapeHtml(text)}</div>
            <div class="timestamp">${getCurrentTime()}</div>
        </div>
    `;
    
    return messageDiv;
}

// Get badge text based on user type
function getBadgeText(userType) {
    const badges = {
        'moderator': 'MOD',
        'vip': 'VIP',
        'subscriber': 'SUB',
        'regular': 'USR'
    };
    return badges[userType] || 'USR';
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add message to chat
function addMessage(username, text, userType = 'regular', avatar = null) {
    const message = createMessage(username, text, userType, avatar);
    chatMessages.appendChild(message);
    
    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Limit messages to 100
    while (chatMessages.children.length > 100) {
        chatMessages.removeChild(chatMessages.firstChild);
    }
}

// Send message from input
function sendMessage() {
    const text = messageInput.value.trim();
    
    if (text) {
        // Random user type for demo
        const randomType = userTypes[Math.floor(Math.random() * userTypes.length)];
        const randomName = getRandomName();
        const randomAvatar = getRandomAvatar();
        
        addMessage(randomName, text, randomType, randomAvatar);
        messageInput.value = '';
        messageInput.focus();
    }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Demo messages on load
const demoMessages = [
    { name: 'Нефритовый Бессмертный', text: 'Приветствую всех культиваторов! 大家好!', type: 'moderator', avatar: '🧙' },
    { name: 'Мастер Лотоса', text: 'Сегодня отличная погода для медитации 🪷', type: 'vip', avatar: '🧝' },
    { name: 'Персиковый Демон', text: 'Кто хочет вместе практиковать технику персикового цветка? 🍑', type: 'subscriber', avatar: '🧚' },
    { name: 'Золотой Дракон', text: 'Я достиг нового уровня культивации! ⚡', type: 'regular', avatar: '🐉' },
    { name: 'Серебряная Луна', text: 'Поздравляю с прогрессом! 🌙', type: 'subscriber', avatar: '🧜' },
    { name: 'Огненный Феникс', text: 'Давайте обменяемся опытом cultivation 🔥', type: 'vip', avatar: '🦅' },
    { name: 'Туманный Странник', text: 'Ищу группу для совместных практик. Кто со мной?', type: 'regular', avatar: '🧠' },
    { name: 'Громовой Меч', text: 'Всем удачи на пути к бессмертию! ⚡', type: 'moderator', avatar: '🧛' }
];

// Add demo messages with delay
let delay = 0;
demoMessages.forEach((msg, index) => {
    setTimeout(() => {
        addMessage(msg.name, msg.text, msg.type, msg.avatar);
    }, delay);
    delay += 500;
});

// Console welcome message
console.log('%c🍑 Чат Культиваторов запущен! 🪷', 'font-size: 20px; color: #d4af37;');
console.log('%cПуть к бессмертию начинается здесь...', 'font-size: 14px; color: #ffb7c5;');
