// autor: HPX-Dev
// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/resolver', async (req, res) => {
    const shortUrl = req.query.url;

    if (!shortUrl) {
        return res.status(400).json({ error: 'URL não fornecida' });
    }

    try {
        const response = await fetch(shortUrl, {
            method: 'HEAD',
            redirect: 'follow',
        });

        res.json({ url: response.url });
    } catch (error) {
        console.error('Erro ao resolver link:', error);
        res.status(500).json({ error: 'Falha ao resolver o link' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
