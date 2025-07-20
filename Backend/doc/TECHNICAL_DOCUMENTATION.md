# DigitQuest - Documentation Technique

## 🏗️ Architecture du Projet

### Structure des Packages

```
com.skazy.DigitQuest/
├── config/                 # Configuration CORS
├── puzzle/algorithm/        # Algorithme de résolution
└── solution/
    ├── controller/         # Contrôleurs REST
    ├── dto/               # Data Transfer Objects
    │   ├── mapper/        # Mappers DTO <-> Entity
    │   ├── request/       # DTOs de requête
    │   └── response/      # DTOs de réponse
    ├── entity/            # Entités JPA
    ├── repository/        # Repositories Spring Data
    └── service/           # Services métier
```

## 📦 Composants Principaux

### 1. SolutionEntity
Entité JPA représentant une solution du puzzle.

```java
@Entity
@Table(name = "SOLUTION")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolutionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 9)
    @Pattern(regexp = "^[1-9]{9}$", message = "Doit contenir exactement 9 chiffres de 1 à 9")
    private String positions;
    
    @Column(columnDefinition = "TEXT", nullable = false, unique = true)
    @NotNull(message = "Le JSON de la grille est obligatoire")
    private String gridJson;
    
    @Column(nullable = false)
    @Builder.Default
    private Boolean isValid = false;
    
    @Column(nullable = false)
    @Builder.Default
    private Long calculationTimeMs = 0L;
    
    @Column
    private Integer totalSolutions = 0;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    // Méthodes utilitaires pour manipuler les positions
    public Integer getPosition(int index) { ... }
    public void setPosition(int index, int value) { ... }
}
```

### 2. SolutionRepository
Interface repository avec requête personnalisée.

```java
@Repository
public interface SolutionRepository extends JpaRepository<SolutionEntity, Long> {
    
    @Query("""
        SELECT s FROM SolutionEntity s
        WHERE SUBSTRING(s.positions, :index, 1) = :value
        """)
    List<SolutionEntity> findBySpecificPosValue(@Param("index") Integer index,
                                                @Param("value") Integer value);
}
```

### 3. SolutionService
Service métier gérant la logique applicative.

```java
@Service
@AllArgsConstructor
public class SolutionService {
    private SolutionRepository solutionRepository;
    private final SolutionMapperDTO solutionMapper;
    
    public SolutionEntity findById(Long solutionId) { ... }
    public List<SolutionEntity> findAllSolutions() { ... }
    public SolutionEntity createSolution(SolutionEntity solutionEntity) { ... }
    public SolutionEntity updateSolution(Long solutionId, SolutionUpdateDTO updatedSolution) { ... }
    public void deleteSolution(Long solutionId) { ... }
    public void deleteAllSolutions() { ... }
    public List<SolutionEntity> findBySpecificPosValue(Integer index, Integer value) { ... }
    public void saveMultipleSolutions(List<SolutionEntity> solutions) { ... }
}
```

### 4. SolutionController
Contrôleur REST avec documentation Swagger.

```java
@RestController
@RequestMapping("/api/v1/solutions")
@Tag(name = "Solutions", description = "Gestion des solutions du puzzle vietnamien")
@RequiredArgsConstructor
@Validated
public class SolutionController {
    
    private final SolutionService solutionService;
    private final SolutionMapperDTO solutionMapperDTO;
    
    // Endpoints REST documentés avec Swagger
    @GetMapping("/")
    @Operation(summary = "Récupérer toutes les solutions")
    public ResponseEntity<List<SolutionSummaryDTO>> getAllSolutions() { ... }
    
    @PostMapping("solution")
    @Operation(summary = "Créer une nouvelle solution")
    public ResponseEntity<SolutionResponseDTO> createSolution(@Valid @RequestBody SolutionCreateDTO solutionCreateDTO) { ... }
    
    // ... autres endpoints
}
```

### 5. BacktrackingSolver
Algorithme de résolution par backtracking.

```java
public class BacktrackingSolver {
    // Ordre de recherche optimisé : B,C,G,H,I,E,A,D,F
    private static final int[] VARIABLE_ORDER = {1,2,6,7,8,4,0,3,5};
    private static final int[] DIGITS = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    private static final int TARGET_VALUE = 66;
    
    private final boolean strictSolver; // Mode strict ou flexible
    
    public List<SolutionEntity> startSolve() { ... }
    public boolean isValidSolution(int[] solution) { ... }  // Mode strict
    public boolean isValidSolution2(int[] solution) { ... } // Mode flexible
}
```

## 🎯 DTOs et Mappers

### DTOs de Requête

#### SolutionCreateDTO
```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolutionCreateDTO {
    @NotBlank(message = "Les positions sont obligatoires")
    @Pattern(regexp = "^[1-9]{9}$", message = "Doit contenir exactement 9 chiffres de 1 à 9")
    private String positions;
    
    @NotBlank(message = "Le JSON de la grille est obligatoire")
    private String gridJson;
    
    @Builder.Default
    private Boolean isValid = false;
    
    @Min(value = 0, message = "Le temps de calcul ne peut pas être négatif")
    @Builder.Default
    private Long calculationTimeMs = 0L;
}
```

#### SolutionUpdateDTO
```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolutionUpdateDTO {
    private String positions;
    private String gridJson;
    private Boolean isValid;
    private Long calculationTimeMs;
}
```

### DTOs de Réponse

