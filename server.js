// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Create Socket.IO instance attached to the HTTP server
const io = socketIo(server);

// Serve static files from the 'public' folder (where your index.html and frontend JS live)
app.use(express.static('public'));

// Listen for new WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for 'sendMessage' events from clients
  socket.on('sendMessage', (data) => {
    // Broadcast the message to all connected clients (including sender)
    io.emit('receiveMessage', data);
  });

  // Handle client disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Start server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
