import fetch from 'node-fetch';

const API_URL = "https://donnees.montreal.ca/dataset/556c84af-aebf-4ca9-9a9c-2f246601674c/resource/d249e452-46f5-422f-91ae-898c98eea6cc/download/avis-alertes.geojson";

fetch(API_URL)
  .then(res => {
    console.log("Status:", res.status);
    return res.json();
  })
  .then(data => {
    console.log("Nombre d'alertes:", data.features?.length);
  })
  .catch(err => {
    console.error("Erreur fetch:", err.message);
  });
