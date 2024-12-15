const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Роздаємо статистичні файли
app.use(express.static(__dirname + '/public'));

// Підключення користувачів
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Розсилаємо повідомлення всім клієнтам
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Запуск сервера
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
