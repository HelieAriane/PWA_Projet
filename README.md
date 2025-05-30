# PWA_Projet
La section Avis et alertes présente les informations importantes émises par l'outil de gestion des alertes de la Ville de Montréal. Ces avis et alertes sont destinés à informer rapidement la population en cas d'urgence ou de situations ayant un impact sur la vie quotidienne (ex. : avis d’ébullition d’eau, travaux publics, fermetures de services municipaux comme les piscines, etc.).

Ce projet a pour objectif de rendre ces informations plus accessibles, consultables en tout temps, et immédiatement disponibles pour les citoyens, même sans connexion Internet. Il vise également à permettre aux utilisateurs de recevoir des notifications directement sur leurs appareils dès la publication de nouvelles alertes, sans avoir à consulter manuellement l'application.

Pour y parvenir, nous avons entrepris la transformation du site web existant en une application web progressive (PWA), en suivant une approche en trois phases :

- **Phase 1** : Création d’une interface utilisateur interactive avec React, incluant des pages de liste et de détail, ainsi que des fonctions de recherche et de filtrage de base.

- **Phase 2** : Enrichissement de l’expérience utilisateur en améliorant la présentation, les fonctionnalités de recherche et de filtrage, et en ajoutant le support complet de la PWA (mode hors ligne, installation mobile).

- **Phase 3** : Ajout des notifications push, intégration d’un backend Express avec base de données, optimisation des performances et production d’un rapport technique d’évaluation.

Ce projet met donc l’accent sur l’utilisabilité, l’accessibilité et la réactivité, au service des citoyens de Montréal.

**URL du site** : https://avis-alertes-arianehelie.netlify.app/

## Mandat du projet
L'application aura des fonctionnalités de recherche et filtre et présentera deux pages principales: la page d'accueil et la page de détail.

1. Page d'accueil: Présente la liste des alertes et fournis des capacités de recherche.
2. Page de détail: Présente le détail d'une alerte spécifique.


## Fonctionnalités principales
### Phase 1 – Interface utilisateur
- Affichage des alertes sous forme de liste
- Page de détails pour chaque alerte
- Barre de recherche (sur le titre)
- Filtres simples par arrondissement, date, sujet
- Responsive design mobile
- Données simulées (fictives)

### Phase 2 – Application PWA enrichie
- Filtrage multiple (sauf pour la date)
- Liste des filtres actifs.
- Bouton “Tout effacer” pour réinitialiser les filtres
- Données en temps réel à partir de l’API officielle de la Ville de Montréal
- Pagination
- **Mode hors-ligne** : accès aux dernières données et navigation sans connexion
- **Application installable sur mobile** (icône, manifest, service worker)

### Phase 3 – Notifications et backend
- Abonnement aux notifications push via une interface modale
- Choix des notifications par **arrondissement** et **sujet**
- Réception des notifications même si l’application est fermée (et intégrées si ouverte)
- **Backend Express** simulant un serveur de la Ville :
  - Requêtes **GET** pour les alertes (avec pagination et filtres)
  - Requêtes **POST** : `/subscribe`, `/unsubscribe`, `/send-notification`
- Connexion à une base de données **MongoDB**

