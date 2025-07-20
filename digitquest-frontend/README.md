# DigitQuest Frontend

DigitQuest est une application web interactive de puzzle mathématique développée avec React, TypeScript et Vite. L'application propose un jeu de réflexion où les utilisateurs doivent placer des chiffres de 1 à 9 dans une grille pour résoudre des équations mathématiques.

## 🎮 Aperçu du Jeu

DigitQuest présente une grille de puzzle mathématique où chaque case contient soit :

- Un chiffre à deviner (représenté par des lettres A-I)
- Un opérateur mathématique (+, -, x, :)
- Un résultat d'équation

Le défi consiste à placer les chiffres 1-9 de manière à ce que toutes les équations horizontales et verticales soient correctes.

## 🚀 Fonctionnalités

### Core Features

- **Puzzle Interactif** : Grille de puzzle mathématique avec validation en temps réel
- **Recherche de Solutions** : Recherche de solutions par position (format A:1, B:5, etc.)
- **Historique** : Visualisation de toutes les solutions générées
- **Détails des Solutions** : Page dédiée pour modifier ou supprimer des solutions
- **Génération Automatique** : Génération algorithmique de toutes les solutions possibles

### Interface Utilisateur

- **Design Responsive** : Optimisé pour les écrans desktop/laptop
- **Navigation Intuitive** : Barre de navigation latérale avec icônes
- **Animations Fluides** : Utilisation de Framer Motion pour les transitions
- **Notifications** : Toast notifications pour le feedback utilisateur
- **Mode Sombre** : Support du thème sombre via Tailwind CSS

### Protection d'Accès

- **Garde de Périphérique** : Restriction d'accès aux appareils mobiles/tablettes
- **Résolution Minimale** : Requiert 1024px de largeur minimum

## 🛠️ Technologies Utilisées

### Frontend Stack

- **React 19.1.0** : Bibliothèque UI avec hooks modernes
- **TypeScript** : Typage statique pour plus de robustesse
- **Vite 7.0.4** : Build tool moderne et rapide
- **React Router DOM 7.7.0** : Navigation SPA

### Styling & UI

- **Tailwind CSS 4.1.11** : Framework CSS utilitaire
- **Flowbite 3.1.2** : Composants UI prêts à l'emploi
- **Framer Motion 12.23.6** : Animations et transitions
- **Lucide React** : Icônes modernes et cohérentes

### State Management & Utils

- **Axios 1.10.0** : Client HTTP pour les API calls
- **React Hot Toast** : Système de notifications
- **SweetAlert2** : Modales et alertes élégantes

### Development Tools

- **ESLint** : Linting et qualité de code
- **TypeScript ESLint** : Rules spécifiques TypeScript

## 📁 Structure du Projet

```
src/
├── api/                    # Couche d'accès aux données
│   ├── index.ts           # Configuration Axios
│   └── solutions.ts       # API calls solutions
├── components/            # Composants réutilisables
│   ├── DeviceGuard.tsx    # Protection périphériques
│   ├── Layout/            # Layout principal
│   ├── Navbar/            # Navigation latérale
│   └── PuzzleGrid/        # Composants grille
│       ├── Cell.tsx       # Cellule individuelle
│       ├── Modal.tsx      # Modal (unused)
│       └── PuzzleGrid.tsx # Grille complète
├── data/                  # Configuration données
│   └── PuzzleData.ts      # Structure grille & mapping
├── hooks/                 # Hooks personnalisés
│   └── UseDeviceDetection.tsx # Détection appareil
├── pages/                 # Pages de l'application
│   ├── DetailsPage.tsx    # Détails/édition solution
│   ├── HistoryPage.tsx    # Historique solutions
│   ├── HomePage.tsx       # Page d'accueil
│   ├── PuzzlePage.tsx     # Jeu principal
│   └── SearchSolutionPage.tsx # Recherche solutions
├── router/                # Configuration routing
│   ├── index.tsx         # Export router
│   └── Routes.tsx        # Définition routes
├── App.tsx               # Composant racine
├── main.tsx             # Point d'entrée
└── tailwind.css         # Styles globaux
```

## 🎯 Pages et Navigation

### 1. Accueil (`/`)

- Page d'accueil avec message de bienvenue
- Point d'entrée de l'application

### 2. Puzzle (`/puzzle`)

- Interface principale du jeu
- Grille interactive 6x7 avec validation
- Boutons Submit et Reset
- Logique de validation des chiffres uniques

### 3. Recherche (`/search`)

- Recherche de solutions par position:valeur
- Format : `A:1`, `B:5`, etc.
- Affichage des résultats sous forme de grilles
- Tooltip d'aide intégré

### 4. Historique (`/history`)

- Liste de toutes les solutions générées
- Génération automatique des solutions
- Suppression en masse
- Navigation vers les détails

### 5. Détails (`/details`)

- Édition de solutions existantes
- Validation en temps réel
- Sauvegarde et suppression
- Retour intelligent à la page précédente

## 🔧 Installation et Démarrage

### Prérequis

- Node.js 18+
- npm ou yarn
- Backend API DigitQuest en fonctionnement

### Installation

```bash
# Cloner le repository
git clone [url-repository]
cd digitquest-frontend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec l'URL de votre backend
```

### Variables d'Environnement

```bash
VITE_API_URL=http://localhost:3000/api/v1
```

### Commandes Disponibles

