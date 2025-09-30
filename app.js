// Connect to the Socket.IO server
const socket = io();

// Get necessary DOM elements
const messages = document.getElementById('messages');
const form = document.getElementById('messageForm');
const input = document.getElementById('messageInput');

// Generate a random user ID for this client session
const userId = Math.random().toString(36).substr(2, 9);

// Listen for form submission to send a new message
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = input.value.trim();
  if (msg !== '') {
    // Emit the message with the sender ID to the server
    socket.emit('sendMessage', { text: msg, sender: userId });
    input.value = '';
  }
});

// Listen for incoming messages from the server
socket.on('receiveMessage', (data) => {
  // Create a message bubble div
  const bubble = document.createElement('div');
  bubble.classList.add('message-bubble');

  // If the message is from this user, add the 'own' class for styling
  if (data.sender === userId) {
    bubble.classList.add('own');
  }

  // Set the text content of the bubble
  bubble.textContent = data.text;

  // Append the bubble to the messages container
  messages.appendChild(bubble);

  // Scroll to the newest message
  messages.scrollTop = messages.scrollHeight;
});
