# DigitQuest API - Documentation des Endpoints

## Base URL
```
http://localhost:3000/api/v1/solutions
```

## 📋 Sommaire des Endpoints

| Méthode | Endpoint | Description | Code Retour |
|---------|----------|-------------|-------------|
| `GET` | `/` | Liste toutes les solutions (résumé) | 200, 500 |
| `GET` | `/solution/{id}` | Récupère une solution spécifique | 200, 404, 500 |
| `POST` | `/solution` | Crée une nouvelle solution | 201, 400, 500 |
| `PATCH` | `/solution/update/{id}` | Met à jour une solution | 200, 404, 400, 500 |
| `DELETE` | `/solution/{id}` | Supprime une solution | 200, 404, 500 |
| `POST` | `/solution/find` | Recherche par position/valeur | 200, 404, 400, 500 |
| `POST` | `/solution/check` | Vérifie la validité | 200, 404, 400, 500 |
| `POST` | `/generate` | Génère toutes les solutions | 200, 500 |
| `DELETE` | `/deleteAll` | Supprime toutes les solutions | 200, 500 |
| `GET` | `/test` | Health check | 200 |

---

## 🔍 Détail des Endpoints

### 1. Récupérer toutes les solutions (résumé)

**GET** `/`

Retourne une liste résumée de toutes les solutions enregistrées.

#### Réponse de succès (200)
```json
[
  {
    "id": 1,
    "positions": "168259473",
    "isValid": true,
    "calculationTimeMs": 250,
    "createdAt": "2025-07-20T10:30:00"
  },
  {
    "id": 2,
    "positions": "937421865",
    "isValid": true,
    "calculationTimeMs": 180,
    "createdAt": "2025-07-20T10:31:15"
  }
]
```

#### Erreurs
- **500** : Erreur interne du serveur

---

### 2. Récupérer une solution spécifique

**GET** `/solution/{id}`

Retourne les détails complets d'une solution par son ID.

#### Paramètres
- `id` (Path Parameter) : ID de la solution (Long)

#### Réponse de succès (200)
```json
{
  "id": 1,
  "positions": "168259473",
  "gridJson": "{\"A\":1,\"B\":6,\"C\":8,\"D\":2,\"E\":5,\"F\":9,\"G\":4,\"H\":7,\"I\":3,\"result\":66.0}",
  "isValid": true,
  "calculationTimeMs": 250,
  "createdAt": "2025-07-20T10:30:00",
  "updatedAt": "2025-07-20T10:30:00"
}
```

#### Erreurs
- **404** : Solution non trouvée
- **500** : Erreur interne du serveur

---

### 3. Créer une nouvelle solution

**POST** `/solution`

Crée une nouvelle solution dans la base de données.

#### Corps de la requête
```json
{
  "positions": "168259473",
  "gridJson": "{\"A\":1,\"B\":6,\"C\":8,\"D\":2,\"E\":5,\"F\":9,\"G\":4,\"H\":7,\"I\":3,\"result\":66.0}",
  "isValid": true,
  "calculationTimeMs": 250
}
```

#### Validation
- `positions` : Obligatoire, exactement 9 chiffres de 1 à 9
- `gridJson` : Obligatoire, JSON valide
- `isValid` : Optionnel, défaut `false`
- `calculationTimeMs` : Optionnel, ≥ 0, défaut `0`

#### Réponse de succès (201)
```json
{
  "id": 3,
  "positions": "168259473",
  "gridJson": "{\"A\":1,\"B\":6,\"C\":8,\"D\":2,\"E\":5,\"F\":9,\"G\":4,\"H\":7,\"I\":3,\"result\":66.0}",
  "isValid": true,
  "calculationTimeMs": 250,
  "createdAt": "2025-07-20T10:45:00",
  "updatedAt": "2025-07-20T10:45:00"
}
```

#### Erreurs
- **400** : Données invalides (validation échouée)
- **500** : Erreur interne du serveur

---

### 4. Mettre à jour une solution

**PATCH** `/solution/update/{id}`

Met à jour partiellement une solution existante.

#### Paramètres
- `id` (Path Parameter) : ID de la solution à modifier

#### Corps de la requête (tous les champs optionnels)
```json
{
  "positions": "987654321",
  "gridJson": "{\"A\":9,\"B\":8,\"C\":7,\"D\":6,\"E\":5,\"F\":4,\"G\":3,\"H\":2,\"I\":1,\"result\":66.0}",
  "isValid": false,
  "calculationTimeMs": 500
}
```

#### Réponse de succès (200)
```json
{
  "id": 1,
  "positions": "987654321",
  "gridJson": "{\"A\":9,\"B\":8,\"C\":7,\"D\":6,\"E\":5,\"F\":4,\"G\":3,\"H\":2,\"I\":1,\"result\":66.0}",
  "isValid": false,
  "calculationTimeMs": 500,
  "createdAt": "2025-07-20T10:30:00",
  "updatedAt": "2025-07-20T10:50:00"
}
```

#### Erreurs
- **404** : Solution non trouvée
- **400** : Données invalides
- **500** : Erreur interne du serveur

---

### 5. Supprimer une solution

