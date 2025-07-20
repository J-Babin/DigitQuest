# DigitQuest - Guide de Développement

## 🚀 Démarrage Rapide

### Prérequis
- **Java 17+** installé
- **Maven 3.6+** installé
- **IDE** recommandé : IntelliJ IDEA ou VS Code avec extensions Java

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/J-Babin/DigitQuest.git
cd DigitQuest/Backend
```

2. **Installer les dépendances**
```bash
mvn clean install
```

3. **Lancer l'application**
```bash
mvn spring-boot:run
```

4. **Vérifier que tout fonctionne**
- API : http://localhost:3000/api/v1/solutions/test
- Swagger : http://localhost:3000/
- Console H2 : http://localhost:3000/h2

---

## 🛠️ Configuration de l'Environnement de Développement

### IDE Configuration (IntelliJ IDEA)

1. **Import du projet**
   - File → Open → Sélectionner le dossier Backend
   - Import as Maven project

2. **Configuration JDK**
   - File → Project Structure → Project → SDK : Java 17

3. **Plugins recommandés**
   - Lombok Plugin
   - Spring Boot Plugin

4. **Configuration Lombok**
   - Settings → Build → Compiler → Annotation Processors → Enable annotation processing

### IDE Configuration (VS Code)

1. **Extensions requises**
   - Extension Pack for Java
   - Spring Boot Extension Pack
   - Lombok Annotations Support

2. **Configuration launch.json**
```json
{
    "type": "java",
    "name": "DigitQuestApplication",
    "request": "launch",
    "mainClass": "com.skazy.DigitQuest.DigitQuestApplication",
    "projectName": "DigitQuest"
}
```

---

## 📁 Structure du Projet

```
src/
├── main/
│   ├── java/com/skazy/DigitQuest/
│   │   ├── DigitQuestApplication.java          # Point d'entrée Spring Boot
│   │   ├── config/
│   │   │   └── CorsConfig.java                 # Configuration CORS
│   │   ├── puzzle/algorithm/
│   │   │   └── BacktrackingSolver.java         # Algorithme de résolution
│   │   └── solution/
│   │       ├── controller/
│   │       │   └── SolutionController.java     # Contrôleur REST
│   │       ├── dto/
│   │       │   ├── mapper/
│   │       │   │   └── SolutionMapperDTO.java  # Mappers DTO/Entity
│   │       │   ├── request/
│   │       │   │   ├── SolutionCreateDTO.java  # DTO création
│   │       │   │   └── SolutionUpdateDTO.java  # DTO mise à jour
│   │       │   └── response/
│   │       │       ├── SolutionResponseDTO.java # DTO réponse complète
│   │       │       └── SolutionSummaryDTO.java  # DTO résumé
│   │       ├── entity/
│   │       │   └── SolutionEntity.java         # Entité JPA
│   │       ├── repository/
│   │       │   └── SolutionRepository.java     # Repository JPA
│   │       └── service/
│   │           └── SolutionService.java        # Service métier
│   └── resources/
│       ├── application.yml                     # Configuration principale
│       ├── application-dev.yml                 # Configuration développement
│       └── database/                           # Base H2 (fichiers générés)
└── test/
    └── java/com/skazy/DigitQuest/
        ├── DigitQuestApplicationTests.java     # Tests d'intégration
        └── solution/
            ├── dto/
            ├── entity/
            ├── repository/
            └── service/
