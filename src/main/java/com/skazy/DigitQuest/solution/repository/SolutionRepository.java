package com.skazy.DigitQuest.solution.repository;

import com.skazy.DigitQuest.solution.entity.SolutionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolutionRepository extends JpaRepository<SolutionEntity, Long> {

    @Query("""
        SELECT s FROM SolutionEntity s
        WHERE SUBSTRING(s.positions, :index, 1) = :value
        """)
    List<SolutionEntity> findBySpecificPosValue(@Param("index") Integer index,
                                                @Param("value") Integer value);

    @Override
    void deleteAll();
}
