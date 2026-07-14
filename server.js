const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require("socket.io");

const io = new Server(http, {
    cors: { 
            origin: "*", 
            methods: ["GET", "POST"] 
        }
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server ONLINE');
})

// Rota para o Python enviar dados (POST)
app.post('/telemetry', (req, res) => {
    console.log("🔴 Dados recebidos do Python:", req.body ? "Sim (Pacote OK)" : "Vazio");

    io.emit('telemetry_update', req.body);
    res.sendStatus(200);
});

// Log de conexão para sabermos que funcionou
io.on('connection', (socket) => {
    console.log(`🟢 Novo cliente conectado ao Socket! ID: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`⚪ Cliente desconectou: ${socket.id}`);
    });

    console.log(`💻 Browser conectado! ID: ${socket.id}`);
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});