```

---

## 🏗️ Ajouter une Nouvelle Fonctionnalité

### 1. Ajouter un Nouveau Endpoint

#### Étape 1 : Créer le DTO de requête (si nécessaire)
```java
// src/main/java/com/skazy/DigitQuest/solution/dto/request/NouvelleRequeteDTO.java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NouvelleRequeteDTO {
    @NotNull
    private String parametre;
}
```

#### Étape 2 : Ajouter la méthode dans le service
```java
// Dans SolutionService.java
public ResultatDTO nouvelleMethode(NouvelleRequeteDTO requete) {
    // Logique métier
    return resultat;
}
```

#### Étape 3 : Ajouter l'endpoint dans le contrôleur
```java
// Dans SolutionController.java
@PostMapping("/nouvelle-fonctionnalite")
@Operation(summary = "Description de la nouvelle fonctionnalité")
@ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Succès"),
    @ApiResponse(responseCode = "400", description = "Requête invalide")
})
public ResponseEntity<ResultatDTO> nouvelleFonctionnalite(@Valid @RequestBody NouvelleRequeteDTO requete) {
    ResultatDTO resultat = solutionService.nouvelleMethode(requete);
    return ResponseEntity.ok(resultat);
}
```

#### Étape 4 : Ajouter les tests
```java
// Dans SolutionServiceTest.java
@Test
@DisplayName("Test de la nouvelle fonctionnalité")
void shouldTestNouvelleFonctionnalite() {
    // Arrange
    NouvelleRequeteDTO requete = NouvelleRequeteDTO.builder()
        .parametre("valeur")
        .build();
    
    // Act
    ResultatDTO resultat = solutionService.nouvelleMethode(requete);
    
    // Assert
    assertThat(resultat).isNotNull();
    // Autres assertions...
}
```

### 2. Ajouter une Nouvelle Entité

#### Étape 1 : Créer l'entité
```java
@Entity
@Table(name = "NOUVELLE_ENTITE")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NouvelleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nom;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

#### Étape 2 : Créer le repository
```java
@Repository
public interface NouvelleRepository extends JpaRepository<NouvelleEntity, Long> {
    List<NouvelleEntity> findByNom(String nom);
}
```

#### Étape 3 : Créer le service
```java
@Service
@AllArgsConstructor
public class NouvelleService {
    private final NouvelleRepository repository;
    
    public List<NouvelleEntity> findAll() {
        return repository.findAll();
    }
    
    // Autres méthodes...
}
```

---

## 🧪 Tests

### Structure des Tests
```
test/java/com/skazy/DigitQuest/
├── DigitQuestApplicationTests.java      # Tests d'intégration
└── solution/
    ├── dto/
    │   └── SolutionDtoTest.java         # Tests des DTOs
    ├── entity/
    │   └── SolutionEntityTest.java      # Tests d'entité (@DataJpaTest)
    ├── repository/
    │   └── SolutionRepositoryTest.java  # Tests repository (@DataJpaTest)
    └── service/
        └── SolutionServiceTest.java     # Tests service (@SpringBootTest)
```

### Types de Tests

#### Tests d'Entité (@DataJpaTest)
```java
@DataJpaTest
public class SolutionEntityTest {
    @Autowired
    private TestEntityManager entityManager;
    
    @Test
    void shouldPersistEntity() {
        // Test de persistance
    }
}
```

#### Tests de Repository (@DataJpaTest)
```java
@DataJpaTest
public class SolutionRepositoryTest {
    @Autowired
    private SolutionRepository repository;
    
    @Test
    void shouldFindBySpecificValue() {
        // Test des requêtes personnalisées
    }
}
```

#### Tests de Service (@SpringBootTest)
```java
@SpringBootTest
public class SolutionServiceTest {
    @Autowired
    private SolutionService service;
    
    @Test
    void shouldHandleBusinessLogic() {
        // Test de la logique métier
    }
}
```

#### Tests d'Intégration (@SpringBootTest)
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SolutionControllerIntegrationTest {
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void shouldTestEndToEnd() {
        // Tests d'intégration complets
    }
}
```

### Lancer les Tests

```bash
# Tous les tests
mvn test

# Tests spécifiques
mvn test -Dtest=SolutionServiceTest

# Tests avec rapport de couverture
mvn test jacoco:report
```

---

## 🔧 Configuration et Profils

### Profils Disponibles
- **dev** : Développement (actif par défaut)
- **prod** : Production
- **test** : Tests (automatique pendant mvn test)

### Variables d'Environnement

#### Développement (application-dev.yml)
```yaml
spring:
  datasource:
    url: jdbc:h2:file:./src/main/resources/database/digitquestdb
    username: userDigitQuest
    password: passwordDigitQuest
  
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true
    
logging:
  level:
    com.skazy.digitquest: DEBUG
