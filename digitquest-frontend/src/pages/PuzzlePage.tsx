import { useState, useCallback, type ChangeEvent, memo } from "react";
import { PuzzleGrid } from "@/components/PuzzleGrid/PuzzleGrid";
import toast from "react-hot-toast";
import { checkSolution } from "@/api/solutions";
import { DigitIsUsed, SolutionData } from "@/data/PuzzleData";

const usePuzzleLogic = () => {
    const [solution, setSolution] = useState<SolutionData>({});
    const [numberUsed, setNumberUsed] = useState<DigitIsUsed>({
        "1": false, "2": false, "3": false, "4": false, "5": false,
        "6": false, "7": false, "8": false, "9": false
    });

    const addValue = useCallback((index: string, value: string, inputComponent: ChangeEvent<HTMLInputElement> ) => {
        if (numberUsed[value]) {
            toast.error(`Digit ${value} is already used!`);
            inputComponent.target.value = "";
            return false;
        }
        
        setSolution(prev => ({ ...prev, [index]: value }));
        setNumberUsed(prev => ({ ...prev, [value]: true }));
        return true;
    }, [numberUsed]);

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

    return { solution, numberUsed, addValue, resetPuzzle };
};


const PuzzlePage = () => {
    const { solution, addValue, resetPuzzle } = usePuzzleLogic();

    const onAddValue = (value: React.ChangeEvent<HTMLInputElement>) => {
        const index = value.target.getAttribute("id");
        if (index) {
            addValue(index, value.target.value, value);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if(Object.keys(solution).length < 9) {
            toast.error("Remplissez tous les champs avant de soumettre!");
            return;
        }

        try {
            const solutionString = Object.values(solution).join("");
           
            checkSolution(solutionString).then(() => {
                toast.success("Solution is correct!");
            }).catch(() => {
                toast.error("Solution is incorrect, try again!");
            });
        }catch (error) {
            toast.error("An error occurred while checking the solution.");
        }
    };

    return (
        <div className="flex flex-col w-full h-full">
            <h1 className="text-2xl font-bold text-center my-6 ">Digit Quest Puzzle</h1>
            <div className="w-2/3 justify-center mx-auto mb-4 h-full">
                <PuzzleGrid onChange={onAddValue} />
            </div>

            <div className="flex justify-center">                
                <button 
                    className="relative inline-flex items-center justify-center p-0.5 mb-4 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                    onClick={handleSubmit}
                >
                    <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-700 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Submit
                    </span>
                </button>

                <button 
                    className="relative inline-flex items-center justify-center p-0.5 mb-4 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-700 via-red-500 to-red-300 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-1 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                    onClick={resetPuzzle}
                >
                    <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-700 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Reset
                    </span>
                </button>
        
            </div>
        </div>
    );
}

export default memo(PuzzlePage);