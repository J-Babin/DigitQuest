package com.skazy.DigitQuest.puzzle.algorithm;

import com.skazy.DigitQuest.solution.entity.SolutionEntity;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class BacktrackingSolver {

    // on part sur une priorite de recherche B,C,G,H,I,E,A,D,F
    private static final int[] VARIABLE_ORDER = {1,2,6,7,8,4,0,3,5};
    private static final int[] DIGITS = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    private static final int TARGET_VALUE = 66;

    @Getter
    private long totalCalculationTime;
    private final Boolean[] digitUsed = new Boolean[10];
    private final int[] solution = new int[9];
    ArrayList<int[]> allSolutions = new ArrayList<>();
    private int numberOfSolutions = 0;
    private final boolean strictSolver;


    public BacktrackingSolver(boolean typeOfSolver) {
        this.strictSolver = typeOfSolver;

    }

    public List<SolutionEntity> startSolve() {
        Arrays.fill(digitUsed, false);
        long startTime = System.currentTimeMillis();
        this.backtrackingSolver(solution, digitUsed, 0);
        totalCalculationTime = System.currentTimeMillis() - startTime;

        return createSolutionEntities();

    }

    public void backtrackingSolver(int[] solution, Boolean[] digitUsed, int posIndex) {
        if (posIndex == 9){
            if (!strictSolver) {
                if (isValidSolution(solution)) {
                    return;
                }
            }else{
                if (isValidSolution2(solution)) {
                    return;
                }
            }
            return;
        }

        int index = VARIABLE_ORDER[posIndex];

        for (int digit : DIGITS) {
            if (!digitUsed[digit]) {
                solution[index] = digit;
                digitUsed[digit] = true;

                this.backtrackingSolver(solution, digitUsed, posIndex + 1);

                solution[index] = 0;
                digitUsed[digit] = false;
            }

        }
    }

    /**
     * @param solution
     * this method is for finding solutions with strict division to get whole numbers
     * @return boolean
     */
    public boolean isValidSolution(int[] solution) {
        int A = solution[0],  B = solution[1], C = solution[2];
        int D = solution[3],  E = solution[4], F = solution[5];
        int G = solution[6], H = solution[7], I = solution[8];

        if ((13*B) % C != 0 || (G*H) % I != 0){
            return false;
        }

        int result = A + ((13 * B) / C) + D + (12 * E) - F - 11 + ((G * H) / I) - 10;

        if  (result == TARGET_VALUE){
            numberOfSolutions++;
            allSolutions.add(solution.clone());
        }
        return result == TARGET_VALUE;
    }


    /**
     * @param solution
     * this method is for finding solutions, accepting that the values may be duplicates.
     * @return boolean
     */
    public boolean isValidSolution2(int[] solution) {
        int A = solution[0], B = solution[1], C = solution[2];
        int D = solution[3], E = solution[4], F = solution[5];
        int G = solution[6], H = solution[7], I = solution[8];

        double term2 = (13.0 * B) / C;  // ← Peut être décimal !
        double term4 = 12.0 * E;
        double term5 = -F;
        double term6 = -11;
        double term7 = (double)(G * H) / I;  // ← Peut être décimal !
        double term8 = -10;

        double result = (double) A + term2 + (double) D + term4 + term5 + term6 + term7 + term8;

        if (Math.abs(result - TARGET_VALUE) < 0.0001) {
            numberOfSolutions++;
            allSolutions.add(solution.clone());
            return true;
        } else {
            return false;
        }
    }

    public void printAllSolutions() {
        System.out.print("[");
        for (int i = 0; i < allSolutions.size(); i++) {
            System.out.print(Arrays.toString(allSolutions.get(i)));
            if (i < allSolutions.size() - 1) System.out.print(", ");
        }
        System.out.println("]");
    }

    private List<SolutionEntity> createSolutionEntities() {
        List<SolutionEntity> entities = new ArrayList<>();
        long calculationTimePerSolution = totalCalculationTime;

        for (int[] sol : allSolutions) {
            SolutionEntity entity = SolutionEntity.builder()
                    .positions(arrayToPositionsString(sol))
                    .gridJson(generateGridJson(sol))
                    .isValid(true)
                    .calculationTimeMs(calculationTimePerSolution)
                    .totalSolutions(allSolutions.size())
                    .build();

            entities.add(entity);
        }

        return entities;
    }

    private String arrayToPositionsString(int[] solution) {
        StringBuilder sb = new StringBuilder();
        for (int value : solution) {
            sb.append(value);
        }
        return sb.toString();
    }

    private String generateGridJson(int[] sol) {
        int A = sol[0], B = sol[1], C = sol[2];
        int D = sol[3], E = sol[4], F = sol[5];
        int G = sol[6], H = sol[7], I = sol[8];

        double result = A + (13.0 * B) / C + D + (12.0 * E) - F - 11 + (double)(G * H) / I - 10;

        return String.format("{\"A\":%d,\"B\":%d,\"C\":%d,\"D\":%d,\"E\":%d,\"F\":%d,\"G\":%d,\"H\":%d,\"I\":%d,\"result\":%.1f}",
                A, B, C, D, E, F, G, H, I, result);
    }


}
