const socket = io();
const messages = document.getElementById('messages');
const form = document.getElementById('messageForm');
const input = document.getElementById('messageInput');

// For simplicity, create a random user ID for this session
const userId = Math.random().toString(36).substr(2, 9);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = input.value.trim();
  if (msg) {
    // Send message along with userId
    socket.emit('sendMessage', { text: msg, sender: userId });
    input.value = '';
  }
});

socket.on('receiveMessage', (data) => {
  const bubble = document.createElement('div');
  bubble.textContent = data.text;
  bubble.classList.add('message-bubble');
  if (data.sender === userId) {
    bubble.classList.add('own');
  }
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
});
