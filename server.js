const express = require('express');
const chalk = require('chalk');
const ngrok = require('ngrok');
const app = express();
const port = 3000;

// Middleware pour servir des fichiers statiques (optionnel)
app.use(express.static('public'));

// Route pour l'interface
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Interface Stylée</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    text-align: center;
                    padding: 50px;
                }
                h1 {
                    color: #333;
                }
                .container {
                    background-color: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    max-width: 500px;
                    margin: 0 auto;
                }
                .link {
                    color: #007BFF;
                    font-size: 18px;
                    margin: 10px 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Bienvenue sur l'interface stylée</h1>
                <p>Voici le lien à partager :</p>
                <p class="link" id="ngrokLink">Chargement...</p>
            </div>
            <script>
                // Récupérer le lien ngrok depuis l'URL actuelle
                const currentUrl = window.location.href;
                document.getElementById('ngrokLink').textContent = currentUrl;
            </script>
        </body>
        </html>
    `);
});

// Démarrer le serveur
app.listen(port, async () => {
    console.log(
        chalk.green(`Serveur démarré sur http://localhost:${port}`)
    );

    // Lancer ngrok et afficher le lien
    try {
        const url = await ngrok.connect(port);
        console.log(
            chalk.blue(`Lien ngrok : ${url}`)
        );
        console.log(
            chalk.yellow(`Envoie ce lien à ta cible : ${url}`)
        );
    } catch (error) {
        console.error(
            chalk.red(`Erreur avec ngrok : ${error.message}`)
        );
    }
});
