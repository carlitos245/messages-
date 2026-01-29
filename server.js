// Importation des modules
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

// Création de l'app Express
const app = express();
const server = http.createServer(app);

// Configuration Socket.IO (important pour Render)
const io = new Server(server, {
  cors: {
    origin: "*", // autorise GitHub Pages
    methods: ["GET", "POST"]
  }
});

// Servir les fichiers statiques du dossier "public"
app.use(express.static(path.join(__dirname, "public")));

// Route principale
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Gestion des connexions Socket.IO
io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté.");

  socket.on("message", (data) => {
    console.log("Message reçu :", data);
    io.emit("message", data); // renvoie à tout le monde
  });

  socket.on("disconnect", () => {
    console.log("Un utilisateur a quitté le chat.");
  });
});

// Lancer le serveur (Render utilise process.env.PORT)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Serveur en ligne sur le port " + PORT);
});
