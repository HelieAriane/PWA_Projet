import './db/connect.js'
import express from 'express';
import cors from 'cors';
import routes from './routes/push-routes.js';

const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:5174', 
  'http://localhost:5175',
  'http://localhost:4173',
  'https://avis-alertes-arianehelie.onrender.com',
  'https://avis-alertes-arianehelie.netlify.app'
];

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Serveur Push API fonctionne !');
});

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Push server listening on http://localhost:${PORT}`);
});
