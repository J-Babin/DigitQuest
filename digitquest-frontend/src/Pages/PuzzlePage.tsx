import { useState, useCallback, type ChangeEvent, memo } from "react";
import { PuzzleGrid } from "@/components/PuzzleGrid/PuzzleGrid";
import toast from "react-hot-toast";

interface SolutionData {
    [key: string]: string;
}

interface DigitIsUsed {
    [key: string]: boolean;
}

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
          toast.success("Solution submitted!");
    };

    return (
        <div className="flex flex-col w-full h-full">
            <h1 className="text-2xl font-bold text-center mb-4">Digit Quest Puzzle</h1>
            <PuzzleGrid onChange={onAddValue} />
            {/* <div className="flex gap-4 m-4">
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded" 
                    onClick={handleSubmit}
                >
                    Submit Solution
                </button>
                <button 
                    className="bg-red-500 text-white px-4 py-2 rounded" 
                    onClick={resetPuzzle}
                >
                    Reset
                </button>
            </div> */}
        </div>
    );
}

export default PuzzlePage;