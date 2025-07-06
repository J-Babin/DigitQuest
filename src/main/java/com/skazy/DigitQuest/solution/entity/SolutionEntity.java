package com.skazy.DigitQuest.solution.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name="SOLUTION")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SolutionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Min(1) @Max(9)
    private Integer pos1, pos2, pos3, pos4 , pos5, pos6, pos7, pos8, pos9;

    @Column(columnDefinition = "TEXT",  nullable = false)
    private String gridJson;

    @Column(nullable = false)
    private Boolean isValid;

    @Column(nullable = false)
    private Long calculationTimeMs;

    @Column
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column
    @CreationTimestamp
    private LocalDateTime updateAt;

}
