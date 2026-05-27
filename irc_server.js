const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

let messages = [];
const MAX_MESSAGES = 100;

app.get('/api/irc/messages', (req, res) => {
    res.json({ messages: messages.slice(-50) });
});

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


const port = process.env.PORT || 3001;
app.listen(port, '0.0.0.0', () => {
    console.log(`Katana IRC Server running on port ${port}`);
});