```bash
# Démarrage en développement
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview

# Linting
npm run lint
```

### Accès à l'Application

- **Développement** : http://localhost:8080
- **Production** : Selon votre déploiement

## 🎮 Guide d'Utilisation

### Jouer au Puzzle

1. **Naviguer vers `/puzzle`**
2. **Observer la grille** :
   - Cases vides (A-I) : à remplir avec des chiffres 1-9
   - Cases fixes : opérateurs et résultats
3. **Placer les chiffres** :
   - Chaque chiffre 1-9 ne peut être utilisé qu'une fois
   - Les équations doivent être valides horizontalement et verticalement
4. **Valider** : Cliquer sur "Submit" pour vérifier la solution
5. **Recommencer** : "Reset" pour vider la grille

### Rechercher des Solutions

1. **Aller sur `/search`**
2. **Format de recherche** : `Position:Valeur` (ex: `A:1`)
3. **Voir les résultats** : Solutions affichées sous forme de grilles
4. **Cliquer sur une grille** : Accès aux détails pour modification

### Gérer l'Historique

1. **Visiter `/history`**
2. **Générer des solutions** : Bouton "Generate all possible solutions"
3. **Parcourir les solutions** : Grille de toutes les solutions
4. **Accéder aux détails** : Clic sur une solution

## 🏗️ Architecture Technique

### Gestion d'État

- **Local State** : useState pour les états composant
- **Custom Hooks** : usePuzzleLogic pour la logique métier
- **Memoization** : React.memo pour l'optimisation

### Communication API

- **Axios Configuration** : Instance centralisée
- **Error Handling** : Try/catch avec toast notifications
- **TypeScript Interfaces** : Types pour toutes les réponses API

### Performance

- **Code Splitting** : Lazy loading des pages
- **Memoization** : Composants memoized
- **Optimized Bundles** : Vite pour des builds rapides

### Responsive Design

- **Desktop First** : Optimisé pour écrans larges
- **Device Detection** : Hook custom pour la détection
- **Guard Component** : Restriction d'accès mobile

## 🔗 API Endpoints

L'application communique avec les endpoints suivants :

```typescript
// Solutions
GET    /solutions/           // Toutes les solutions
GET    /solutions/solution/:id // Solution par ID
POST   /solutions/generate   // Générer solutions
POST   /solutions/solution/check // Valider solution
POST   /solutions/solution/find  // Rechercher par position
PATCH  /solutions/solution/update/:id // Modifier solution
DELETE /solutions/solution/:id // Supprimer solution
DELETE /solutions/deleteAll   // Supprimer toutes
```

## 🎨 Thèmes et Styling

### Palette de Couleurs

- **Primary** : Bleus et violets (#d5d9f7)
- **Accents** : Rose et violet pour les animations
- **Backgrounds** : Gradients avec blobs animés
- **Text** : Grays avec bon contraste

### Composants Styled

- **Buttons** : Gradients avec hover effects
- **Inputs** : Focus states et validation visuelle
- **Navigation** : Hover tooltips et active states
- **Grids** : Shadow et spacing cohérents

## 🐛 Dépannage

### Problèmes Courants

**Application ne démarre pas**

```bash
# Vérifier les versions Node.js
node --version  # Doit être 18+
npm --version

# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

**Erreurs API**

- Vérifier que le backend est démarré
- Contrôler la variable `VITE_API_URL`
- Examiner la console pour les erreurs CORS

**Problèmes d'affichage**

- S'assurer d'utiliser un écran desktop (1024px+)
- Vider le cache du navigateur
- Vérifier les outils de développement pour les erreurs CSS

### Logs et Debugging

- **Console Browser** : F12 pour les erreurs JavaScript
- **Network Tab** : Vérifier les calls API
- **Vite Server** : Logs dans le terminal de développement

## 🚀 Déploiement

### Build de Production

```bash
# Créer le build
npm run build

# Le dossier dist/ contient les fichiers statiques
# À deployer sur votre serveur web
```

### Variables d'Environnement Production

```bash
VITE_API_URL=https://your-api-domain.com/api/v1
```

### Serveurs Recommandés

- **Netlify** : Déploiement automatique depuis Git
- **Vercel** : Intégration React optimisée
- **Nginx** : Pour serveurs personnalisés

## 🤝 Contribution

### Standards de Code

- **ESLint** : Suivre les rules configurées
- **TypeScript** : Types stricts obligatoires
- **Naming** : camelCase pour variables, PascalCase pour composants
- **Comments** : JSDoc pour les fonctions complexes

### Process de Contribution

1. Fork du repository
2. Branche feature (`git checkout -b feature/ma-feature`)
3. Commit des changements (`git commit -am 'Add: ma feature'`)
4. Push vers la branche (`git push origin feature/ma-feature`)
5. Pull Request avec description détaillée

## 📝 Changelog

### Version 0.0.0 (Actuelle)

- ✨ Interface puzzle mathématique complète
- 🔍 Système de recherche de solutions
- 📱 Protection d'accès desktop uniquement
- 🎨 Design moderne avec animations
- 🔄 CRUD complet pour les solutions
- 📊 Historique et statistiques

## 🙋‍♂️ Support

Pour toute question ou problème :

- **Issues** : Ouvrir une issue sur GitHub
- **Documentation** : Consulter ce README
- **Email** : [contact@digitquest.com]

---

**DigitQuest** - Défier son esprit, un chiffre à la fois ! 🧩✨