#### SolutionResponseDTO
```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolutionResponseDTO {
    private Long id;
    private String positions;
    private String gridJson;
    private Boolean isValid;
    private Long calculationTimeMs;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

#### SolutionSummaryDTO
```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolutionSummaryDTO {
    private Long id;
    private String positions;
    private Boolean isValid;
    private Long calculationTimeMs;
    private LocalDateTime createdAt;
}
```

### SolutionMapperDTO
```java
@Component
public class SolutionMapperDTO {
    public SolutionResponseDTO toResponseDTO(SolutionEntity entity) { ... }
    public SolutionEntity toEntity(SolutionCreateDTO dto) { ... }
    public void updateEntityFromDTO(SolutionEntity entity, SolutionUpdateDTO dto) { ... }
    public SolutionSummaryDTO toSummaryDTO(SolutionEntity entity) { ... }
}
```

## 🔧 Configuration

### Configuration CORS
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000", "http://localhost:8080")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600);
            }
        };
    }
}
```

### Configuration Base de Données (application.yml)
```yaml
spring:
  application:
    name: digitquest
  profiles:
    active: dev
  
  jpa:
    hibernate:
      naming:
        physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
    properties:
      hibernate:
        dialect: org.hibernate.dialect.H2Dialect
        format_sql: true

server:
  port: 3000

springdoc:
  api-docs:
    path: /api-docs
    enabled: true
  swagger-ui:
    path: /
    operationsSorter: method
    tagsSorter: alpha
    displayRequestDuration: true
```

### Configuration Développement (application-dev.yml)
```yaml
spring:
  datasource:
    url: jdbc:h2:file:./src/main/resources/database/digitquestdb
    username: userDigitQuest
    password: passwordDigitQuest
    driver-class-name: org.h2.Driver

  h2:
    console:
      enabled: true
      path: /h2
      
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true

logging:
  level:
    com.skazy.digitquest: DEBUG
```

## 🧪 Tests

### Tests d'Entité (SolutionEntityTest)
- Persistance avec génération d'ID automatique
- Validation des contraintes
- Méthodes utilitaires (getPosition, setPosition)
- Valeurs par défaut du Builder

### Tests de Repository (SolutionRepositoryTest)
- Recherche par ID
- Requête personnalisée findBySpecificPosValue
- Opérations CRUD de base

### Tests de Service (SolutionServiceTest)
- Logique métier complète
- Gestion des exceptions
- Opérations CRUD
- Validation des données

### Tests DTO (SolutionDtoTest)
- Validation des DTOs
- Mappers Entity <-> DTO

## 🔄 Flux de Données

### Création d'une Solution
1. `SolutionCreateDTO` reçu par le contrôleur
2. Validation des données avec Bean Validation
3. Mapping vers `SolutionEntity` via `SolutionMapperDTO`
4. Sauvegarde via `SolutionService` et `SolutionRepository`
5. Retour de `SolutionResponseDTO` au client

### Génération de Solutions
1. Création d'un `BacktrackingSolver`
2. Exécution de l'algorithme de backtracking
3. Génération de toutes les solutions possibles
4. Conversion en `SolutionEntity` avec métadonnées
5. Sauvegarde en lot dans la base de données

## 🎲 Algorithme de Backtracking

### Principe
L'algorithme utilise une approche récursive pour explorer toutes les combinaisons possibles de chiffres 1-9 dans les 9 positions de la grille.

### Optimisations
1. **Ordre de recherche optimisé** : Commence par les positions ayant le plus d'impact sur l'équation
2. **Élagage précoce** : Arrête la recherche dès qu'une branche ne peut pas aboutir
3. **Validation en deux modes** : Strict (divisions entières) et flexible (décimales acceptées)

### Performance
- Complexité temporelle : O(9!)
- Optimisé par l'ordre de parcours et l'élagage
- Mémorisation du temps de calcul pour analyse

## 🔍 Patterns Utilisés

### Repository Pattern
Séparation entre la logique métier et l'accès aux données via Spring Data JPA.

### DTO Pattern
Séparation entre la représentation interne (Entity) et externe (DTO) des données.

### Builder Pattern
Utilisation de Lombok @Builder pour une construction d'objets fluide.

### Mapper Pattern
Conversion entre DTOs et Entities via des mappers dédiés.

### Service Layer Pattern
Encapsulation de la logique métier dans des services.

## 📊 Monitoring et Observabilité

### Actuator
```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: when_authorized
```

### Swagger/OpenAPI
Documentation interactive de l'API accessible sur la racine `/`.

### Logs
Configuration différentielle par environnement (DEBUG en dev, INFO en prod).

## 🚀 Déploiement

### Build
```bash
mvn clean package
```

### Exécution
```bash
java -jar target/DigitQuest-0.0.1-SNAPSHOT.jar
```

### Profile de Production
Variables d'environnement recommandées :
- `SPRING_PROFILES_ACTIVE=prod`
- `DATABASE_URL`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`

## 📈 Évolutions Possibles

1. **Cache Redis** pour les solutions fréquemment consultées
2. **Base de données PostgreSQL** pour la production
3. **Pagination** pour les grandes collections
4. **Authentification JWT** pour sécuriser l'API
5. **Monitoring avec Micrometer** et Prometheus
6. **Tests d'intégration** avec TestContainers
7. **CI/CD Pipeline** avec GitHub Actions

---

*Cette documentation technique accompagne le README principal et détaille l'implémentation interne du projet DigitQuest.*
