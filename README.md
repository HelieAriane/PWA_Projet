# PWA_Projet
La section Avis et alertes présente les avis et alertes qui ont été émis par l'outil de gestion des alertes de la Ville. Les avis et alertes communiquent les renseignements importants à la population en cas d'urgence et en situations pouvant avoir un impact sur la vie quotidienne (ex: avis d'ébullition d'eau, travaux, fermeture de piscine, etc.).

L'objectif de ce projet est de rendre l'information plus accessible et plus facile à consulter pour les citoyens de Montréal. Nous voulons que les informations soit accessibles en tout temps, même sans connexion internet et que les citoyens reçoivent des notifications d'alertes (sur leurs appareils) dès qu'elles sont émises, sans avoir à consulter directement l'application.

Pour ce faire, nous allons transformer le site web en application web progressive (PWA). Le développement se fera en 3 phases, avec la première se concentrant sur la création de l'interface interactive.

## Mandat du projet
Capture du site d'avis et alertes de la ville de Montréal
Pour la première phase du projet, vous devez créer une application avec React reproduisant le plus fidèlement possible la structure de la page (voir image plus haut). L'application aura des fonctionnalités de recherche et filtre et présentera deux pages principales: la page d'accueil et la page de détail.

1. Page d'accueil: Présente la liste des alertes et fournis des capacités de recherche.
2. Page de détail: Présente le détail d'une alerte spécifique.


## Spécifications
- **En-tête:** L'entête inclut le logo de la Ville et un lien de connexion Mon Compte (inactif).
  - Les deux pages principales partagent le même en-tête
  - L'en tête n'a pas besoin d'être collante (suivre le défilement de la page)
- **Recherche:** La recherche se fait sur le nom (titre) des alertes et avis.
- **Filtre:** Pour chaque filtre (arrondissement, date, sujet), seule une valeur peut être sélectionnée à la fois.
  - Filtre de date: Utilisez deux champs texte pour représenter la période.
  - Plusieurs filtres peuvent être actifs en même temps
- **S'abonner aux alertes:** Le lien M'abonner affiche un message informant que la fonctionnalité n'est pas encore disponible.
- **Liste des alertes:** La pagination est optionnelle. Vous pouvez:
  - Afficher toutes des alertes sur un même page OU
  - Ajouter un bouton en fin de liste pour charger plus d'alertes
- **Page de détail:** La page de détail affiche le contenu complet de l'alerte sélectionnée.
- **Responsive design:** L'interface doit être adaptée aux petits écrans (mobile)
- **Données:** Pour ce projet, nous n'utiliserons pas de données réelles (API). Vous pouvez utiliser des données fictives ou des données simulées.


## Évaluation
L'évaluation de ce projet se fera en fonction des critères suivants :

- Structure de l'application.
- Décomposition en composant.
- Respect de la spécification.
- Fidélité de l'interface utilisateur.
- Adaptation de l'interface aux petits écrans.
- Qualité du code et respect des bonnes pratiques.
- Maitrise du code et de l'application.

Ce projet compte pour **30% de la note finale**. Vous devez remettre votre projet sur GitHub avant la date limite de remise: **dimanche 6 avril**. Des **pénalités de 10% par jour de retard** seront appliquées **jusqu'au 8 avril**. Au-delà de cette date, une note de 0 sera attribuée au devoir. Une évaluation de votre application et de votre maîtrise aura lieu en classe le **mardi 8 avril**.