## Structure du projet 
```plaintext
avis-alertes/
├── backend/                                         # Serveur Express.js
│   ├── db/
│   │   └── connects.js                              # Connexion à la base de données MongoDB
│   ├── models/                                      # Modèles de données Mongoose
│   │   ├── Notification.js
│   │   └── Subscription.js
│   ├── routes/
│   │   └── push-routes.js                           # Routes pour gérer les abonnements push
│   ├── utils/
│   │   └── push-service.js                          # Logique pour l’envoi de notifications push
│   ├── .env                                         # Variables d’environnement
│   └── index.js                                     # Fichier principal du serveur Express
│
└── frontend/                                        # Application PWA React
    ├── dist/                                        # Build de production
    │   ├── assets/
    │   │   └── icons/
    │   │       ├── android/
    │   │       └── ios/
    │   ├── index.html                               # Page principale générée
    │   ├── manifest.json                            # Configuration de l'application web
    │   └── sw.js                                    # Service Worker (notifications/cache)
    │
    ├── public/                                      # Fichiers statiques publics
    │   ├── icons/
    │   │   ├── android/
    │   │   └── ios/
    │   ├── manifest.json
    │   └── sw.js
    │
    ├── src/                                         # Code source React
    │   ├── assets/                                  # Fichiers statiques (images)
    │   ├── components/                              # Composants UI réutilisables
    │   │   ├── Account.jsx
    │   │   ├── ActiveSearchAndFilters.jsx
    │   │   ├── AlertItem.jsx
    │   │   ├── AlertList.jsx
    │   │   ├── Filters.jsx
    │   │   ├── Logo.jsx
    │   │   ├── Map.jsx
    │   │   ├── Pagination.jsx
    │   │   ├── SearchBar.jsx
    │   │   ├── SubscribeButton.jsx
    │   │   └── SubscriptionModal.jsx
    │   ├── data/
    │   │   └── Api.js                               # Appels vers l'API backend
    │   ├── layouts/                                 # Sections de mise en page principales
    │   │   ├── ActiveSearchAndFiltersSection.jsx
    │   │   ├── AlertSection.jsx
    │   │   ├── FilterSection.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Header.jsx
    │   │   ├── MapSection.jsx
    │   │   ├── Nav.jsx
    │   │   ├── PaginationSection.jsx
    │   │   ├── SearchSection.jsx
    │   │   └── SubscriptionSection.jsx
    │   ├── pages/                                  # Pages principales de l'app
    │   │   ├── AlertDetails.jsx
    │   │   └── Home.jsx
    │   ├── utils/                                  # Fonctions utilitaires
    │   │   ├── cache.js
    │   │   └── date.js
    │   ├── App.css                                 # Styles globaux
    │   ├── App.jsx                                 # Composant racine React
    │   ├── index.css
    │   └── main.jsx                                # Point d'entrée React (ReactDOM)
    │
    └── index.html                                  # Page HTML de base (utile pour certaines config PWA)
```

## Installation et exécution
### Prérequis
Assurez-vous d'avoir ces éléments suivants sur votre machine :
- Node.js
- MongoDB

### 1. Cloner le projet
```bash
git clone https://github.com/HelieAriane/PWA_Projet.git
cd PWA_Projet
```

### 2. Configuration du Backend
#### 2.1 Installer les dépendances
```bash
cd backend
npm install
```

#### 2.2 Configuration des variables d'environnement
Créez un fichier .env dans le répertoire backend/ avec les variables suivantes :
```env
# Port du serveur
PORT=3000

# URL de connexion MongoDB
MONGODB_URI=mongodb://localhost:27017/avis-alertes

# Configuration VAPID pour les notifications push
VAPID_PUBLIC_KEY=votre_cle_publique_vapid
VAPID_PRIVATE_KEY=votre_cle_privee_vapid
VAPID_SUBJECT=mailto:votre-email@example.com
```

#### 2.3 Démarrer le serveur backend
```bash
npm run dev
```
Le serveur backend sera accessible à l'adresse http://localhost:300

### 3. Configuration du Frontend
#### 3.1 Installer les dépendances
Dans un nouveau terminal :
```bash
cd backend
npm install
```

#### 3.2 Démarrer l'application en mode développement
```bash
npm run dev
```
L'application sera accessible à l'adresse http://localhost:5173

### 4. Configuration de MongoDB (MongoDB local)
1. Installez MongoDB localement si n'est pas déjà fait.
2. Démarrez le service MongoDB
3. La base de données avis-alertes sera créée automatiquement

### 5. Configuration des notifications push
Pour activer les notifications push :
1. Générez des clés VAPID :
```bash
npx web-push generate-vapid-keys
```
2. Ajoutez les clés dans le fichier .env du backend
3. Mettez à jour la clé publique dans le frontend (src/data/Api.js)

## Utilisation
### Interface principale
- Page d'accueil : Consultez la liste des alertes avec possibilité de recherche et filtrage
- Recherche : Recherchez dans les titres des alertes
- Filtres : Utilisez les filtres par arrondissement, sujet et date
- Notifications : Abonnez-vous aux notifications pour recevoir les alertes en temps réel
- Page de détail : Cliquez sur une alerte pour voir les détails complets

## Mode hors-ligne
L'application fonctionne même sans connexion Internet grâce au service worker qui met en cache les données et les ressources.

## Installation de l'application
### Sur mobile
Sur un appareil mobile (Android/iOS), vous pouvez installer l'application directement depuis le navigateur :
- Android : Recherchez l'icône "Ajouter à l'écran d'accueil" dans le menu du navigateur
- iOS : Appuyez sur le bouton de partage puis sélectionnez "Sur l'écran d'accueil"

### Sur desktop
Sur ordinateur, l'application peut également être installée :
- Chrome/Edge : Cliquez sur l'icône d'installation dans la barre d'adresse ou via le menu "Installer [nom de l'app]"
- Firefox : Utilisez l'option "Installer cette application" dans le menu
Une fois installée, l'application apparaîtra comme une application native dans votre système d'exploitation
