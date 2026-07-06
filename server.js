const express = require('express');
const app = express();
const axios = require('axios');

app.get('/', async (req, res) => {
    let ip = req.headers['x-forwarded-for']?.split(',')[0] || req.headers['x-real-ip'] || req.ip || req.connection.remoteAddress;

    if (ip === '::1' || ip === '127.0.0.1') {
        try {
            const response = await axios.get('https://api.ipify.org?format=json');
            ip = response.data.ip;
        } catch (error) {
            console.log("Erreur IP:", error.message);
        }
    }

    try {
        const geo = await axios.get(`http://ip-api.com/json/${ip}`);
        console.log("=== VISITE ===");
        console.log(`IP: ${ip}`);
        console.log(`Pays: ${geo.data.country}`);
        console.log(`Ville: ${geo.data.city}`);
        console.log(`ISP: ${geo.data.isp}`);
        console.log(`Heure: ${new Date().toISOString()}`);
        console.log("=============");
        res.send(`<h1>IP: ${ip}</h1><p>Pays: ${geo.data.country}</p>`);
    } catch (error) {
        console.log("Erreur:", error.message);
        res.send(`<h1>Erreur</h1>`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
