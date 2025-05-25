import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

// Connexion à une base de données locale
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,      // Utilise le nouveau parseur d'URL
  useUnifiedTopology: true,   // Utilise le nouveau moteur de topologie
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));

export default mongoose;
