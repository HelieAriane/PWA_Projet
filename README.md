# PWA_Projet
La section Avis et alertes présente les avis et alertes qui ont été émis par l'outil de gestion des alertes de la Ville. Les avis et alertes communiquent les renseignements importants à la population en cas d'urgence et en situations pouvant avoir un impact sur la vie quotidienne (ex: avis d'ébullition d'eau, travaux, fermeture de piscine, etc.).

L'objectif de ce projet est de rendre l'information plus accessible et plus facile à consulter pour les citoyens de Montréal. Nous voulons que les informations soit accessibles en tout temps, même sans connexion internet et que les citoyens reçoivent des notifications d'alertes (sur leurs appareils) dès qu'elles sont émises, sans avoir à consulter directement l'application.

Pour ce faire, nous allons transformer le site web en application web progressive (PWA). Le développement se fera en 3 phases, avec la première se concentrant sur la création de l'interface interactive. La seconde phase du projet, vise à enrichir l'application en améliorant les filtres et la présentation et transformer l'application en PWA.

## Mandat du projet
L'application aura des fonctionnalités de recherche et filtre et présentera deux pages principales: la page d'accueil et la page de détail.

1. Page d'accueil: Présente la liste des alertes et fournis des capacités de recherche.
2. Page de détail: Présente le détail d'une alerte spécifique.


## Spécifications
- **En-tête:** L'entête inclut le logo de la Ville et un lien de connexion Mon Compte (inactif).
  - Les deux pages principales partagent le même en-tête
  - L'en tête n'a pas besoin d'être collante (suivre le défilement de la page)
- **Recherche:** La recherche se fait sur le nom (titre) des alertes et avis.
- **Filtre:** Pour chaque filtre (arrondissement, date, sujet), plusieurs valeurs peuvent être sélectionnées (sauf pour la date).
  - Filtre de date: Utilisez deux champs texte pour représenter la période.
  - Plusieurs filtres peuvent être actifs en même temps
  - Lorsqu'une valeur est sélectionné, elle s'ajoute à la liste des filtres actifs.
  - Ajouter un bouton "Tout effacer" pour réinitialiser les filtres.
- **S'abonner aux alertes:** Le lien M'abonner affiche un message informant que la fonctionnalité n'est pas encore disponible.
- **Liste des alertes:** La pagination est optionnelle. Vous pouvez:
  - Afficher toutes des alertes sur un même page OU
  - Ajouter un bouton en fin de liste pour charger plus d'alertes
- **Page de détail:** La page de détail affiche le contenu complet de l'alerte sélectionnée.
- **Responsive design:** L'interface doit être adaptée aux petits écrans (mobile)
- **Données (API):** Les données présentées dans l'application doivent provenir de l'API de la ville.
- **Application installable (PWA):** L'application doit pouvoir être installé sur un téléphone Android ou iOS.
  - Assurez-vous d'avoir une icone convenable pour tous les systèmes d'exploitation
- **Mode hors-ligne (PWA):**  L'application doit être demeuré utilisable sans connexion internet.
  - Les derniers avis téléchargés doivent demeurer accessible
  - La navigation entre les pages doit demeurer fonctionnelle