```

#### Production (variables d'environnement)
```bash
export SPRING_PROFILES_ACTIVE=prod
export DATABASE_URL=jdbc:postgresql://localhost:5432/digitquest
export DATABASE_USERNAME=digitquest_user
export DATABASE_PASSWORD=secure_password
```

---

## 📊 Base de Données

### Console H2 (Développement)
- **URL** : http://localhost:3000/h2
- **JDBC URL** : `jdbc:h2:file:./src/main/resources/database/digitquestdb`
- **Username** : `userDigitQuest`
- **Password** : `passwordDigitQuest`

### Migration vers PostgreSQL (Production)

1. **Ajouter la dépendance**
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

2. **Configuration**
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/digitquest
    username: ${DATABASE_USERNAME}
    password: ${DATABASE_PASSWORD}
  
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
    hibernate:
      ddl-auto: validate
```

---

## 🔄 Workflow de Développement

### 1. Créer une Nouvelle Branche
```bash
git checkout -b feature/nouvelle-fonctionnalite
```

### 2. Développement
1. Écrire les tests en premier (TDD)
2. Implémenter la fonctionnalité
3. Valider que tous les tests passent
4. Documenter les changements

### 3. Validation
```bash
# Tests
mvn test

# Compilation
mvn compile

# Package complet
mvn clean package
```

### 4. Commit et Push
```bash
git add .
git commit -m "feat: ajouter nouvelle fonctionnalité"
git push origin feature/nouvelle-fonctionnalite
```

### 5. Pull Request
1. Créer la PR sur GitHub
2. Review du code
3. Merge vers main

---

## 🐛 Debug et Troubleshooting

### Logs
Les logs sont configurés différemment selon l'environnement :

#### Développement
```yaml
logging:
  level:
    com.skazy.digitquest: DEBUG
    org.springframework.web: DEBUG
```

#### Production
```yaml
logging:
  level:
    root: INFO
    com.skazy.digitquest: INFO
```

### Problèmes Courants

#### 1. Port 3000 déjà utilisé
```bash
# Trouver le processus
lsof -i :3000

# Tuer le processus
kill -9 <PID>

# Ou changer le port
server.port=3001
```

#### 2. Base de données verrouillée
```bash
# Supprimer les fichiers H2
rm -f src/main/resources/database/digitquestdb.*
```

#### 3. Tests échouent
```bash
# Nettoyer et relancer
mvn clean test

# Tests individuels pour debug
mvn test -Dtest=SolutionServiceTest::shouldCreateSolution
```

---

## 📦 Build et Déploiement

### Build Local
```bash
# Compilation
mvn compile

# Tests + Package
mvn clean package

# Sans tests (si nécessaire)
mvn clean package -DskipTests
```

### Déploiement

#### Développement
```bash
mvn spring-boot:run
```

#### Production
```bash
java -jar target/DigitQuest-0.0.1-SNAPSHOT.jar
```

#### Docker (optionnel)
```dockerfile
FROM openjdk:17-jdk-slim

COPY target/DigitQuest-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 3000

ENTRYPOINT ["java", "-jar", "/app.jar"]
```

```bash
docker build -t digitquest .
docker run -p 3000:3000 digitquest
```

---

## 📚 Ressources et Références

### Documentation Spring
- [Spring Boot Reference](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Spring Data JPA](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
- [Spring Web MVC](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html)

### Outils et Utilitaires
- [Lombok](https://projectlombok.org/features/all)
- [H2 Database](http://h2database.com/html/main.html)
- [Swagger/OpenAPI](https://swagger.io/docs/)
- [JUnit 5](https://junit.org/junit5/docs/current/user-guide/)
- [AssertJ](https://assertj.github.io/doc/)

### Standards de Code
- [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
- [Spring Boot Best Practices](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.best-practices)

---

## 🤝 Contribution

1. **Fork** le repository
2. **Clone** votre fork
3. **Créer** une branche feature
4. **Développer** avec tests
5. **Soumettre** une Pull Request

### Standards de Commit
```
feat: nouvelle fonctionnalité
fix: correction de bug  
docs: documentation
style: formatage, pas de changement de logique
refactor: restructuration du code
test: ajout ou modification de tests
chore: maintenance, build, etc.
```

---

*Ce guide couvre les aspects pratiques du développement sur DigitQuest. Pour les détails d'implémentation, consultez TECHNICAL_DOCUMENTATION.md.*
