# DigitQuest

**Application web interactive pour résoudre le puzzle mathématique vietnamien**

## 🎯 Vue d'ensemble

DigitQuest est une application full-stack qui permet de résoudre et d'interagir avec un puzzle mathématique vietnamien fascinant. Le défi consiste à placer les chiffres de 1 à 9 dans une grille 3x3 pour satisfaire l'équation :

```
A + (13 × B) / C + D + (12 × E) - F - 11 + (G × H) / I - 10 = 66
```

Chaque lettre (A-I) représente une position dans la grille contenant un chiffre unique de 1 à 9.

## 🏗️ Architecture

Le projet est divisé en deux parties principales :

### Backend (`/Backend`)

- **Spring Boot 3** avec Java 17
- API REST complète avec validation
- Algorithme de backtracking pour générer toutes les solutions
- Base de données H2 pour la persistance
- Documentation Swagger intégrée
- Tests complets (unitaires et d'intégration)

### Frontend (`/digitquest-frontend`)

- **React 19** avec TypeScript et Vite
- Interface interactive responsive
- Grille de puzzle avec validation en temps réel
- Recherche de solutions avancée
- Historique et gestion des solutions
- Design moderne avec Tailwind CSS

## ✨ Fonctionnalités principales

- 🧩 **Puzzle interactif** : Grille cliquable avec feedback visuel
- 🔍 **Recherche intelligente** : Trouvez des solutions par position/valeur
- 📊 **Génération automatique** : Algorithme pour calculer toutes les solutions possibles
- 📝 **Gestion CRUD** : Créer, modifier, supprimer des solutions
- 📱 **Protection d'accès** : Optimisé pour desktop (1024px minimum)
- 🎨 **Interface moderne** : Design responsive avec animations fluides

## 🚀 Démarrage rapide

### Backend

```bash
cd Backend
./mvnw spring-boot:run
# API disponible sur http://localhost:8080
# Swagger UI sur http://localhost:8080/swagger-ui.html
```

### Frontend

```bash
cd digitquest-frontend
npm install
npm run dev
# Application sur http://localhost:5173
```

## 📚 Documentation complète

Chaque composant dispose de sa documentation détaillée :

- **Backend** : `/Backend/README.md` + documentation technique dans `/Backend/doc/`
- **Frontend** : `/digitquest-frontend/README.md`
- **API** : Swagger UI intégré ou `/Backend/doc/API_DOCUMENTATION.md`

## 🛠️ Technologies

**Backend** : Spring Boot 3, Java 17, H2 Database, Maven, JUnit 5  
**Frontend** : React 19, TypeScript, Vite, Tailwind CSS, React Router

---

_Projet développé par J-Babin - Un défi mathématique transformé en expérience interactive_
