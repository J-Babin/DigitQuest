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

    const addValue = useCallback((index: string, value: string, inputComponent: ChangeEvent<HTMLInputElement> ) => {
        console.log("Adding value", solution);
        if (numberUsed[value] ) {
            console.error(`Digit ${value} is already used!`);
            toast.error(`Digit ${value} is already used!`);
            inputComponent.target.value = "";
            return false;
        }
        
        setSolution(prev => ({ ...prev, [index]: value }));
        setNumberUsed(prev => ({ ...prev, [value]: true }));
        return true;
    }, [numberUsed]);

    const transformSolution = useCallback((solution: any) => {
        let transformed: SolutionData = {};
        let idx = 0;
        if (templateGridData && typeof templateGridData === "object") {
            Object.entries(templateGridData).forEach(([key, value]) => {
                transformed[key] = solution[idx]
                idx++;   
            });
            
        }
        setSolution(transformed);
        Object.entries(numberUsed).forEach(([digit, used]) => {
            if (transformed[digit]) {
                setNumberUsed(prev => ({ ...prev, [digit]: true }));
            }
        });
        return transformed;
    }, []);

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

    return { solution, numberUsed, addValue, resetPuzzle, setSolution, transformSolution };
};

const DetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [solutionData, setSolutionData] = useState<SolutionState | null>(null);
    const [result, setResult] = useState<string>();
    

    const { solution, addValue, resetPuzzle, setSolution, transformSolution } = usePuzzleLogic();

    useEffect(() => {
        // Récupérer les données du state
        const state = location.state as SolutionState;
        if (state && state.solution) {
            setSolutionData(state);
            setSolution(transformSolution(state.solution));
        } else {
            // Rediriger si pas de données
            console.warn("Aucune donnée de solution trouvée dans le state");
        }
    }, [location.state]);

    const handleGoBack = () => {
        navigate(-1); 
    };

    const onNewValue = (value: React.ChangeEvent<HTMLInputElement>) => {
        const index = value.target.getAttribute("id");
        if (index) {
            addValue(index, value.target.value, value);
        }
        console.log("New solution", solution);
    };

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

    const HandleModifying = (event: React.FormEvent) => {
        event.preventDefault();
       
       
    };

    const HandleDelete = async () => {
        console.log("Deleting solution with ID:", solutionData.idSolution);
        await deleteSolution(solutionData.idSolution)
        navigate('/history');
    }

    return(
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header avec bouton retour */}
                <div className="flex items-center mb-6">
                    <button
                        onClick={handleGoBack}
                        className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors mr-4"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Retour
                    </button>
                </div>
                {/* Détails de la solution */}
                <div className="shadow-md rounded-lg p-6 mb-6">
                    <div className="w-2/3 justify-center mx-auto mb-4 h-full">
                        <PuzzleGrid onChange={onNewValue}  solutions={{ positions: solutionData.positions }} disabled={false}/>
                    </div>
                </div>
                <div className="flex justify-center">                
                <button 
                    className="relative inline-flex items-center justify-center p-0.5 mb-4 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                    onClick={HandleModifying}
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