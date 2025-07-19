import { deleteAllSolutions, generateAllSolutions, getAllSolutions, getFirstSolution } from "@/api/solutions";
import { PuzzleGrid } from "@/components/PuzzleGrid/PuzzleGrid";
import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";


const HistoryPage = () => {
    const [solutions, setSolutions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchSolutions = async () => {
            try {
                const response = await getAllSolutions();
                if (Array.isArray(response)) {
                    setSolutions(response);
                    setLoading(true);
                } else {
                    console.log("No solutions data returned.");
                }
            } catch (error) {
                setLoading(true);
            }
        };
        fetchSolutions();
    }, []);

    if (!loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    const handleGenerateSolutions = async () => {
        try {
            const response = await generateAllSolutions();
            if (Array.isArray(response)) {
                let timeToGenerate = response[0].calculationTimeMs;
                setSolutions(response);
                toast.success(`Solutions generated in ${timeToGenerate} ms`);
            } else {
                console.log("No solutions data returned.");
            }
        } catch (error) {
            console.error("Error generating solutions:", error);
            toast.error("Failed to generate solutions. Please try again.");
        }
    };

    const handleDeleteAllSolutions = async () => {
        try {
            await deleteAllSolutions();
            setSolutions([]);
            toast.success("All solutions deleted successfully.");
        } catch (error) {
            console.error("Error deleting solutions:", error);
            toast.error("Failed to delete solutions. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">History Page</h1>
            <p>This is the History Page content.</p>
            <div className="mt-3">
                <button 
                    className="inline-flex items-center justify-center p-0.5 mb-3 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-1 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                    hidden={true ? solutions.length > 0 : false }
                    onClick={handleGenerateSolutions}>
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Generate all possible solutions
                    </span>
                </button>
                <button 
                    className="relative inline-flex items-center justify-center p-0.5 mb-3 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-700 via-red-500 to-red-300 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900  focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                    onClick={handleDeleteAllSolutions}
                >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Reset
                    </span>
                </button>
            </div>
            <div className="flex flex-row h-2/3 w-full pb-3">
               <div className="grid grid-cols-2 mx-2 gap-2 overflow-y-auto max-h-full w-screen">
                    {solutions.map((solution, index) => (
                        <div key={index} className="m-2 p-2 shadow-xl/30">
                            <PuzzleGrid onChange={() => {}} solutions={solutions[index]} disabled={true} idSolution={solutions[index].id}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(HistoryPage);