**DELETE** `/solution/{id}`

Supprime une solution spécifique.

#### Paramètres
- `id` (Path Parameter) : ID de la solution à supprimer

#### Réponse de succès (200)
Statut HTTP 200 sans contenu

#### Erreurs
- **404** : Solution non trouvée
- **500** : Erreur interne du serveur

---

### 6. Rechercher par position/valeur

**POST** `/solution/find`

Recherche toutes les solutions ayant une valeur spécifique à une position donnée.

#### Corps de la requête
```json
{
  "index": 1,
  "value": 6
}
```

#### Paramètres
- `index` : Position dans la grille (1-9)
- `value` : Valeur recherchée (1-9)

#### Réponse de succès (200)
```json
[
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
]
```

#### Erreurs
- **404** : Aucune solution trouvée
- **400** : Paramètres invalides
- **500** : Erreur interne du serveur

---

### 7. Vérifier la validité d'une solution

**POST** `/solution/check`

Vérifie si une combinaison de positions est une solution valide du puzzle.

#### Corps de la requête
```json
{
  "positions": "168259473"
}
```

#### Réponse de succès (200)
```json
"Solution valide"
```

#### Réponse d'échec (404)
```json
"Solution invalide"
```

#### Erreurs
- **400** : Format de positions invalide
- **500** : Erreur interne du serveur

---

### 8. Générer toutes les solutions

**POST** `/generate`

Lance l'algorithme de backtracking pour générer toutes les solutions possibles et les sauvegarder.

#### Corps de la requête
```json
{
  "solverStrict": false
}
```

#### Paramètres
- `solverStrict` : `true` pour mode strict (divisions entières), `false` pour mode flexible

#### Réponse de succès (200)
```json
[
  {
    "id": 1,
    "positions": "168259473",
    "gridJson": "{\"A\":1,\"B\":6,\"C\":8,\"D\":2,\"E\":5,\"F\":9,\"G\":4,\"H\":7,\"I\":3,\"result\":66.0}",
    "isValid": true,
    "calculationTimeMs": 1250,
    "totalSolutions": 12,
    "createdAt": "2025-07-20T11:00:00",
    "updatedAt": "2025-07-20T11:00:00"
  },
  // ... autres solutions
]
```

#### Erreurs
- **500** : Erreur interne du serveur

---

### 9. Supprimer toutes les solutions

**DELETE** `/deleteAll`

Supprime toutes les solutions de la base de données.

#### Réponse de succès (200)
Statut HTTP 200 sans contenu

#### Erreurs
- **500** : Erreur interne du serveur

---

### 10. Health Check

**GET** `/test`

Endpoint simple pour vérifier que l'API fonctionne.

#### Réponse de succès (200)
```json
"Health check"
```

---

## 📊 Codes de Statut HTTP

| Code | Description | Utilisation |
|------|-------------|-------------|
| **200** | OK | Opération réussie |
| **201** | Created | Ressource créée avec succès |
| **400** | Bad Request | Données invalides ou malformées |
| **404** | Not Found | Ressource non trouvée |
| **500** | Internal Server Error | Erreur côté serveur |

---

## 🔍 Structure de la Grille

Les positions dans le string `positions` correspondent à cette grille 3x3 :

```
Position:  | A(0) | B(1) | C(2) |
          |------|------|------|
          | D(3) | E(4) | F(5) |
          |------|------|------|
          | G(6) | H(7) | I(8) |
```

**Équation :** `A + (13 × B) / C + D + (12 × E) - F - 11 + (G × H) / I - 10 = 66`

---

## 📝 Exemples d'Utilisation

### Curl Examples

#### Récupérer toutes les solutions
```bash
curl -X GET http://localhost:3000/api/v1/solutions/
```

#### Créer une nouvelle solution
```bash
curl -X POST http://localhost:3000/api/v1/solutions/solution \
  -H "Content-Type: application/json" \
  -d '{
    "positions": "168259473",
    "gridJson": "{\"A\":1,\"B\":6,\"C\":8,\"D\":2,\"E\":5,\"F\":9,\"G\":4,\"H\":7,\"I\":3,\"result\":66.0}",
    "isValid": true,
    "calculationTimeMs": 250
  }'
```

#### Générer toutes les solutions (mode flexible)
```bash
curl -X POST http://localhost:3000/api/v1/solutions/generate \
  -H "Content-Type: application/json" \
  -d '{
    "solverStrict": false
  }'
```

#### Rechercher par position/valeur
```bash
curl -X POST http://localhost:3000/api/v1/solutions/solution/find \
  -H "Content-Type: application/json" \
  -d '{
    "index": 1,
    "value": 6
  }'
```

---

## 🔗 Documentation Interactive

Pour une exploration interactive de l'API, accédez à l'interface Swagger UI :

**URL :** http://localhost:3000/

Cette interface permet de :
- Visualiser tous les endpoints
- Tester les requêtes directement
- Voir les schémas des données
- Consulter les codes de retour détaillés

---

*Cette documentation couvre tous les endpoints de l'API DigitQuest. Pour plus d'informations techniques, consultez le fichier TECHNICAL_DOCUMENTATION.md.*
