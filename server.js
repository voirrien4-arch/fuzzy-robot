// Fichier: server.js
const express = require('express');
const app = express();
const geoip = require('geoip-lite');
const useragent = require('express-useragent');

app.use(useragent.express());

app.get('/', (req, res) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);
    const userAgent = req.useragent;

    const userData = {
        ip: ip,
        pays: geo ? geo.country : 'Inconnu',
        ville: geo ? geo.city : 'Inconnu',
        region: geo ? geo.region : 'Inconnu',
        latitude: geo ? geo.ll[0] : 'Inconnu',
        longitude: geo ? geo.ll[1] : 'Inconnu',
        navigateur: userAgent.browser,
        os: userAgent.os,
        platform: userAgent.platform,
        device: userAgent.isMobile ? 'Mobile' : 'Desktop',
        timestamp: new Date().toISOString(),
    };

    console.log('--- NOUVELLE VISITE ---');
    console.log(`IP: ${userData.ip}`);
    console.log(`Pays: ${userData.pays}`);
    console.log(`Ville: ${userData.ville}`);
    console.log(`Région: ${userData.region}`);
    console.log(`Coordonnées: ${userData.latitude}, ${userData.longitude}`);
    console.log(`Navigateur: ${userData.navigateur}`);
    console.log(`OS: ${userData.os}`);
    console.log(`Appareil: ${userData.device}`);
    console.log(`Heure: ${userData.timestamp}`);
    console.log('-----------------------');

    res.send(`<h1>Salut, ton pote t'a envoyé ce lien !</h1>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
