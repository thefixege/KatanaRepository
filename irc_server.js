const express = require('express');
const app = express();

app.use(express.json());

// Хранилище сообщений
let messages = [];
const MAX_MESSAGES = 100;

// Получить сообщения
app.get('/api/irc/messages', (req, res) => {
    res.json({ messages: messages.slice(-50) });
});

// Отправить сообщение
app.post('/api/irc/send', (req, res) => {
    const { user, text } = req.body;
    
    const message = {
        user: user,
        text: text,
        time: Date.now()
    };
    
    messages.push(message);
    
    if (messages.length > MAX_MESSAGES) {
        messages.shift();
    }
    
    console.log(`[IRC] ${user}: ${text}`);
    res.json({ success: true });
});

const server = app.listen(3001, '0.0.0.0', () => {
    console.log('Katana IRC Server started on port 3001');
    console.log('http://localhost:3001');
});