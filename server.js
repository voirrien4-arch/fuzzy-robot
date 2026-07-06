const express = require('express');
const app = express();
const axios = require('axios');

app.get('/', async (req, res) => {
    // 1. Récupère l'IP depuis les headers de Render
    let ip = req.headers['x-forwarded-for']?.split(',')[0] ||
            req.headers['x-real-ip'] ||
            req.ip ||
            req.connection.remoteAddress;

    // 2. Si l'IP est locale, on la récupère via une API externe
    if (ip === '::1' || ip === '127.0.0.1' || ip === '::ffff:127.0.0.1') {
        try {
            const response = await axios.get('https://api.ipify.org?format=json');
            ip = response.data.ip;
        } catch (error) {
            console.log("Erreur IP externe:", error.message);
        }
    }

    // 3. Récupère la localisation via ip-api.com
    try {
        const geoResponse = await axios.get(`http://ip-api.com/json/${ip}`);
        const geo = geoResponse.data;

        console.log("=== NOUVELLE VISITE ===");
        console.log(`IP: ${ip}`);
        console.log(`Pays: ${geo.country}`);
        console.log(`Ville: ${geo.city}`);
        console.log(`Région: ${geo.regionName}`);
        console.log(`Coordonnées: ${geo.lat}, ${geo.lon}`);
        console.log(`ISP: ${geo.isp}`);
        console.log(`User-Agent: ${req.headers['user-agent']}`);
        console.log(`Heure: ${new Date().toISOString()}`);
        console.log("======================");

        res.send(`<h1>Tracké !</h1><p>IP: ${ip}</p><p>Pays: ${geo.country}</p><p>Ville: ${geo.city}</p>`);
    } catch (error) {
        console.log("Erreur géolocalisation:", error.message);
        res.send(`<h1>Erreur: ${error.message}</h1>`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});    console.log(`Heure: ${userData.timestamp}`);
    console.log('-----------------------');

    res.send(`<h1>Salut, ton pote t'a envoyé ce lien !</h1>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
