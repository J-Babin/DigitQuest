# DigitQuest API

**API REST pour résoudre le puzzle mathématique vietnamien**

## 📋 Description

DigitQuest est une application backend développée avec Spring Boot 3 qui permet de résoudre et gérer les solutions d'un puzzle mathématique vietnamien spécifique. Le puzzle consiste à placer les chiffres de 1 à 9 dans une grille de manière à ce que l'équation suivante soit égale à 66 :

```
A + (13 × B) / C + D + (12 × E) - F - 11 + (G × H) / I - 10 = 66
```

Où A, B, C, D, E, F, G, H, I sont des positions dans une grille 3x3 contenant les chiffres 1 à 9 (chaque chiffre utilisé une seule fois).

## 🚀 Fonctionnalités

- ✅ **Génération de solutions** : Algorithme de backtracking pour trouver toutes les solutions possibles
- ✅ **Gestion CRUD** : Création, lecture, mise à jour et suppression de solutions
- ✅ **Validation** : Vérification automatique de la validité des solutions
- ✅ **Recherche avancée** : Recherche de solutions par position/valeur spécifique
- ✅ **API documentée** : Interface Swagger UI disponible
- ✅ **Base de données** : Persistance avec H2 Database
- ✅ **Tests complets** : Tests unitaires et d'intégration

## 🛠️ Technologies

- **Java 17**
- **Spring Boot 3.5.3**
- **Spring Data JPA**
- **H2 Database** (base de données en mémoire)
- **Maven** (gestionnaire de dépendances)
- **Lombok** (réduction du code boilerplate)
- **SpringDoc OpenAPI 3** (documentation Swagger)
- **JUnit 5** (tests)

## 📦 Installation et Démarrage

### Prérequis
- Java 17 ou supérieur
- Maven 3.6 ou supérieur

### Installation

1. **Cloner le projet**
```bash
git clone https://github.com/J-Babin/DigitQuest.git
cd DigitQuest/Backend
```

2. **Compiler le projet**
```bash
mvn clean package
```

3. **Lancer l'application**
```bash
java -jar ./target/DigitQuest-0.0.1-SNAPSHOT.jar
```

Ou alternativement :
```bash
mvn spring-boot:run
```

### Configuration

L'application démarre sur le port **3000** par défaut.

- **Profil de développement** : `dev` (actif par défaut)
- **Base de données H2** : Console disponible sur `/h2`
- **Documentation API** : Swagger UI disponible sur `/`

## 🔗 API Endpoints

### Base URL
```
http://localhost:3000/api/v1/solutions
```

### Endpoints principaux

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/` | Récupérer toutes les solutions (résumé) |
| `GET` | `/solution/{id}` | Récupérer une solution par ID |
| `POST` | `/solution` | Créer une nouvelle solution |
| `PATCH` | `/solution/update/{id}` | Mettre à jour une solution |
| `DELETE` | `/solution/{id}` | Supprimer une solution |
| `POST` | `/solution/find` | Rechercher solutions par position/valeur |
| `POST` | `/solution/check` | Vérifier la validité d'une solution |
| `POST` | `/generate` | Générer toutes les solutions possibles |
| `DELETE` | `/deleteAll` | Supprimer toutes les solutions |
| `GET` | `/test` | Health check |

### Format des données

#### Exemple de solution (JSON)
```json
{
  "id": 1,
  "positions": "168259473",
  "gridJson": "{\"A\":1,\"B\":6,\"C\":8,\"D\":2,\"E\":5,\"F\":9,\"G\":4,\"H\":7,\"I\":3,\"result\":66.0}",
  "isValid": true,
  "calculationTimeMs": 250,
  "totalSolutions": 12,
  "createdAt": "2025-07-20T10:30:00",
  "updatedAt": "2025-07-20T10:30:00"
}
```

#### Structure de la grille
Les positions correspondent à une grille 3x3 :
```
A(0) B(1) C(2)
D(3) E(4) F(5)
G(6) H(7) I(8)
```

## 📚 Documentation API

La documentation complète de l'API est disponible via Swagger UI :
- **URL locale** : http://localhost:3000/
- **Format JSON** : http://localhost:3000/api-docs

## 🧪 Tests

### Lancer les tests
```bash
mvn test
```

### Types de tests inclus
- **Tests d'entité** (`SolutionEntityTest`) : Validation des données, persistance
- **Tests de repository** (`SolutionRepositoryTest`) : Requêtes de base de données
- **Tests de service** (`SolutionServiceTest`) : Logique métier
- **Tests DTO** : Validation des transferts de données

## 🗄️ Base de données

### Configuration H2
- **URL JDBC** : `jdbc:h2:file:./src/main/resources/database/digitquestdb`
- **Console H2** : http://localhost:3000/h2
- **Utilisateur** : `userDigitQuest`
- **Mot de passe** : `passwordDigitQuest`

### Structure de la table SOLUTION
```sql
CREATE TABLE SOLUTION (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    positions VARCHAR(9) NOT NULL,
    grid_json TEXT NOT NULL UNIQUE,
    is_valid BOOLEAN DEFAULT FALSE,
    calculation_time_ms BIGINT DEFAULT 0,
    total_solutions INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Configuration CORS

L'application est configurée pour accepter les requêtes depuis :
- `http://localhost:3000`
- `http://localhost:8080`

## 📊 Algorithme de résolution

L'application utilise un algorithme de **backtracking** pour résoudre le puzzle :

### Algorithme BacktrackingSolver

1. **Ordre de recherche optimisé** : B, C, G, H, I, E, A, D, F
2. **Deux modes de validation** :
   - **Mode strict** : Division entière uniquement
   - **Mode flexible** : Accepte les décimales
3. **Génération complète** : Trouve toutes les solutions possibles

### Utilisation programmatique
```java
BacktrackingSolver solver = new BacktrackingSolver(false); // mode flexible
List<SolutionEntity> solutions = solver.startSolve();
```

## 🚨 Gestion d'erreurs

L'API retourne des codes de statut HTTP appropriés :
- `200` : Succès
- `201` : Créé avec succès
- `404` : Ressource non trouvée
- `400` : Requête invalide
- `500` : Erreur serveur interne

## 🔄 Environnements

### Développement (profil `dev`)
- Base de données H2 en mode fichier
- Console H2 activée
- Logs de debug activés
- DDL auto : `create-drop`

### Production
- Configuration via variables d'environnement
- Base de données externe recommandée
- Logs en niveau INFO

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- **J-Babin** - Développeur principal

---

**Note** : Ce projet résout spécifiquement le puzzle mathématique vietnamien où l'objectif est d'obtenir la somme de 66 en utilisant les chiffres de 1 à 9 dans l'équation donnée.

