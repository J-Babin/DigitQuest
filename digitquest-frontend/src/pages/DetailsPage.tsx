import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Grid } from "lucide-react";
import { PuzzleGrid } from "@/components/PuzzleGrid/PuzzleGrid";
import { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import { deleteSolution, modifySolution } from "@/api/solutions";
import { DigitIsUsed, SolutionData, templateGridData } from "@/data/PuzzleData";
import toast from "react-hot-toast";

interface SolutionState {
    solution: number[];
    positions: string | Number[];
    idSolution: string;
    previousPage?: string; 
    metadata: {
        id: string;
        createdAt: string;
        source: string;
        gridDimensions: { rows: number; cols: number };
    };
    gridConfig: {
        gridData: any;
        solutionIndexes: any;
        solutionDefaultValue: any;
    };
}

const usePuzzleLogic = () => {
    const [solution, setSolution] = useState<SolutionData>({});
    const [numberUsed, setNumberUsed] = useState<DigitIsUsed>({
        "1": false, "2": false, "3": false, "4": false, "5": false,
        "6": false, "7": false, "8": false, "9": false
    });

    const addValue = useCallback((index: string, value: string, inputComponent: ChangeEvent<HTMLInputElement>) => {
        const oldValue = solution[index];

        if (value && parseInt(value) <= 0) {
            console.error("Value must be greater than 0");
            toast.error("La valeur doit être supérieure à 0");
            inputComponent.target.value = oldValue || "";
            return false;
        }
        
        if (numberUsed[value] && oldValue !== value) {
            console.error(`Digit ${value} is already used!`);
            toast.error(`Digit ${value} is already used!`);
            inputComponent.target.value = oldValue || "";
            return false;
        }
    
        setSolution(prev => ({ ...prev, [index]: value }));
        setNumberUsed(prev => {
            const updated = { ...prev };
            
            if (oldValue && oldValue !== value) {
                updated[oldValue] = false;
            }
            updated[value] = true;
            
            return updated;
        });
        
        toast.success(`Valeur ${value} modifiée à la position ${index}`);
        return true;
    }, [numberUsed, solution]);

    const transformSolution = useCallback((solutionArray: number[]) => {
        let transformed: SolutionData = {};
        let usedDigits: DigitIsUsed = {
            "1": false, "2": false, "3": false, "4": false, "5": false,
            "6": false, "7": false, "8": false, "9": false
        };
        
        let idx = 0;
        if (templateGridData && typeof templateGridData === "object") {
            Object.entries(templateGridData).forEach(([key, value]) => {
                const digit = solutionArray[idx]?.toString();
                if (digit) {
                    transformed[key] = digit;
                    usedDigits[digit as keyof DigitIsUsed] = true;
                }
                idx++;   
            });
        }
        
        setSolution(transformed);
        setNumberUsed(usedDigits);
        return transformed;
    }, []);

    const solutionToArray = useCallback((): number[] => {
        const result: number[] = [];
        if (templateGridData && typeof templateGridData === "object") {
            Object.keys(templateGridData).forEach((key) => {
                const value = solution[key] ? parseInt(solution[key]) : 0;
                result.push(value);
            });
        }
        return result;
    }, [solution]);

    const resetPuzzle = useCallback(() => {
        setSolution({});
        setNumberUsed({
            "1": false, "2": false, "3": false, "4": false, "5": false,
            "6": false, "7": false, "8": false, "9": false
        });
        const inputs = document.querySelectorAll('input[type="text"]');
        inputs.forEach(input => {
            if (!input.hasAttribute('disabled')) {
                (input as HTMLInputElement).value = "";
            }
        });
        toast.success("Puzzle reset");
    }, []);

    return { 
        solution, 
        numberUsed, 
        addValue, 
        resetPuzzle, 
        setSolution, 
        transformSolution,
        solutionToArray 
    };
};

const DetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [solutionData, setSolutionData] = useState<SolutionState | null>(null);
    const [result, setResult] = useState<string>();
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    const { solution, addValue, resetPuzzle, setSolution, transformSolution, solutionToArray } = usePuzzleLogic();

    useEffect(() => {
        const state = location.state as SolutionState;
        if (state && state.solution) {
            setSolutionData(state);
            transformSolution(state.solution);
        } else {
            console.warn("Aucune donnée de solution trouvée dans le state");
        }
    }, [location.state, transformSolution]);

    const handleGoBack = () => {
        navigate(-1); 
    };

    const onNewValue = (value: React.ChangeEvent<HTMLInputElement>) => {
        const index = value.target.getAttribute("id");
        if (index) {
            const success = addValue(index, value.target.value, value);
            if (success) {
                setHasChanges(true); 
            }
        }
    };

    const getSolutionString = useCallback((): string => {
        const array = solutionToArray();
        return array.join('');
    }, [solutionToArray]);

    if (!solutionData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="mb-4">
                        <Grid size={64} className="mx-auto" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        Aucune solution à afficher
                    </h2>
                    <p className="text-gray-500 mb-4">
                        Veuillez sélectionner une solution depuis la page de recherche.
                    </p>
                    <button
                        onClick={() => navigate('/search')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Aller à la recherche
                    </button>
                </div>
            </div>
        );
    }

    const HandleModifying = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (!hasChanges) {
            toast.success("Aucune modification à sauvegarder");
            return;
        }

        try {
            const modifiedSolution = solutionToArray().join('');
            await modifySolution(solutionData.idSolution, modifiedSolution);
            
            setSolutionData(prev => prev ? {
                ...prev,
                solution: modifiedSolution.split('').map(Number),
                positions: modifiedSolution
            } : null);
            
            setHasChanges(false);
            toast.success("Solution modifiée avec succès!");
            setTimeout(() => {
                navigate(solutionData.previousPage || '/', );
            }, 1000);
            
        } catch (error) {
            console.error("Erreur lors de la modification:", error);
            toast.error("Erreur lors de la modification de la solution");
        }
    };

    const HandleDelete = async () => {
        await deleteSolution(solutionData.idSolution);
        navigate('/history');
    }

    return(
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={handleGoBack}
                        className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Retour
                    </button>
                    
                    {hasChanges && (
                        <span className="text-sm text-orange-600 font-medium">
                            Modifications non sauvegardées
                        </span>
                    )}
                </div>

                <div className="shadow-md rounded-lg p-6 mb-6">
                    <div className="w-2/3 justify-center mx-auto mb-4 h-full">
                        <PuzzleGrid 
                            onChange={onNewValue}  
                            solutions={{ positions: getSolutionString() }} 
                            disabled={false}
                        />
                    </div>
                </div>

                <div className="flex justify-center">                
                    <button 
                        className={`relative inline-flex items-center justify-center p-0.5 mb-4 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 ${
                            !hasChanges ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={HandleModifying}
                        disabled={!hasChanges}
                    >
                        <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-700 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            Modifier
                        </span>
                    </button>

                    <button 
                        className="relative inline-flex items-center justify-center p-0.5 mb-4 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-700 via-red-500 to-red-300 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-1 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                        onClick={HandleDelete}
                    >
                        <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-700 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            Supprimer
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}   

export default memo(DetailsPage);